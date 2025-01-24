import TeachingStaff from "@/components/TeachingStaff/TeachingStaff";
import Mentors from "@/components/TeachingStaff/Mentors/Mentors";
import TeachersSwiper from "@/components/TeachingStaff/TeachersSwiper/TeachersSwiper";
import HeaderText from "@/components/UI/HeaderText/HeaderText";

export default function page() {
  return (
    <>
      <HeaderText>Преподавательский состав</HeaderText>
      <TeachingStaff top={true}/>
      <TeachersSwiper />
      <Mentors />
    </>
  );
}
