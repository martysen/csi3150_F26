import React, { useState } from "react";
import { Link, useParams } from "react-router";

const ProductDetailPage = ({ products, onAddToCart }) => {
  // create the state of the component
  const { productId } = useParams();
  const [qty, setQty] = useState(1);

  //   which product to display on this page?
  const product = products.find((p) => p.id === productId);

  //   sanity check: if product is missing?
  if (!product) {
    return (
      <div className="detail-error">
        <h2>Product Not Found</h2>
        <Link className="btn btn-secondary" to="/">
          Return To Main Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <nav className="breadcrumb">
        <Link to="/">Catalog</Link> &gt; <span>{product.name}</span>
      </nav>

      <div className="detail-grid">
        <img src={product.img} alt={product.name} className="detail-img" />

        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">{product.price.toFixed(2)}</p>
          <p className="detail-desc">{product.description}</p>
          <div className="stock-tag">
            {product.stock > 0
              ? "✓ In Stock ({product.stock} units available)"
              : "Out of Stock"}
          </div>

          <div className="detail-actions">
            <div className="qty-input-group">
              <label htmlFor="detail-qty">Quantity: </label>
              <input
                type="number"
                id="detail-qty"
                min="1"
                max={product.stock}
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, parseInt(e.target.value, 10) || 1))
                }
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => onAddToCart(product, qty)}
            >
              Add {qty} to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
