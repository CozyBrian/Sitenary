import "./style.scss";

export const Pricing = () => {
  return (
    <div className="feature-containe">
      <div className="feature-text-container">
        <h2 className="feature-header-subtext">Pricing</h2>
        <p className="feature-text">Trust me bro, you can afford this</p>
      </div>
      <div className="feature-grid-contaie">
        <div className="feature-grid-item">
          <div>
            <h6 className="item-title">$0.00</h6>
            <h6 className="item-title">FREE</h6>
            <p className="item-description">
              I was bored, so I made this, and I have no plans to monetize
              anytime soon..lol
            </p>
          </div>
          <p aria-label="" className="item-link">
            Learn more
          </p>
        </div>
      </div>
    </div>
  );
};
