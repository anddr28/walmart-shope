import { useState } from "react";
import styles from "./ProductCard.module.css";

export function ProductCard({ product }) {
  const [added, setAdded] = useState(false);

  const {
    title,
    name,
    description,
    desc,
    category,
    price,
    image,
    img,
    thumbnail,
  } = product;

  const productTitle = title || name || "Без названия";
  const productDesc = description || desc || "";
  const productImage = image || img || thumbnail || "";
  const productPrice =
    typeof price === "number" ? price.toFixed(2) : Number(price).toFixed(2);

  const handleBuy = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        {productImage ? (
          <img
            src={productImage}
            alt={productTitle}
            className={styles.img}
            loading="lazy"
          />
        ) : (
          <div className={styles.imgFallback}>Нет фото</div>
        )}
      </div>

      <div className={styles.body}>
        {category && <span className={styles.category}>{category}</span>}
        <h3 className={styles.title}>{productTitle}</h3>
        {productDesc && <p className={styles.desc}>{productDesc}</p>}

        <div className={styles.footer}>
          <span className={styles.price}>${productPrice}</span>
          <button
            className={`${styles.btnBuy} ${added ? styles.added : ""}`}
            onClick={handleBuy}
          >
            {added ? "✓ Добавлено" : "Купить"}
          </button>
        </div>
      </div>
    </div>
  );
}
