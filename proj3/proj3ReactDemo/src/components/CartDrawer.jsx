import React from "react";
// the package react-router needs to be replaced
// with "react-router-dom"
// run the following commands in your terminal in the root dir of your proj
// step 1: npm uninstall react-router
// step 2: npm install react-router-dom
// step 3: in code files replace "react-router" with "react-router-dom"
// CRUD create read update delete (traversal)
import { useNavigate } from "react-router";

const CartDrawer = ({ isOpen, cart, onClose, onUpdateQuantity, onRemove }) => {
  // Pre-processing logic - to control auto- navigation to checkout page etc.

  // create a new instance of the useNavigate hook
  const navigate = useNavigate();

  // if the drawer is not open then break out of this component
  if (!isOpen) return null;

  // logic: calculating the total price.
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // the first introduction to auto-navigation
  // when a user complete an action on the page take them somewhere
  const handleProceedToCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>Your Cart ({cart.length})</h2>
          <button type="button" className="btn-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart">Your cart is currently empty</div>
          ) : (
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />

                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="qty-controls">
                      <button onClick={() => onUpdateQuantity(item.id, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)}>
                        +
                      </button>
                      <button
                        className="btn-remove"
                        onClick={() => onRemove(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="subtotal-row">
              <span>Subtotal:</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
