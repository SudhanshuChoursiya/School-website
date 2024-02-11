import styles from "./about.module.css";
import { RemoveRedEye, Flare, StarOutlined } from "@mui/icons-material";
const AboutPage = () => {
  return (
    <>
      <div className={styles.page_name_bar}>
        <h1 className={styles.page_title}>about us</h1>
      </div>

      <div className={styles.vision_mission_container}>
        <div className={styles.vision_mission}>
          <span className={styles.icon_container}>
            <RemoveRedEye className={styles.icon} />
          </span>
          <h2>vision</h2>
          <p>
            We emphasize on providing value-based education and develop in each
            student discipline, leadership and self-reliance. It is our deep
            conviction that education needs to be a joyful experience that
            facilitates the growth and transformation of young minds at their
            impressionable age and fortifies them with Knowledge and skills to
            face the competitive world.
          </p>
        </div>
        <div className={styles.vision_mission}>
          <span className={styles.icon_container}>
            <Flare className={styles.icon} />
          </span>
          <h2>mission</h2>
          <p>
            Our commitment is to deliver superior education in a loving
            environment enabling students to build happy and successful lives.
            We aim to empower our students to be compassionate, responsive to
            our glorious culture and heritage, academically excelling, holistic
            individuals who can usher their responsibilities as the global
            citizens.
          </p>
        </div>
        <div className={styles.vision_mission}>
          <span className={styles.icon_container}>
            <StarOutlined className={styles.icon} />
          </span>
          <h2>core value</h2>
          <p>
            We stress on instilling a strong value system in each student. This
            helps them grow into individuals of excellent character who make
            valuable contribution to the society. Modern School is making a
            sincere attempt to introduce a multifarious, holistic, educational
            Milieu that harmonizes technological advancements and humanistic
            wisdom with a special focus on ‘Human Engineering’
          </p>
        </div>
      </div>

      <div className={styles.textual_container}>
        <div className={styles.content}>
          <div className={styles.first_half}>
            <img
              className={styles.content_img}
              src="/book_background.jpg"
              alt="img"
            />
          </div>
          <div className={styles.second_half}>
            <div className={styles.quote_container}>
              <h1 className={styles.heading}>
                "Good teachers know the best in students."
              </h1>
            </div>
            <p className={styles.paragraph}>
              The qualified and experienced faculty at Modern School offers
              unconditional love, care and support which transforms a child into
              a vibrant and lively individual. Our teachers nurture caring and
              compassionate human beings with an optimistic attitude towards
              life.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
