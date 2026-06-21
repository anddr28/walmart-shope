import { useMemo, useState } from "react";
import { useProducts } from "./hooks/useProducts";
import { CategoryFilter } from "./components/CategoryFilter";
import { ProductGrid } from "./components/ProductGrid";
import styles from "./App.module.css";

export default function App() {
  const { products, loading, error } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category).filter(Boolean);
    return [...new Set(cats)].sort();
  }, [products]);

  const filtered = useMemo(() => {
    if (selectedCategories.size === 0) return products;
    return products.filter((p) => selectedCategories.has(p.category));
  }, [products, selectedCategories]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoStar}>★</span>
          <span className={styles.logoText}>Walmart</span>
        </div>
        <p className={styles.subtitle}>Онлайн-каталог товаров</p>
      </header>

      <main className={styles.main}>
        {loading && (
          <div className={styles.status}>
            <div className={styles.spinner} />
            <p>Загружаем товары…</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p>⚠️ Не удалось загрузить товары</p>
            <small>{error}</small>
          </div>
        )}

        {!loading && !error && (
          <>
            <CategoryFilter
              categories={categories}
              selected={selectedCategories}
              onChange={setSelectedCategories}
            />

            <div className={styles.resultsInfo}>
              Показано{" "}
              <strong>{filtered.length}</strong> из{" "}
              <strong>{products.length}</strong> товаров
              {selectedCategories.size > 0 && (
                <button
                  className={styles.resetBtn}
                  onClick={() => setSelectedCategories(new Set())}
                >
                  Сбросить фильтр ×
                </button>
              )}
            </div>

            <ProductGrid products={filtered} />
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Walmart Store</p>
      </footer>
    </div>
  );
}
