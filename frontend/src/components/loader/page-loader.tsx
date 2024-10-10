import styles from "./loader.module.css";

export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <div className={styles.loaderWrapper}>
        <div className={styles.packman}></div>
        <div className={styles.dots}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
};
