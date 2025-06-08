import React, { useEffect, useState } from "react";
import axios from "axios";
import "./shopping.css";

function Shopping() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  
  const handleImpression = (product) => {
    axios.post("http://localhost:5000/api/impression", { productId: product._id, timestamp: new Date() })
      .catch((err) => console.error("Error saving impression:", err));
  };

 
  const handleAddToCart = (product) => {
    axios.post("http://localhost:5000/api/cart", { productId: product._id, addedAt: new Date() })
      .then(() => alert("Added to cart!"))
      .catch((err) => console.error("Error adding to cart:", err));
  };


  const handleBuyNow = (product) => {
    axios.post("http://localhost:5000/api/buy", { productId: product._id, boughtAt: new Date() })
      .then(() => {
        const name = prompt("Enter your name:");
        const phoneNumber = prompt("Enter your phone number:");
        const location = prompt("Enter your location:");
        const address = prompt("Enter your full address:");
        if (name && phoneNumber && location && address) {
          axios.post("http://localhost:3000/api/details", {
            productId: product._id,
            name,
            phoneNumber,
            location,
            address
          })
        };
          alert("sucessfully recorded");

        })
      .catch((err) => console.error("Error buying product:", err));
  };

  return (
    <div className="shopping-container">
      
      <div className="product-list">
        {products.length === 0 && <p>No products available.</p>}
        {products.map(product => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => handleImpression(product)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.title || product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Rating:</strong> {product.rating || "N/A"}</p>
            <p><strong>Price:</strong> ${product.price?.$numberDouble || product.price}</p>
            <div className="product-buttons">
              <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className="add-btn">Add to Cart</button>
              <button onClick={(e) => { e.stopPropagation(); handleBuyNow(product); }}className="buy-btn">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shopping;
