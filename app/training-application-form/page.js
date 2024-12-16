import TrainingApplicationForm from "@/components/TrainingApplication/TrainingApplicationForm/TrainingApplicationForm";
import TrainingApplicationHeader from "@/components/TrainingApplication/TrainingApplicationHeader/TrainingApplicationHeader";
import FAQ from "@/components/UI/FAQ/FAQ";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
export default function page() {
  return (
    <>
	  <TrainingApplicationHeader />
      <AnimatedComponent>
        <TrainingApplicationForm />
      </AnimatedComponent>
      <AnimatedComponent>
	    <FAQ />
      </AnimatedComponent>
    </>
  );
}
