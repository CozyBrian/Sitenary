import React from "react";
import { Feature } from "./feature/feature";
import LandingSVG from "./landingsvg";
import { Pricing } from "./pricing/pricing";
import "./style.scss";

const HomePage = () => {
  return (
    <div className="landing-page">
      <div className="container">
        <header>
          <h1>Sitenary</h1>
          <nav>
            <ul>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </nav>
          <div className="action-section">
            <button className="primary">Sign Up</button>
            <button className="secondary">Login</button>
          </div>
        </header>

        {/* Hero section */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-content-text">
              <h2>Experience Better analytics with Siternary</h2>
              <p>
                For the longest time, website analytics software was seriously
                bad. It was hard to understand, time-consuming to use, and
                worse, it exploited visitor data for big tech to profit.
              </p>
              <br />
              <p>
                Sitenary is a Google Analytics alternative that doesn’t
                compromise visitor privacy for data. We revolutionized website
                analytics by making them easy to use and respectful of privacy
                laws (like GDPR and more).
              </p>
            </div>
            <div className="hero-content-image">
              <LandingSVG />
            </div>
          </div>
          <div className="cta-buttons">
            <button className="primary">Getting Started</button>
            <button className="secondary">Learn More</button>
          </div>
        </section>
      </div>

      {/* Features */}
      <section id="features">
        <Feature />
      </section>

      {/* Pricing */}
      <section id="pricing">
        <Pricing />
      </section>
    </div>
  );
};

export default HomePage;
