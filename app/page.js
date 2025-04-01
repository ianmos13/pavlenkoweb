import BannersSection from "@/components/Index/BannersSection/BannersSection";
import DonationComponentIndex from "@/components/Index/DonationComponentIndex/DonationComponentIndex";
import FAQ from "@/components/UI/FAQ/FAQ";
import ImageBox from "@/components/Index/ImageBox/ImageBox";
import InfoBlock from "@/components/Index/InfoBlock/InfoBlock";
import RQ from "@/components/Index/RQIndex/RQIndex";
import SchoolNewsSlider from "@/components/Index/SchoolNewsSlider/SchoolNewsSlider";
import AboutUsSlider from "@/components/Index/AboutUsSlider/AboutUsSlider";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import RunningLinesIndex from "@/components/Index/RunningLinesIndex/RunningLinesIndex";

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
      <RunningLinesIndex />
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

