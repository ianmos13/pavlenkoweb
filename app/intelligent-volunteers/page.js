import IntelligentVolunteersHeader from "@/components/IntelligentVolunteers/IntelligentVolunteersHeader/IntelligentVolunteersHeader";
import AboutUsSlider from "@/components/Index/AboutUsSlider/AboutUsSlider";
import Сollaboration from "@/components/IntelligentVolunteers/Сollaboration/Сollaboration";
import FriendsOfSchoolSlider from "@/components/IntelligentVolunteers/FriendsOfSchoolSlider/FriendsOfSchoolSlider";

export default function page() {
  return (
    <>
      <IntelligentVolunteersHeader />
      <FriendsOfSchoolSlider />
      <Сollaboration />
      <AboutUsSlider />
    </>
  );
}
