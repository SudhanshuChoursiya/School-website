import styles from "./mainSection.module.css";
import Link from "next/link";
const MainSection = () => {
  return (
    <div className={styles.section_wrapper}>
      <div className={styles.textual_container}>
        <div className={styles.first_content}>
          <div className={styles.first_half}>
            <img
              className={styles.content_img}
              src="/home_school_bg.jpg"
              alt="img"
            />
          </div>
          <div className={styles.second_half}>
            <h1 className={styles.heading}>welcome to adarsh school</h1>
            <p className={styles.paragraph}>
              Adarsh public School gives its students an extraordinary
              education, anchored in timeless values. We empower children to
              develop into citizens who live lives of purpose and distinction.
            </p>
            <div className={styles.btn_container}>
              <Link href="/about" className={styles.read_more}>
                <button className={styles.read_more_btn}> read more </button>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.second_content}>
          <div className={styles.first_half}>
            <img
              className={styles.content_img}
              src="/home_school_bg.jpg"
              alt="img"
            />
          </div>

          <div className={styles.second_half}>
            <h1 className={styles.heading}>academics</h1>
            <p className={styles.paragraph}>
              We empower children to reach their true potential and being their
              journey to success early in life by enriching their lives with
              personal and academic experience personal and academic
              experience..
            </p>
            <div className={styles.btn_container}>
              <Link href="/about" className={styles.read_more}>
                <button className={styles.read_more_btn}> read more </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.facilities_section}>
        <div className={styles.section_heading_container}>
          <h1 className={styles.section_heading}>Facilities</h1>
        </div>
        <div className={styles.facilities_wrapper}>
          <div className={`${styles.facilities_container} ${styles.bg_orange} `}>
            <div className={styles.facilities_img_container}>
              <img
                className={styles.facility_img}
                src="/school-bus.svg"
                alt="img"
              />
            </div>

            <h1 className={styles.facility_title}>Digital classes</h1>
            <p className={styles.facility_description}>
              Technology enabled classroom where student learn the concept
              through audio visuls aids.
            </p>
          </div>
          <div className={`${styles.facilities_container} ${styles.bg_yellow} `}>
            <div className={styles.facilities_img_container}>
              <img
                className={styles.facility_img}
                src="/school-bus.svg"
                alt="img"
              />
            </div>

            <h1 className={styles.facility_title}>Digital classes</h1>
            <p className={styles.facility_description}>
              Technology enabled classroom where student learn the concept
              through audio visuls aids.
            </p>
          </div>
          <div className={`${styles.facilities_container} ${styles.bg_blue} `}>
            <div className={styles.facilities_img_container}>
              <img
                className={styles.facility_img}
                src="/school-bus.svg"
                alt="img"
              />
            </div>

            <h1 className={styles.facility_title}>Digital classes</h1>
            <p className={styles.facility_description}>
              Technology enabled classroom where student learn the concept
              through audio visuls aids.
            </p>
          </div>
          <div className={`${styles.facilities_container} ${styles.bg_green} `}>
            <div className={styles.facilities_img_container}>
              <img
                className={styles.facility_img}
                src="/school-bus.svg"
                alt="img"
              />
            </div>

            <h1 className={styles.facility_title}>Digital classes</h1>
            <p className={styles.facility_description}>
              Technology enabled classroom where student learn the concept
              through audio visuls aids.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
