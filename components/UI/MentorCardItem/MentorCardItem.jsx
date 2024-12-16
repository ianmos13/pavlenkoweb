import Image from "next/image";
import styles from "./MentorCardItem.module.scss";

const MentorCardItem = ({ avatar, name, biography, location, specialty }) => {
  return (
    <div className={styles.mentorCard}>
      <div className={styles.imageWrapper}>
        <img
          src={avatar}
          alt={`${name}'s photo`}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.personData}>
          <div className={styles.name}>
            <h5>{name}</h5>
          </div>
          <div className={styles.biography}><p>{biography}</p></div>
        </div>
        <div className={styles.details}>
          <div className={styles.location}>
            <p>{location}</p>
          </div>
          <div className={styles.specialty}>
            <p> {specialty}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCardItem;
