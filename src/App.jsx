import { useEffect, useState } from "react";
import ProductForm from "./component/ProductForm";

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch API data
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // Add product
  const handleAdd = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  // Update product
  const handleUpdate = (updated) => {
    const updatedList = products.map((item) =>
      item.id === updated.id ? updated : item
    );
    setProducts(updatedList);
    setEditingProduct(null);
  };

  // Delete product
  const handleDelete = async (id) => {
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((p) => p.id !== id));
  };

  // Search filter
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Dashboard</h1>

      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
      />

      {/* Add / Edit Product Form */}
      <ProductForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingProduct={editingProduct}
      />

      {/* Products Table */}
      <table
        border="1"
        width="100%"
        cellPadding="10"
        style={{ marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price ($)</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img src={item.image} width="50" alt="" />
              </td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>

              <td>
                <button onClick={() => setEditingProduct(item)}>Edit</button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
