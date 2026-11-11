import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import CatalogPage from "./pages/CatalogPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import { PRODUCTS } from "./data/products";

const App = () => {
  // universal states of the application
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // cart handlers -> unidirectional data flow
  //event handler to add items to the cart
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  //update the items in the cart - update operations
  const handleUpdateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  // removing items from the cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // subtotal of the cart must persist universally
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // JSX formulation
  return (
    <div className="app-container">
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <CatalogPage products={PRODUCTS} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/product/:productId"
            element={
              <ProductDetailPage
                products={PRODUCTS}
                onAddToCart={handleAddToCart}
              />
            }
          />

          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} onClearCart={handleClearCart} />}
          />
        </Routes>
      </main>

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
};

export default App;
