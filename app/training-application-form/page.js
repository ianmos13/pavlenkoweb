import TrainingApplicationForm from "@/components/TrainingApplication/TrainingApplicationForm/TrainingApplicationForm";
import TrainingApplicationHeader from "@/components/TrainingApplication/TrainingApplicationHeader/TrainingApplicationHeader";
import FAQ from "@/components/UI/FAQ/FAQ";
export default function page() {
  return (
    <>
	    <TrainingApplicationHeader />
      <TrainingApplicationForm />
	    <FAQ />
    </>
  );
}
