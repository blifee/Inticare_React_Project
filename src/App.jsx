import { useEffect, useState } from "react";
import ProductForm from "./component/ProductForm";
import Toast from "./component/Toast";

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("products");

    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const updateLocalStorage = (list) => {
    localStorage.setItem("products", JSON.stringify(list));
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  // Add product
  const handleAdd = (newProduct) => {
    const updated = [...products, newProduct];
    setProducts(updated);
    updateLocalStorage(updated);
    showToast("Product added successfully!", "success");
  };

  // Update product
  const handleUpdate = (updatedData) => {
    const updated = products.map((item) =>
      item.id === updatedData.id ? updatedData : item
    );

    setProducts(updated);
    updateLocalStorage(updated);
    setEditingProduct(null);
    showToast("Product updated successfully!", "success");
  };

  // Delete product
  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    updateLocalStorage(updated);
    showToast("Product deleted!", "delete");
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <center>
        <h1>Product Dashboard</h1>
      </center>

      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

      {/* Add/Edit Form */}
      <ProductForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingProduct={editingProduct}
      />

      {/* Table */}
      <table width="100%" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img src={item.image} width="50" />
              </td>
              <td>{item.title}</td>
              <td>₹ {item.price}</td>
              <td>{item.category}</td>

              <td>
                <button onClick={() => setEditingProduct(item)}>Edit</button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ color: "red", marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast Popup */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
