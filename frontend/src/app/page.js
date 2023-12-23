import styles from "./page.module.css";
import HeroSection from "../components/HeroSection.js";

import MainSection from "../components/MainSection.js";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MainSection />
    </>
  );
}
