import Header from "@/components/SpecializationAndProgram/Header/Header";
import Programs from "@/components/SpecializationAndProgram/Programs/Programs";
import EducationApplication from "@/components/UI/EducationApplication/EducationApplication";
import SliderWithPopup from "@/components/UI/SliderWithPopup/SliderWithPopup";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function page() {
  return (
    <>
      <Header />
      <Programs />
      <AnimatedComponent>
        <SliderWithPopup />
      </AnimatedComponent>
      <AnimatedComponent>
        <EducationApplication />
      </AnimatedComponent>
    </>
  );
}
