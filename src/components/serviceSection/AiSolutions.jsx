import React from 'react';
import CommonSection from './CommonSection';
import {aiPageData} from "../../data/servicesData";
import SEO from '../../SEO';

function AiSolutions() {


  return (
    <div>
      <SEO
        title="AI Solutions & Development | Quotus Software Solutions"
        description="Transform your business with AI solutions from Quotus Software Solutions. From machine learning to NLP, we deliver AI-powered applications tailored to your needs."
        keywords="AI solutions, artificial intelligence, machine learning, NLP, computer vision, Quotus AI services"
        image="https://quotus.co.in/QuotusLOGO.png"
        url="https://quotus.co.in/services/ai-solutions"
      />

      <CommonSection data={aiPageData} />
    </div>
  );
}

export default AiSolutions