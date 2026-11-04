import React from 'react';
import CommonSection from './CommonSection';
import {mobileAppPagedata} from "../../data/servicesData";
import SEO from '../../SEO';

function MobileAppDevelopment() {
  
  
  return (
    <div>
      <SEO
        title="Mobile App Development Services | Quotus Software Solutions"
        description="Quotus Software Solutions builds feature-rich mobile applications for iOS and Android. Deliver seamless user experiences with our custom mobile app development services."
        keywords="mobile app development, iOS apps, Android apps, cross-platform apps, Quotus mobile development"
        image="https://quotus.co.in/QuotusLOGO.png"
        url="https://quotus.co.in/services/mobile-app-development"
      />

      <CommonSection data={mobileAppPagedata} />
    </div>
  );
}

export default MobileAppDevelopment