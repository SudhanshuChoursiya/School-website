import styles from "./heroSection.module.css";
import Link from "next/link";
const HeroSection = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bg_image_container}>
        <img
          className={styles.bg_image}
          src="/home_school_bg.jpg"
          alt="bg_img"
        />
      </div>

      <div className={styles.text_content}>
        <h4 className={styles.mini_heading}>welcome to our site</h4>
        <h2 className={styles.heading}>adarsh academy</h2>
        <p className={styles.paragraph}>Welcome to Adarsh academy,our moto is to provide good education to the children.</p>
        <Link href="/about" className={styles.learn_more_btn}>
           learn more
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
