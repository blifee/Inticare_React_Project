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
    } else {
      setTitle("");
      setPrice("");
      setCategory("");
      setImage("");
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = editingProduct ? editingProduct.id : Date.now();

    const productData = { id, title, price, category, image };

    if (editingProduct) {
      onUpdate(productData);
    } else {
      onAdd(productData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        required
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        required
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        required
        onChange={(e) => setImage(e.target.value)}
      />

      <button type="submit">
        {editingProduct ? "Update" : "Add"}
      </button>
    </form>
  );
}
