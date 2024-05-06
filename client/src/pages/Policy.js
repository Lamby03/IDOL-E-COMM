import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Our Policy"}  description={"Secrecy is best policy"} author={"IDOL"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/policy.jpg"
            alt="privacy policy "
            style={{ width: "100%" }}
          ></img>
        </div>
        <div className="col-md-6">
          {/* <h1 className="bg-dark p-2 text-white text-center"> OUR PRIVACY</h1> */}
          <p className="text-justify mt-2" style={{ textAlign: "justify" }}>
            Our commitment to your privacy is paramount. At IDOL, we understand
            the importance of safeguarding your personal information and
            maintaining the trust you place in us. Rest assured that any data
            collected during your interactions with our platform is handled with
            the utmost care and confidentiality. We strictly adhere to
            industry-leading security measures to protect your information from
            unauthorized access, disclosure, alteration, or destruction. From
            the moment you visit our website to the completion of your
            transaction, your privacy rights remain our top priority. Our
            privacy policy is designed to transparently outline our practices
            regarding protection of your data.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
