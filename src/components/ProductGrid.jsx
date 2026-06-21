import { ProductCard } from "./ProductCard";
import styles from "./ProductGrid.module.css";

export function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Товары не найдены</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product, index) => (
        <ProductCard key={product._id || product.id || index} product={product} />
      ))}
    </div>
  );
}
