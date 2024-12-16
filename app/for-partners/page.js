import Donation from "@/components/ForPartners/Donation/Donation";
import Header from "@/components/ForPartners/Header/Header";
import Partnership from "@/components/ForPartners/Partnership/Partnership";
import FAQ from "@/components/UI/FAQ/FAQ";
import RunningLines from "@/components/UI/RunningLines/RunningLines";

export default function page() {
  return (
    <>
      <Header />
      <Partnership />
      <RunningLines data={linesData} isImages={true} />
      <Donation />
      <FAQ />
    </>
  );
}

const linesData = {
  firstLine: [
    "/images/Logos/Logo_VrachiRF.svg",
    "/images/Logos/Logo_pdupd.svg",
    "/images/Logos/Logo_amgen.svg",
    "/images/Logos/Logo_bowa.svg",
    "/images/Logos/Logo_Medach_gray.svg",
    "/images/Logos/Logo_davinci.svg",
    "/images/Logos/Logo_engine.svg",
    "/images/Logos/Logo_erbe.svg",
    "/images/Logos/Logo_ethicon.svg",
    "/images/Logos/Logo_ethicon2.svg",
  ],
};
