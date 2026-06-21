import styles from "./CategoryFilter.module.css";

export function CategoryFilter({ categories, selected, onChange }) {
  const allSelected = selected.size === 0;

  const toggle = (cat) => {
    const next = new Set(selected);
    if (next.has(cat)) {
      next.delete(cat);
    } else {
      next.add(cat);
    }
    onChange(next);
  };

  const clearAll = () => onChange(new Set());

  return (
    <div className={styles.filterBar}>
      <span className={styles.label}>Категория:</span>
      <div className={styles.chips}>
        <label className={`${styles.chip} ${allSelected ? styles.active : ""}`}>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={clearAll}
            className={styles.hidden}
          />
          Все
        </label>
        {categories.map((cat) => (
          <label
            key={cat}
            className={`${styles.chip} ${selected.has(cat) ? styles.active : ""}`}
          >
            <input
              type="checkbox"
              checked={selected.has(cat)}
              onChange={() => toggle(cat)}
              className={styles.hidden}
            />
            {cat}
          </label>
        ))}
      </div>
    </div>
  );
}
