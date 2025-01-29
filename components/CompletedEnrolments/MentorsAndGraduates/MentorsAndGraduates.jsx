import MentorCardItem from "@/components/UI/MentorCardItem/MentorCardItem";
import styles from './MentorsAndGraduates.module.scss'
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
const MentorsAndGraduates = ({people}) => {
  return (
    <>
     <AnimatedComponent>
     <section className={styles.block}>
        <div>
          <h2>Наставники и их выпускники</h2>
        </div>
        <div className={styles.gridContainer}>
          {people.map((person) => (
            <MentorCardItem
              key={person.id}
              name={person.name}
              specialty={person.position}
              biography={person.biography}
              avatar={person.avatar}
              photo={person.photo}
              location={person.city}
            />
          ))}
        </div>
      </section>
     </AnimatedComponent>
    </>
  );
};
export default MentorsAndGraduates;
