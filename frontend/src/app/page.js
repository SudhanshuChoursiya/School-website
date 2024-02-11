import styles from "./page.module.css";
import HeroSection from "../components/HeroSection.js";

import MainSection from "../components/MainSection.js";

import AlertToast from "../components/AlertToast.js";

export default function Home() {
  return (
    <>
      <AlertToast/>
      <HeroSection />
      <MainSection />
    </>
  );
}
