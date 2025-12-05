import { useEffect, useState } from "react";

export default function ProductForm({ onAdd, onUpdate, editingProduct }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setPrice(editingProduct.price);
      setCategory(editingProduct.category);
      setImage(editingProduct.image);
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = { title, price, category, image };

    //editing product
    if (editingProduct) {
      const res = await fetch(
        `https://fakestoreapi.com/products/${editingProduct.id}`,
        {
          method: "PUT",
          body: JSON.stringify(productData),
        }
      );
      const updated = await res.json();
      onUpdate(updated);
    } else {
      // Add product
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify(productData),
      });
      const newProduct = await res.json();
      onAdd(newProduct);
    }

    setTitle("");
    setPrice("");
    setCategory("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        style={{ padding: "8px", width: "150px", marginRight: "10px" }}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        style={{ padding: "8px", width: "200px", marginRight: "10px" }}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
        style={{ padding: "8px", width: "250px", marginRight: "10px" }}
      />

      <button type="submit">{editingProduct ? "Update" : "Add"}</button>
    </form>
  );
}
