import TeachingStaff from "@/components/TeachingStaff/TeachingStaff";
import Mentors from "@/components/TeachingStaff/Mentors/Mentors";
import TeachersSwiper from "@/components/TeachingStaff/TeachersSwiper/TeachersSwiper";

export default function page() {
  return (
    <>
      <TeachingStaff top={true}/>
      <TeachersSwiper />
      <Mentors />
    </>
  );
}
