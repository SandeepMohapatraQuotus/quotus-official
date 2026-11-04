import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiRefreshCw } from "react-icons/fi";
import { TiTickOutline } from "react-icons/ti";
import { MdSmsFailed } from "react-icons/md";
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const CONTACT_EMAIL = "info@quotus.co.in";

// Rate limiting configuration - Only cooldown, removed hourly limit
const RATE_LIMIT = {
  SUBMIT_COOLDOWN: 20 * 1000, // 20 seconds between submissions
};

function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  
  // CAPTCHA states
  const [captchaText, setCaptchaText] = useState("");
  const [captchaDisplayText, setCaptchaDisplayText] = useState([]);
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  
  // Rate limiting states
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  
  // Interval ref for cleanup
  const cooldownIntervalRef = useRef(null);

  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Generate random alphanumeric CAPTCHA with distortion
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    
    // Create distorted display version with random spacing, colors, and rotations
    const distortedChars = result.split('').map((char, index) => {
      const rotations = [-5, -3, 0, 3, 5, -2, 2, 4];
      const colors = ['#1d0073', '#2d1a6b', '#3d2a5e', '#4a3a8c', '#2a1a5e'];
      const rotation = rotations[Math.floor(Math.random() * rotations.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const spacing = Math.random() * 8 + 2; // 2-10px spacing
      return {
        char,
        rotation: rotation,
        color: color,
        spacing: spacing,
        key: index
      };
    });
    
    setCaptchaDisplayText(distortedChars);
    setUserCaptchaInput("");
    setCaptchaError(false);
  };

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
    };
  }, []);

  // Initialize CAPTCHA on component mount
  useEffect(() => {
    generateCaptcha();
    checkCooldown();
  }, []);

  // Check cooldown from localStorage
  const checkCooldown = () => {
    const lastSubmit = localStorage.getItem('last_submit_time');
    if (lastSubmit) {
      const lastTime = parseInt(lastSubmit);
      const now = Date.now();
      const timeDiff = now - lastTime;
      
      if (timeDiff < RATE_LIMIT.SUBMIT_COOLDOWN) {
        const remaining = Math.ceil((RATE_LIMIT.SUBMIT_COOLDOWN - timeDiff) / 1000);
        setCooldownRemaining(remaining);
        startCooldownCountdown(remaining);
      }
    }
  };

  // Update cooldown
  const updateCooldown = () => {
    const now = Date.now();
    localStorage.setItem('last_submit_time', now.toString());
    setCooldownRemaining(Math.ceil(RATE_LIMIT.SUBMIT_COOLDOWN / 1000));
    startCooldownCountdown(Math.ceil(RATE_LIMIT.SUBMIT_COOLDOWN / 1000));
  };

  // Countdown timer for cooldown
  const startCooldownCountdown = (seconds) => {
    if (cooldownIntervalRef.current) {
      clearInterval(cooldownIntervalRef.current);
    }
    
    cooldownIntervalRef.current = setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Validate CAPTCHA (case-SENSITIVE - exact match)
    if (!captchaText || userCaptchaInput.trim() !== captchaText) {
      setCaptchaError(true);
      setIsSuccess(false);
      setToastMessage("CAPTCHA verification failed. Please try again.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
      return false;
    }
    setCaptchaError(false);
    
    // Validate email format
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setIsSuccess(false);
      setToastMessage("Please enter a valid email address.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
      return false;
    }
    
    // Validate message length
    if (formData.message.length > 1000) {
      setIsSuccess(false);
      setToastMessage("Message must be less than 1000 characters.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check cooldown
    if (cooldownRemaining > 0) {
      setIsSuccess(false);
      setToastMessage(`Please wait ${cooldownRemaining} seconds before sending another message.`);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
      return;
    }
    
    // Validate form and CAPTCHA
    if (!validateForm()) {
      return;
    }

    setIsSending(true);

    try {
      // Update cooldown
      updateCooldown();

      // Prepare template parameters matching your EmailJS template
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: CONTACT_EMAIL,
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setIsSuccess(true);
        setToastMessage("Email sent successfully!");
        
        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
        generateCaptcha(); // Generate new CAPTCHA
      } else {
        throw new Error("Failed to send email");
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      setIsSuccess(false);
      setToastMessage("Failed to send email. Please try again.");
    } finally {
      setShowPopup(true);
      setIsSending(false);
      setTimeout(() => setShowPopup(false), 4000);
    }
  };

  return (
   <div className="relative w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={container}
        viewport={{ once: true, margin: "-100px" }}
        className="bg-white rounded-xl overflow-hidden h-full"
      >
        {/* Form Content */}
        <div className="relative">
          <motion.div className="p-6 md:p-10">
            <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-[#513897]">
                  Your Name *
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[#e0d6ff] focus:border-[#513897] focus:ring-2 focus:ring-[#b8b2ff] transition-all"
                  placeholder="Enter Your Name"
                  required
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 2px rgba(81, 56, 151, 0.3)",
                  }}
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-[#513897]">
                  Email Address *
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[#e0d6ff] focus:border-[#513897] focus:ring-2 focus:ring-[#b8b2ff] transition-all"
                  placeholder="Enter Your Mail ID"
                  required
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 2px rgba(81, 56, 151, 0.3)",
                  }}
                />
              </div>

              {/* Subject Field */}
              <div className="space-y-1">
                <label htmlFor="subject" className="block text-sm font-medium text-[#513897]">
                  Subject *
                </label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[#e0d6ff] focus:border-[#513897] focus:ring-2 focus:ring-[#b8b2ff] transition-all"
                  placeholder="Regarding..."
                  required
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 2px rgba(81, 56, 151, 0.3)",
                  }}
                />
              </div>

              {/* Message Field */}
              <div className="space-y-1">
                <label htmlFor="message" className="block text-sm font-medium text-[#513897]">
                  Message * (Max 1000 characters)
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  maxLength={1000}
                  className="resize-none w-full px-4 py-3 rounded-lg border border-[#e0d6ff] focus:border-[#513897] focus:ring-2 focus:ring-[#b8b2ff] transition-all"
                  placeholder="Your message..."
                  required
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 2px rgba(81, 56, 151, 0.3)",
                  }}
                />
                <div className="text-right text-xs text-gray-500">
                  {formData.message.length}/1000 characters
                </div>
              </div>

              {/* CAPTCHA - Compact */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-[#513897]">
                  Security Verification *
                </label>
                
                <div className="flex items-center gap-2">
                  {/* Distorted CAPTCHA Display */}
                  <div className="relative flex-1 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg px-3 py-2 border border-[#e0d6ff] overflow-hidden">
                    <div className="flex justify-center items-center gap-0.5 flex-wrap">
                      {captchaDisplayText && captchaDisplayText.length > 0 ? (
                        captchaDisplayText.map((item, index) => (
                          <span
                            key={index}
                            style={{
                              display: 'inline-block',
                              transform: `rotate(${item.rotation}deg)`,
                              color: item.color,
                              fontSize: '18px',
                              fontFamily: 'monospace',
                              fontWeight: 'bold',
                              letterSpacing: `${item.spacing}px`,
                              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                              margin: '0 1px',
                              filter: 'blur(0.3px)'
                            }}
                            className="select-none"
                          >
                            {item.char}
                          </span>
                        ))
                      ) : (
                        <span className="text-lg font-mono font-bold text-[#1d0073]">
                          {captchaText || 'LOADING'}
                        </span>
                      )}
                    </div>
                    {/* Line-through noise overlay */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                      <svg className="w-full h-full opacity-20">
                        <line x1="0" y1="15" x2="200" y2="25" stroke="#1d0073" strokeWidth="1" />
                        <line x1="50" y1="5" x2="250" y2="35" stroke="#1d0073" strokeWidth="0.5" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Refresh Button - Compact */}
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-2 rounded-lg bg-[#f0eaff] hover:bg-[#e0d6ff] transition-colors"
                    title="Refresh CAPTCHA"
                  >
                    <FiRefreshCw className="w-4 h-4 text-[#513897]" />
                  </button>
                </div>
                
                {/* CAPTCHA Input */}
                <input
                  type="text"
                  value={userCaptchaInput}
                  onChange={(e) => {
                    setUserCaptchaInput(e.target.value);
                    setCaptchaError(false);
                  }}
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    captchaError ? 'border-red-500' : 'border-[#e0d6ff]'
                  } focus:border-[#513897] focus:ring-2 focus:ring-[#b8b2ff] transition-all`}
                  placeholder="Enter the code above (case sensitive)"
                  required
                />
                
                {captchaError && (
                  <p className="text-red-500 text-xs mt-1">
                    CAPTCHA verification failed. Please try again.
                  </p>
                )}
              </div>

              {/* Cooldown Warning */}
              {cooldownRemaining > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-center">
                  <p className="text-yellow-600 text-xs">
                    Wait {cooldownRemaining} seconds before sending another message.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                className="flex gap-3 justify-center text-center items-center w-full py-2.5 rounded-lg bg-[#513897] text-white hover:bg-[#3d2a6e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                type="submit"
                disabled={isSending || cooldownRemaining > 0}
              >
                {isSending ? (
                  <>
                    <span>Sending...</span>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                    <span>Send Email</span>
                    <FiMail className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Success/Error Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 ${
              isSuccess ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {isSuccess ? (
              <TiTickOutline className="w-5 h-5" />
            ) : (
              <MdSmsFailed className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ContactForm;