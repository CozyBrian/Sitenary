import "./style.scss";

export const Feature = () => {
  const featureData = [
    {
      title: "Real-time website tracking",
      description:
        "Instantly monitor your website traffic, user engagement, and site performance metrics with Sitenary's real-time website tracking feature.",
    },
    {
      title: "Customizable dashboard",
      description:
        "Tailor Sitenary's dashboard to suit your particular business needs. Choose the website metrics most relevant to you and rearrange them to meet your reporting goals.",
    },
    {
      title: "SEO Insights",
      description:
        "Gain valuable insights into your website's SEO performance, including critical keyword rankings, organic traffic volumes, and more, thanks to Sitenary's in-depth analytics.",
    },
  ];

  return (
    <div className="feature-container">
      <div className="feature-text-container">
        <h2 className="feature-header-subtext">
          <span className="relative inline-block">
            <svg viewBox="0 0 52 24" fill="currentColor" className="svg-box">
              <defs>
                <pattern
                  id="18302e52-9e2a-4c8e-9550-0cbb21b38e55"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#18302e52-9e2a-4c8e-9550-0cbb21b38e55)"
                width="52"
                height="24"
              />
            </svg>
          </span>
          The best Google Analytics alternative with a focus on ease of use.
        </h2>
        <p className="feature-text">
          Discover a Powerful and User-Friendly Google Analytics Alternative
          that Simplifies Data Analysis: A Comprehensive Review
        </p>
      </div>
      <div className="feature-grid-contaienr">
        {featureData.map((item, i) => {
          return (
            <div key={`feature-${i}`} className="feature-grid-item">
              <div>
                <div className="item-icon">
                  <svg
                    className="icon-svg"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
                <h6 className="item-title">{item.title}</h6>
                <p className="item-description">{item.description}</p>
              </div>
              <p aria-label="" className="item-link">
                Learn more
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
