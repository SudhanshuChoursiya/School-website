"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import Link from "next/link";
import Sidebar from "./Sidebar.js";
import { Menu } from "@mui/icons-material";
import { AuthContext } from "../context/authContext.js";
const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedin, loginUserInfo } = useContext(AuthContext);
  const hideSideBar = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    hideSideBar();
  }, [pathname]);

  const logedOutUser = async () => {
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${base_url}/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 200) {
      router.push("/login", { scroll: false });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.first_half}>
        <span
          className={styles.hambuger_container}
          onClick={() => setShowMenu(!showMenu)}
        >
          <Menu className={styles.hambuger_icon} />
        </span>
        <h2 className={styles.logo_title}>Adarsh Academy</h2>
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
          {isLoggedin && loginUserInfo.is_admin && (
            <Link href="/dashboard" className={styles.navlink}>
              <li className={styles.navlist}>dashboard</li>
            </Link>
          )}
        </ul>
        {!isLoggedin ? (
          <Link href="/login">
            <button className={styles.login_btn}>Login</button>
          </Link>
        ) : (
          <button className={styles.login_btn} onClick={logedOutUser}>
            Logout
          </button>
        )}
      </div>
      <Sidebar
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        userInfo={loginUserInfo}
        isLoggedin={isLoggedin}
      />
    </nav>
  );
};

export default Navbar;
