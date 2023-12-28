"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import Link from "next/link";
import Sidebar from "./Sidebar.js";
import { Menu } from "@mui/icons-material";
const Navbar = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const hideSideBar = () => {
    setShowMenu(false);
  };
  
  useEffect(() => {
    hideSideBar();
  }, [pathname]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.first_half}>
        <span
          className={styles.hambuger_container}
          onClick={() => setShowMenu(!showMenu)}
        >
          <Menu className={styles.hambuger_icon} />
        </span>
        <h2 className={styles.logo_title}>Adarsh public school</h2>
      </div>

      <div className={styles.second_half}>
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
          <Link href="/admission" className={styles.navlink}>
            <li className={styles.navlist}>admission</li>
          </Link>
        </ul>
        <Link href="/login">
          <button className={styles.login_btn}>Login</button>
        </Link>
      </div>
      <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
    </nav>
  );
};

export default Navbar;
