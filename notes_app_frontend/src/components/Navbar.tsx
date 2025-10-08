import React from "react";

type Props = {
  onPreview: () => void;
};

// PUBLIC_INTERFACE
const Navbar: React.FC<Props> = ({ onPreview }) => {
  /** Ocean Professional top bar with app title and preview action. */
  return (
    <header className="navbar" role="banner">
      <div className="navbar-left">
        <div className="brand">
          <span className="brand-logo" aria-hidden="true">📝</span>
          <span className="brand-text">Ocean Notes</span>
        </div>
      </div>
      <div className="navbar-right">
        <button
          className="btn primary"
          onClick={onPreview}
          aria-label="Open video preview"
        >
          Preview
        </button>
      </div>
    </header>
  );
};

export default Navbar;
