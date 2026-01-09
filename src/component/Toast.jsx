import { useEffect } from "react";
import "./Toast.css";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return <div className={`toast ${type}`}>{message}</div>;
}
