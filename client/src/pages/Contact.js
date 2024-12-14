import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"} description={"Feel free to contact us"} author={"IDOL"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2" style={{textAlign:"justify"}}>
            Your feedback matters. Reach out to us with any questions, concerns,
            or suggestions, and let's build something incredible together.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@idol.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-29945678
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
