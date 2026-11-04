import React, { useEffect, useState } from "react";
import { ProductDetails } from "../src/components/productSection/ProductDetails";
import FeatureSection from "../src/components/productSection/FeatureSection";
import { KeyBenefitsSection } from "../src/components/productSection/KeyBenefitsSection";
import { useLocation } from "react-router-dom";
import { ourProducts } from "../src/data/ProductPageData";
import Faq from "../src/components/productSection/FaqSection";
import FeedoraPlatform from "../src/components/productSection/custom/feedora/FeedoraPlatforms";
import FutureFeaturesSection from "../src/components/productSection/custom/feedora/FutureFeaturesSection";
import { BookDemo } from "../src/components/productSection/BookDemo";
import SEO from "../src/SEO";

function Product() {
  const location = useLocation();
  const [productData, setProductData] = useState();

  useEffect(() => {
    const subPath = location.pathname
      .replace(/^\/product\/?/, "")
      .toLowerCase();

    if (!subPath) {
      // console.log("No subpath — you're on the main product page.");
      return;
    }

    const matchedProduct = ourProducts.find(
      (product) => product.slug.toLowerCase() === subPath
    );

    if (matchedProduct) {
      // console.log("Matched product:", matchedProduct);
      setProductData(matchedProduct);
      // console.log("Product Data:", matchedProduct);
    } else {
      console.log("No matching product found for:", subPath);
    }
  }, [location.pathname]);

  return (
    <div>
      {/*  Dynamic SEO */}
      {productData && (
        <SEO
          title={
            productData.seo?.title || "Products | Quotus Software Solutions"
          }
          description={
            productData.seo?.description ||
            "Explore innovative products by Quotus Software Solutions."
          }
          keywords={
            productData.seo?.keywords ||
            "Quotus products, blockchain, AI, SaaS, enterprise software"
          }
          image={productData.seo?.image || "https://quotus.io/QuotusLOGO.png"}
          url={productData.seo?.url}
        />
      )}
      {!productData && <div className="text-black h-screen"></div>}

      {productData && (
        <div className="py- px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <ProductDetails productData={productData.productHeadingSection} />
          <FeatureSection productData={productData.featureSection} />
          {productData.platformIntegratins && (
            <FeedoraPlatform
              platformIntegratins={productData.platformIntegratins}
            />
          )}
          {productData.upcomingFeatures && (
            <FutureFeaturesSection
              upcomingFeatures={productData.upcomingFeatures}
            />
          )}

          <KeyBenefitsSection productData={productData.productBenefits} />
          {/* <BookDemo/> */}
          <Faq productData={productData.faqSection} />
        </div>
      )}
    </div>
  );
}

export default Product;
