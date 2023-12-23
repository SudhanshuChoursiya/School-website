import styles from "./admission.module.css";
import Link from "next/link";
const AdmissionEnquiry = () => {
  return (
    <>
      <div className={styles.page_name_bar}>
        <h1 className={styles.page_title}>Admission</h1>
      </div>

      <div className={styles.section_wrapper}>
        <div className={styles.content}>
          <div className={styles.first_half}>
            <img
              className={styles.content_img}
              src="/home_school_bg.jpg"
              alt="img"
            />
          </div>
          <div className={styles.second_half}>
            <span className={styles.heading}>Admission open for</span>
            <span className={styles.sub_heading}>Session 2023-24</span>
            <span className={styles.paragraph}>
              Class - Nursery to 9th and 11th
            </span>
            <div className={styles.btn_container}>
              <Link href="/contact" className={styles.enquire_now}>
                <button className={styles.enquire_now_btn}> enquire now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section_wrapper}>
        <div className={styles.content}>
          <div className={styles.first_half}>
            <img
              className={styles.content_img}
              src="/home_school_bg.jpg"
              alt="img"
            />
          </div>
          <div className={styles.second_half}>
            <span className={styles.heading}>Eligibility</span>
            <span className={styles.sub_heading}>Session 2023-24</span>
            <span className={styles.paragraph}>
              The child should be minimum 2.5 years to be eligible for admission
              to Nursery.
            </span>
            <div className={styles.btn_container}>
              <Link href="/contact" className={styles.enquire_now}>
                <button className={styles.enquire_now_btn}> enquire now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmissionEnquiry;
