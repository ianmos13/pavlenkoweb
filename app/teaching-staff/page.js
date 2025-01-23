import TeachingStaff from "@/components/TeachingStaff/TeachingStaff";
import Mentors from "@/components/TeachingStaff/Mentors/Mentors";
import TeachersSwiper from "@/components/TeachingStaff/TeachersSwiper/TeachersSwiper";
import HeaderText from "@/components/UI/HeaderText/HeaderText";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function page() {
  return (
    <>
      <HeaderText>Преподавательский состав</HeaderText>
      <TeachingStaff top={true}/>
      <AnimatedComponent>
        <TeachersSwiper />
      </AnimatedComponent>
      <AnimatedComponent>
        <Mentors />
      </AnimatedComponent>
    </>
  );
}
