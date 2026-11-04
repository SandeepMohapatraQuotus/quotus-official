import React from 'react'
import CommonSection from './CommonSection';
import {webDevPageData} from "../../data/servicesData";
import SEO from '../../SEO';

function WebDevelopment() {

 
  return (
    <div>
      <SEO
        title="Web Development Services | Quotus Software Solutions"
        description="Build scalable, secure, and high-performing websites with Quotus Software Solutions. Our web development team delivers custom solutions tailored to your business needs."
        keywords="web development, custom websites, enterprise web apps, Quotus web services, software development"
        image="https://quotus.co.in/QuotusLOGO.png"
        url="https://quotus.co.in/services/web-development"
      />
      <CommonSection data={webDevPageData} />
    </div>
  );
}

export default WebDevelopment