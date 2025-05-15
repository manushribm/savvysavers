import Image from "next/image";
import styles from "./page.module.css";
import './globals.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        {}
        <Image
          src="/piggy.png"
          alt="Piggy Bank"
          width={300}
          height={300}
          className={styles.pig}
        />

        {/* Button Grid */}
        <div className={styles.ctas}>
          <a href="#" className={styles.secondary}>
            EDIT<br/>FINANCIAL<br/>GOALS
          </a>
          <a href="#" className={styles.secondary}>
            DAILY<br/>SPENDING<br/>LIMIT: $
          </a>
          <a href="#" className={styles.secondary}>
            REMAINING<br/>AMOUNT: $
          </a>
          <a href="#" className={styles.secondary}>
            PERCENTAGE<br/>SPENT: %
          </a>
        </div>
      </div>

      <div className={styles.footer}>
        {}
      </div>
    </div>
  );
}