import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddtToCart }) => {
  // sanity check: make sure that product to display is not broken
  if (!product) return null;

  return (
    <article className="product-card">
      <Link className="product-img-link" to={`/product/${product.id}`}>
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </Link>
      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-price">
          $
          {typeof product.price === "number"
            ? product.price.toFixed(2)
            : "Contact For Price"}
        </p>
        <button
          className="btn btn-secondary btn-block"
          type="button"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
