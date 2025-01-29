import IntelligentVolunteersHeader from "@/components/IntelligentVolunteers/IntelligentVolunteersHeader/IntelligentVolunteersHeader";
import AboutUsSlider from "@/components/Index/AboutUsSlider/AboutUsSlider";
import Сollaboration from "@/components/IntelligentVolunteers/Сollaboration/Сollaboration";
import FriendsOfSchoolSlider from "@/components/IntelligentVolunteers/FriendsOfSchoolSlider/FriendsOfSchoolSlider";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function page() {
  return (
    <>
      <IntelligentVolunteersHeader />
      <FriendsOfSchoolSlider />
      <AnimatedComponent>
        <Сollaboration />
      </AnimatedComponent>
      <AboutUsSlider />
    </>
  );
}
