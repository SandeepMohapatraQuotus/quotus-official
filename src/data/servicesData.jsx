import { FiPenTool, FiCode, FiSmartphone, FiCpu, FiActivity } from "react-icons/fi";

export const servicesData = [
    {
      title: "UI/UX Design",
      icon: <FiPenTool className="text-[#21047c]" />,
      path: "/services/ui-ux-design",
      id:"subHeadings",
      items: [
        { title: "Wireframing & Prototyping" },
        { title: "User Interface Design" },
        { title: "User Experience Research" },
        { title: "Web & Mobile App Design" },
      ],
    },
    {
      title: "Web Development",
      icon: <FiCode className="text-[#21047c]" />,
      path: "/services/web-development",
      id:"subHeadings",
      items: [
        { title: "Frontend & Backend Development" },
        { title: "Custom Web Applications" },
        { title: "E-commerce & CMS Integration" },
        { title: "API Development & Integration" },
      ],
    },
    {
      title: "Mobile App Development",
      icon: <FiSmartphone className="text-[#21047c]" />,
      path: "/services/mobile-app-development",
      id:"subHeadings",
      items: [
        { title: "iOS & Android Development" },
        { title: "Flutter & React Native" },
        { title: "App Store Deployment" },
        { title: "UI/UX for Mobile" },
      ],
    },
    {
      title: "Blockchain Development",
      icon: <FiCpu className="text-[#21047c]" />,
      path: "/services/blockchain-development",
      id:"subHeadings",
      items: [
        { title: "Smart Contract Development" },
        { title: "Ethereum, Polygon, BSC" },
        { title: "Wallet & Token Integration" },
        { title: "DApp & NFT Solutions" },
      ],
    },
    {
      title: "AI Solutions",
      icon: <FiActivity className="text-[#21047c]" />,
      path: "/services/ai-solutions",
      id:"subHeadings",
      items: [
        { title: "AI Chatbots & Assistants" },
        { title: "Predictive Analytics" },
        { title: "Natural Language Processing" },
        { title: "Machine Learning Models" },
      ],
    },
  ];

  // data that sent to each component separately
  // blockchain development
  export const blockchainPageData = {
    section1: {
      image: "/service/blockchain/blockchainBg.jpg",
      title: "Innovative Blockchain Solutions",
      description: "From smart contracts to full-stack DApps, we bring decentralized ideas to life. We help startups and enterprises leverage blockchain for transparency, automation, and security.",
      cta: "Discover Blockchain Work"
    },
    section2: {
      title: "Our Blockchain Services",
      services: [
        { title: "Smart Contract Development", description: "Secure and gas-optimized contracts using Solidity and Vyper." },
        { title: "DApp Development", description: "Decentralized apps with seamless frontend integration." },
        { title: "Tokenization", description: "Launch custom ERC-20, ERC-721 or ERC-1155 tokens." },
        { title: "Wallet Integration", description: "Integrate MetaMask, WalletConnect, or custom wallets." },
        { title: "DeFi Platforms", description: "Yield farming, staking, and liquidity pool solutions." },
        { title: "Blockchain Consulting", description: "Architectural planning and ecosystem design." }
      ]
    },
    section3: {
      title: "Blockchain Stack",
      technologies: [
        { name: "Solidity", icon: "/service/blockchain/solidityLogo.svg", description: "Ethereum smart contract language" },
        { name: "Hardhat", icon: "/service/blockchain/hardhat.png", description: "Smart contract development environment" },
        { name: "Ethers.js", icon: "/service/blockchain/ether.png", description: "Lightweight Ethereum interaction library" },
        { name: "IPFS", icon: "/service/blockchain/ipfs.png", description: "Decentralized file storage" },
        { name: "Polygon", icon: "/service/blockchain/pol.jpeg", description: "Ethereum-compatible sidechain" },
        { name: "Cardano", icon: "/service/blockchain/cardanoimg.png", description: "Cardano blockchain" },
        { name: "Metamask", icon: "/service/blockchain/metamask.png", description: "Popular Ethereum wallet" }
      ]
    },
    section4:{
      otherServices:[
        { 
          name: "UI UX Design", 
          path:"/services/ui-ux-design",
          imageUrl:"/service/additionalServices/uiux.avif"
          
        },
        { 
          name: "Web Development", 
          path:"/services/web-development",
          imageUrl:"/service/additionalServices/webDev.jpeg"
          
        },
        {
          name:"Mobile App Development",
          path:"/services/mobile-app-development",
          imageUrl:"/service/additionalServices/mobile.webp"
        },
        {
          name:"AI Solutions",
          path:"/services/ai-solutions",
          imageUrl:"/service/additionalServices/ai.jpeg"
        }
      ]
    }
  };

  //mobile app development
  export const mobileAppPagedata = {
    section1: {
      image: "/service/mobileApp/mobile.avif",
      title: "Intuitive Mobile Experiences",
      description:
        "Transform your business vision into feature-rich, ultra-responsive mobile applications for iOS & Android. We blend high-speed performance, intuitive touch interfaces, and enterprise-grade security to power your digital growth.",
      cta: "See Our Apps",
    },
    section2: {
      title: "Our Mobile App Services",
      services: [
        {
          title: "iOS & Android Apps",
          description: "Deploy to both App Store & Play Store with a single, high-performance codebase—cutting development costs by up to 40% without compromising native fluidity.",
        },
        {
          title: "Cross-Platform Apps",
          description: "Modern, accessible interfaces engineered around thumb-zone ergonomics, gesture navigation, and animated micro-interactions that keep retention rates high.",
        },
        {
          title: "UI/UX for Mobile",
          description: "Frictionless publishing management for Apple App Store and Google Play Store, including privacy compliance, guidelines approval, and keyword optimization.",
        },
        {
          title: "App Store Deployment",
          description: "Frictionless publishing management for Apple App Store and Google Play Store, including privacy compliance, guidelines approval, and keyword optimization.",
        },
        {
          title: "Backend Integration",
          description:
            "Seamlessly link your app to REST/GraphQL APIs, real-time push notifications, payment gateways (Stripe/PayPal), and cloud databases.",
        },
        {
          title: "Maintenance & Updates",
          description: "24/7 crash monitoring, OS version compatibility updates, memory optimization, and continuous security patching to guarantee 99.9% app uptime.",
        },
      ],
    },
    section3: {
      title: "Mobile Tech Stack",
      technologies: [
        {
          name: "Flutter",
          icon: "/service/mobileApp/flutter.svg",
          description: "Fast UI toolkit from Google",
        },
        {
          name: "React Native",
          icon: "/service/mobileApp/react.svg",
          description: "Reusable React-based mobile development",
        },
        {
          name: "Kotlin",
          icon: "/service/mobileApp/kotlin.svg",
          description: "Modern language for Android",
        },
        {
          name: "Swift",
          icon: "/service/mobileApp/swift.svg",
          description: "Powerful iOS programming language",
        },
        {
          name: "Firebase",
          icon: "/service/mobileApp/firebase.svg",
          description: "Realtime database and hosting",
        },
      ],
    },
    section4: {
      otherServices: [
        {
          name: "UI UX Design",
          path: "/services/ui-ux-design",
          imageUrl: "/service/additionalServices/uiux.avif",
        },
        {
          name: "Web Development",
          path: "/services/web-development",
          imageUrl: "/service/additionalServices/webDev.jpeg",
        },
        {
          name: "Blockchain Development",
          path: "/services/blockchain-development",
          imageUrl: "/service/additionalServices/blockchainDev.webp",
        },
        {
          name: "AI Solutions",
          path: "/services/ai-solutions",
          imageUrl: "/service/additionalServices/ai.jpeg",
        },
      ],
    },
  };

  //web dev

  export const webDevPageData = {
    section1: {
      image: "/service/webDevelopment/webDev.jpeg",
      title: "Robust & Scalable Web Development",
      description: "Building high-performance, secure, and scalable websites and web applications tailored to your business goals, with modern frontend and backend technologies, seamless API integrations, and responsive designs that deliver exceptional user experiences and support long-term business growth.",
      cta: "Get Started"
    },
    section2: {
      title: "Our Web Development Services",
      services: [
        { title: "Frontend Development", description: "High-speed, intuitive interfaces crafted with React, Vue, or Angular to deliver responsive layout animations, fluid navigation, and peak interactivity across all screen sizes." },
        { title: "Backend Development", description: "Secure, high-throughput server-side architecture built with Node.js, Express, or Django, engineered to handle complex business logic and heavy data processing seamlessly." },
        { title: "API Development", description: "Fast, reliable RESTful and GraphQL APIs designed for multi-platform integration, secure third-party data synchronization, and frictionless communication between microservices." },
        { title: "CMS Integration", description: "Flexible content management setups powered by WordPress, Strapi, or Headless CMS solutions, giving your team full editorial control without sacrificing site performance." },
        { title: "E-commerce Solutions", description: "High-converting online store builds leveraging Shopify, WooCommerce, or custom full-stack solutions, integrated with secure payment gateways and scalable inventory logic." },
        { title: "Progressive Web Apps", description: "Mobile-first, offline-capable web applications that look, feel, and perform like native mobile apps—delivering push notifications, instant loading, and cross-platform flexibility." }
      ]
    },
    section3: {
      title: "Our Tech Stack",
      technologies: [
        { name: "React", icon: "/service/webDevelopment/react.svg", description: "Dynamic frontend library" },
        { name: "Next.js", icon: "/service/webDevelopment/nextjs.svg", description: "SSR and SSG capabilities" },
        { name: "Node.js", icon: "/service/webDevelopment/nodejs.svg", description: "Scalable backend JavaScript runtime" },
        { name: "Express", icon: "/service/webDevelopment/express.svg", description: "Minimal and flexible backend framework" },
        { name: "MongoDB", icon: "/service/webDevelopment/mongodb.svg", description: "Flexible NoSQL database" },
        { name: "MySQL", icon: "/service/webDevelopment/mysql.svg", description: "Relational database support" },
        { name: "Tailwind CSS", icon: "/service/webDevelopment/Tailwind.png", description: "Utility-first CSS framework" }
      ]
    },
    section4:{
      otherServices:[
        { 
          name: "UI UX Design", 
          path:"/services/ui-ux-design",
          imageUrl:"/service/additionalServices/uiux.avif"
          
        },
        {
          name:"Mobile App Development",
          path:"/services/mobile-app-development",
          imageUrl:"/service/additionalServices/mobile.webp"
        },
        {
          name:"Blockchain Development",
          path:"/services/blockchain-development",
          imageUrl:"/service/additionalServices/blockchainDev.webp"
        },
        {
          name:"AI Solutions",
          path:"/services/ai-solutions",
          imageUrl:"/service/additionalServices/ai.jpeg"
        }
      ]
    }
  };

  //uiux

  export const uiuxPageData = {
    section1: {
      image: "/service/uiux/uiux_no_logo.avif",
      title: "Crafting Exceptional Digital Experiences",
      description: "We blend user-centric aesthetics with seamless functionality to build intuitive interfaces that delight users and maximize conversion rates. Our design strategy centers on deep human-centered research, transforming complex workflows into clean, accessible, and high-impact digital products.",
      cta: "View Our Work"
    },
    section2: {
      title: "Digital Experiences Designed Around Your Customers",
      services: [
        {
          title: "User Research",
          description: "Discover what your customers need, where they get stuck, and how to make your product easier to use."
        },
        {
          title: "Wireframing & Prototyping",
          description: "Map clear user journeys and test ideas early, helping your team align on the experience before development starts."
        },
        {
          title: "UI Design",
          description: "Create polished, accessible interfaces that express your brand and help customers find what they need."
        },
        {
          title: "UX Strategy",
          description: "Bring customer needs and business goals together in a practical experience roadmap for your product."
        },
        {
          title: "Design Systems",
          description: "Keep every screen consistent with reusable components and clear design rules that make future updates easier."
        },
        {
          title: "Usability Testing",
          description: "See where people struggle, uncover friction in key journeys, and prioritize improvements with confidence."
        }
      ]
    },
    section3: {
      title: "Our Design Toolkit",
      technologies: [
        { 
          name: "Figma", 
          icon: "/service/uiux/figma.svg",
          description: "Our primary design and prototyping tool" 
        },
        { 
          name: "Adobe XD", 
          icon: "/service/uiux/xd.svg",
          description: "For advanced prototyping and micro-interactions" 
        },
        { 
          name: "Sketch", 
          icon: "/service/uiux/sketch.svg",
          description: "Vector design and collaboration" 
        },
        { 
          name: "Photoshop", 
          icon: "/service/uiux/photoshop.svg",
          description: "Advanced image editing and manipulation" 
        },
        { 
          name: "Illustrator", 
          icon: "/service/uiux/illustrator.svg",
          description: "Vector graphics and icon design" 
        },
        
      ]
    },
    section4:{
      otherServices:[
        { 
          name: "Web Development", 
          path:"/services/web-development",
          imageUrl:"/service/additionalServices/webDev.jpeg"
          
        },
        {
          name:"Mobile App Development",
          path:"/services/mobile-app-development",
          imageUrl:"/service/additionalServices/mobile.webp"
        },
        {
          name:"Blockchain Development",
          path:"/services/blockchain-development",
          imageUrl:"/service/additionalServices/blockchainDev.webp"
        },
        {
          name:"AI Solutions",
          path:"/services/ai-solutions",
          imageUrl:"/service/additionalServices/ai.jpeg"
        }
      ]
    }
  };

  //ai
 export const aiPageData = {
    section1: {
      image: "/service/ai/aiBg.jpg",
      title: "AI That Thinks For You",
      description: "Our AI solutions harness machine learning and natural language processing to automate workflows, predict outcomes, and generate insights. We bridge data and decisions using intelligent models.",
      cta: "View our works"
    },
    section2: {
      title: "Our AI Capabilities",
      services: [
        { title: "Machine Learning Models", description: "Custom predictive models tailored to your data." },
        { title: "NLP Solutions", description: "Text classification, summarization, chatbots, and sentiment analysis." },
        { title: "Computer Vision", description: "Image recognition, object detection, and visual inspection tools." },
        { title: "AI Chatbots", description: "Conversational bots trained to handle real-world queries." },
        { title: "Recommendation Systems", description: "Collaborative filtering and deep learning for personalization." },
        { title: "AI Integration", description: "Embed AI into your existing products and infrastructure." }
      ]
    },
    section3: {
      title: "AI Tools & Platforms",
      technologies: [
        { name: "TensorFlow", icon: "/service/ai/tensflow.png", description: "End-to-end ML platform by Google" },
        { name: "PyTorch", icon: "/service/ai/pyt.png", description: "Flexible ML library by Facebook" },
        { name: "OpenAI", icon: "/service/ai/openai.webp", description: "Generative AI and NLP models" },
        
      ]
    },
    section4:{
      otherServices:[
        { 
          name: "UI UX Design", 
          path:"/services/ui-ux-design",
          imageUrl:"/service/additionalServices/uiux.avif"
          
        },
        { 
          name: "Web Development", 
          path:"/services/web-development",
          imageUrl:"/service/additionalServices/webDev.jpeg"
          
        },
        {
          name:"Mobile App Development",
          path:"/services/mobile-app-development",
          imageUrl:"/service/additionalServices/mobile.webp"
        },
        {
          name:"Blockchain Development",
          path:"/services/blockchain-development",
          imageUrl:"/service/additionalServices/blockchainDev.webp"
        },
      ]
    }
  }