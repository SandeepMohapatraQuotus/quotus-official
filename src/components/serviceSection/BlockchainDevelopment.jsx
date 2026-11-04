import React from 'react'
import CommonSection from './CommonSection';
import {blockchainPageData} from "../../data/servicesData";
import SEO from '../../SEO';

function BlockchainDevelopment() {
  
 
  return (
    <div>
      <SEO
        title="Blockchain Development Services | Quotus Software Solutions"
        description="Leverage blockchain technology with Quotus Software Solutions. From smart contracts to DApps, we build secure, scalable, and future-ready blockchain solutions."
        keywords="blockchain development, smart contracts, DApps, DeFi solutions, enterprise blockchain, Quotus blockchain"
        image="https://quotus.co.in/QuotusLOGO.png"
        url="https://quotus.co.in/services/blockchain-development"
      />

      <CommonSection data={blockchainPageData} />
    </div>
  );
}

export default BlockchainDevelopment