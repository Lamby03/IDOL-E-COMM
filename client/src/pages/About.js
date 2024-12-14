import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us"}  description={"The about page"} author={"IDOL"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <p className="text-justify mt-2" style={{textAlign:"justify"}}>
            At Idol, we're passionate about connecting you with
            the products and experiences that enhance your life. Our journey
            began with a simple vision: to create a seamless online marketplace
            where quality meets convenience. With a commitment to excellence in
            every aspect, we curate a diverse selection of products that cater
            to your unique needs and desires. Whether you're seeking the latest
            trends, timeless classics, or innovative solutions, we're here to
            inspire and empower you on your shopping journey. As a team, we
            pride ourselves on delivering exceptional customer service, ensuring
            that every interaction leaves you feeling valued and supported
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
