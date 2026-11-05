import React, { useState } from "react";
// replace react-router with 'react-router-dom' after its install
import { Link } from "react-router";

const CheckoutPage = () => {
  // check whether the user has confirmed payment submission or not
  const [isSubmitted, setIsSubmitted] = useState(false);

  // initialize the form field data object
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    shippingAddress: "",
    zipCode: "",
  });

  //   compute the cart total for the invoice calc
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  //   add taxes and compute total
  const taxes = subtotal * 0.06;
  const total = subtotal + taxes;

  // <MISSED THIS FUNCTION IN CLASS>event listener to handle form input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   event listener to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    onClearCart();
  };

  if (isSubmitted) {
    return (
      <div className="checkout-success">
        <h2>Order Placed Successfully</h2>
        <p>
          THank you, {formData.fullName}. A confirmation email is sent to{" "}
          {formData.email}. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Amet quisquam quod impedit dolorum animi eius iusto, non soluta
          autem officia nostrum totam obcaecati quis, fugiat nihil possimus
          voluptates illo dolores.
        </p>
        <Link className="btn btn-primary" to="/">
          Return to HomePage
        </Link>
      </div>
    );
  }

  // edge cases
  if (cart.length === 0) {
    return (
      <div className="empty-cart-page">
        <h2> Your cart is empty.</h2>
        <Link className="btn btn-secondary" to="/">
          Shop for some item please.
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout and Order Confirmation</h1>

      <div className="checkout-grid">
        {/* FORM element */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>
          <div className="form-group">
            <label htmlFor="fullName"> Full Name *</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"> Email *</label>
            <input
              type="text"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress"> Shipping Address *</label>
            <input
              type="text"
              name="shippingAddress"
              id="shippingAddress"
              required
              value={formData.shippingAddress}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode"> Zip Code*</label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              required
              pattern="[0-9]{5}"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">
            Complete Order (${total.toFixed(2)})
          </button>
          {/* CHECK: handleSubmit and handleChange confusion */}
        </form>

        {/* INVOICE or SUMMARY section */}
        <aside className="order-summary-card">
          <h3>Order Summary</h3>
          <ul className="summary-list">
            {cart.map((item) => (
              <li key={item.id} className="summary-row">
                <span>
                  {item.name} &times; {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr />
          <div className="summary-row">
            <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax (6%):</span> <span>${taxes.toFixed(2)}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total:</span> <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
