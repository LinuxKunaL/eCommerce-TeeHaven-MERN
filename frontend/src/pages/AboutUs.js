import React from "react";

function AboutUs() {
  return (
    <div className="PrivacyPolicyTermConditionsAboutUs">
      <div className="section_1">
        <h1>About Us</h1>
        <div className="Navigate">
          <span>Home</span>-<b>About Us</b>
        </div>
      </div>
      <div className="section_2">
        <h1>About TeeHaven</h1>
        <p>
          Welcome to TeeHaven, an Indian fashion destination that blends
          cultural richness with contemporary styles. Established with a
          deep-rooted passion for fashion, TeeHaven is proud to represent the
          vibrant and diverse tapestry of India's clothing traditions.
        </p>

        <h2>Our Journey</h2>
        <p>
          TeeHaven began its journey with the vision to showcase the unique and
          exquisite fashion heritage of India. Our curated collection is a
          celebration of the country's rich textile traditions, embroidery
          techniques, and diverse cultural influences.
        </p>

        <h2>Why Choose TeeHaven?</h2>
        <p>
          <b>Indian Elegance:</b> Discover clothing that reflects the elegance
          and charm of India's traditional attire, reinterpreted for modern
          tastes. <br />
          <br />
          <b>Quality Craftsmanship:</b> Each piece at TeeHaven is a result of
          meticulous craftsmanship, ensuring the highest standards of quality.{" "}
          <br />
          <br />
          <b>Inclusive Fashion:</b> We believe in offering fashion that embraces
          diversity and caters to various body types and style preferences.
          <br />
          <br />
          <b>Eco-Friendly Practices</b> : TeeHaven is committed to sustainable
          and eco-friendly fashion practices to contribute positively to the
          environment.
        </p>

        <h2>Our Mission</h2>
        <p>
          TeeHaven is on a mission to bridge the gap between traditional Indian
          fashion and contemporary global trends. We aspire to be a one-stop
          destination for individuals seeking not just clothing but a connection
          to India's rich cultural heritage through fashion.
        </p>

        <h2>Contact Us</h2>
        <p>
          We are proud to be an Indian company, and your satisfaction is our
          priority. For any inquiries or assistance, please feel free to contact
          our dedicated team at {process.env.REACT_APP_CONTACT_EMAIL} .
        </p>

        <p>
          Thank you for choosing TeeHaven and being a part of our journey to
          redefine Indian fashion on a global scale!
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
