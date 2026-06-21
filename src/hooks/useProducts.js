import { useState, useEffect } from "react";

const API_URL = "https://fakestoreapiserver.reactbd.com/walmart";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Ошибка сети: ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : data.products || data.data || [];
        setProducts(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
