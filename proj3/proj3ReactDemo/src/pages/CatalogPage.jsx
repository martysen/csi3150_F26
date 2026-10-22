import React, { useState } from "react";

function CatalogPage({ products, onAddToCart }) {
  // regular js comment
  const categories = ["All", "Mugs", "Planters", "Plates"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  //    put a safety check - what happens if data is bad or missing
  const validProducts = products || [];

  const filteredProducts =
    selectedCategory === "All"
      ? validProducts
      : validProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="catalog-container">
      <header className="catalog-hero">
        <h1>Handcrafted Functional Stoneware</h1>
        <p>
          Sustainable ceramics shaped by hand for intentional daily rituals.
        </p>
      </header>

      {/**this is how to comment INSIDE THE RETURN stmnt */}
      <div className="filter-bar">
        {categories.map(() => {
          <button
            key={cat}
            className={`filter-pill ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>;
        })}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
