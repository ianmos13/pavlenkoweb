import BannersSection from "@/components/Index/BannersSection/BannersSection";
import DonationComponentIndex from "@/components/Index/DonationComponentIndex/DonationComponentIndex";
import FAQ from "@/components/UI/FAQ/FAQ";
import ImageBox from "@/components/Index/ImageBox/ImageBox";
import InfoBlock from "@/components/Index/InfoBlock/InfoBlock";
import RQ from "@/components/Index/RQIndex/RQIndex";
import SchoolNewsSlider from "@/components/Index/SchoolNewsSlider/SchoolNewsSlider";
import AboutUsSlider from "@/components/Index/AboutUsSlider/AboutUsSlider";
import RunningLines from "@/components/UI/RunningLines/RunningLines";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";


export default function Home() {
  return (
    <>
      <BannersSection />
      <AnimatedComponent>
        <InfoBlock />
      </AnimatedComponent>
      <AnimatedComponent>
        <ImageBox />
      </AnimatedComponent>
      <AnimatedComponent>
        <RunningLines data={linesData} />
      </AnimatedComponent>
      <SchoolNewsSlider />
      <AnimatedComponent>
        <DonationComponentIndex />
      </AnimatedComponent>
      <AnimatedComponent>
        <AboutUsSlider />
      </AnimatedComponent>
      <AnimatedComponent>
        <FAQ />
      </AnimatedComponent>
      <AnimatedComponent>
        <RQ />
      </AnimatedComponent>
    </>
  );
}

const linesData = {
  firstLine: [
    "Работа с наставником",
    "Мультидисциплинарный подход",
    "Стипендия",
    "70% практики",
    "Стажировки и ротации",
    "Работа с наставником",
    "Мультидисциплинарный подход",
    "Стипендия",
    "70% практики",
    "Стажировки и ротации",
  ],
  secondLine: [
    "2 года обучения",
    "Работа с наставником",
    "Мультидисциплинарный подход",
    "Стипендия",
    "70% практики",
    "2 года обучения",
    "Работа с наставником",
    "Мультидисциплинарный подход",
    "Стипендия",
    "70% практики",
  ],
};
