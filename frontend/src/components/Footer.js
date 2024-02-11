import styles from "./footer.module.css";
import Link from "next/link";
import { RoomOutlined, CallOutlined, EmailOutlined } from "@mui/icons-material";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contact_list_container}>
        <div className={styles.contact_list_item}>
          <span>
            <RoomOutlined className={styles.contact_list_icon} />
          </span>
          <span>Adarsh Academy Kota,Sogaria.</span>
        </div>
        <div className={styles.contact_list_item}>
          <span>
            <CallOutlined className={styles.contact_list_icon} />
          </span>
          <span>Call us:- +91-141-2784045</span>
        </div>
        <div className={styles.contact_list_item}>
          <span>
            <EmailOutlined className={styles.contact_list_icon} />
          </span>
          <span>adarshacademy@gmail.com</span>
        </div>
      </div>

      <ul className={styles.navlist_container}>
        <Link href="/" className={styles.navlink}>
          <li className={styles.navlist}>home</li>
        </Link>
        <Link href="/about" className={styles.navlink}>
          <li className={styles.navlist}>about</li>
        </Link>
        <Link href="/contact" className={styles.navlink}>
          <li className={styles.navlist}>contact</li>
        </Link>
        <Link href="/" className={styles.navlink}>
          <li className={styles.navlist}>gallery</li>
        </Link>
        <Link href="/admission" className={styles.navlink}>
          <li className={styles.navlist}>admission</li>
        </Link>
      </ul>

      <div className={styles.copyright_container}>
        <p>copyright &copy; 2024 adarsh academy kota , all rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
