import styles from "./contact.module.css";
import { RoomOutlined, CallOutlined, EmailOutlined } from "@mui/icons-material";
const Contactpage = () => {
  return (
    <>
      <div className={styles.page_name_bar}>
        <h1 className={styles.page_title}>about us</h1>
      </div>
      <div className={styles.contact_details_wrapper}>
        <div className={styles.contact_details_container}>
          <div className={styles.contact_details}>
            <span className={styles.icon_container}>
              <RoomOutlined className={styles.icon} />
            </span>
            <h2>Adarsh School</h2>
            <h3>Adarsh Public School Kota,Sogaria.</h3>
          </div>

          <div className={styles.contact_details}>
            <span className={styles.icon_container}>
              <CallOutlined className={styles.icon} />
            </span>
            <h2>Phone</h2>
            <h3>Call us:- +91-141-2784045</h3>
          </div>

          <div className={styles.contact_details}>
            <span className={styles.icon_container}>
              <EmailOutlined className={styles.icon} />
            </span>
            <h2>Mail</h2>
            <h3>adarshachool@gmail.com</h3>
          </div>
        </div>

        <div className={styles.contact_form_container}>
          <h1>drop us a quick message</h1>

          <div className={styles.contact_form}>
            <div className={styles.inputs_container}>
              <input type="text" name="name" placeholder="Name *" />
              <input type="text" name="email" placeholder="Email *" />
              <input type="tel" name="mobileno" placeholder="Mobile *" />
            </div>

            <div className={styles.textarea_container}>
              <textarea name="msg" rows="8" cols="40" placeholder="Message" />
            </div>
          </div>
          <div className={styles.btn_container}>
            <button type="submit">submit</button>
          </div>
        </div>
      </div>
      <div className={styles.google_map_container}>
        <iframe
          src="https://maps.google.com/maps?q=Sogaria%20kota%20rajasthan&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
          frameborder="0"
          scrolling="no"
        className={styles.map}></iframe>
      </div>
    </>
  );
};

export default Contactpage;
