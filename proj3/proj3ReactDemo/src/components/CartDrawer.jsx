import React from "react";
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
    {
      /**The /checkout page does not exist yet and we will create it after this */
    }
    navigate("/checkout");
  };

  return <div>CartDrawer</div>;
};

export default CartDrawer;
