import React from 'react'
import IntroImage from '../src/components/common/IntroImage'
import Common from "../src/components/blogsSection/Common"
import SEO from '../src/SEO';

function Blog() {
  return (
    <div className="bg-white">
      <SEO
        title="How AI Booking Agents Transform Hotel Experiences today | Quotus Software Solutions"
        description="Explore the benefits of AI booking agents in the hotel booking experience - boost efficiency, guest satisfaction, and bookings with Quotus software solutions."
        keywords="Ai  booking agents"
        image="https://quotus.co.in/QuotusLOGO.png"
        url="https://quotus.co.in/blogs"
      />
      {/* intro image*/}
      <IntroImage title="Blogs" imageUrl="/commonEntroImage.jpg" />
      <Common />
    </div>
  );
}

export default Blog