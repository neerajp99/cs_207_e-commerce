import React from "react";

import PropTypes from "prop-types";

const CartCount = ({ value, type, pattern, className }) => {
  return (
    <div>
      <button className="negative" onClick={this.decrementValue}>
        &#8722;{" "}
      </button>

      <input
        className={className}
        value={value}
        pattern={pattern}
        type={type}
        onChange={this.onChange}
      />
      <button className="positive" onClick={this.incrementValue}>
        &#43;
      </button>
    </div>
  );
};

export default CartCount;
