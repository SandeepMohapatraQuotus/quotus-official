import React from 'react'
import CommonSection from './CommonSection';
import {uiuxPageData} from "../../data/servicesData";
import SEO from '../../SEO';

function UiUxDesign() {


  return (
    <div className="">
      <SEO
        title="UI/UX Design Services | Quotus Software Solutions"
        description="Get cutting-edge UI/UX design services from Quotus Software Solutions. We create user-friendly, engaging, and visually appealing designs for web and mobile apps."
        keywords="UI/UX design, user experience, user interface, mobile app design, web design, Quotus design services"
        image="https://quotus.co.in/QuotusLOGO.png"
        url="https://quotus.co.in/services/ui-ux-design"
      />
      <CommonSection data={uiuxPageData} />
    </div>
  );
}

export default UiUxDesign;