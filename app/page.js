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
      <AnimatedComponent>
        <SchoolNewsSlider />
      </AnimatedComponent>
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

const bannersData = [
  {
    id: 0,
    background: "dark",
    headerData: [
      {
        id: 0,
        text: "Старт",
        className: "default",
      },
      {
        id: 1,
        text: "набора",
        className: "secondary",
      },
      {
        id: 2,
        text: "на Колопроктологию",
        className: "default",
      },
    ],
    image: "/images/banners/banner-0.png",
    body: "В феврале проходит набор на специализацию Колопроктология. Подайте заявку уже сейчас, чтобы начать обучение в октябре 2024",
    buttonText: "Подать заявку",
    buttonLink: "/contacts",
  },
  {
    id: 1,
    background: "dark",
    headerData: [
      {
        id: 0,
        text: "Какую",
        className: "default",
      },
      {
        id: 1,
        text: "проблему",
        className: "secondary",
      },
      {
        id: 2,
        text: "решает Школа Павленко",
        className: "default",
      },
    ],
    image: "/images/banners/banner-1.png",
    body: "Проект помогает восполнить нехватку онкохирургов и повысить выживаемость пациентов с диагнозом рак в России",
    buttonText: "Узнать подробнее",
    buttonLink: "/contacts",
  },
  {
    id: 2,
    background: "dark",
    headerData: [
      {
        id: 0,
        text: "Беговая",
        className: "default",
      },
      {
        id: 1,
        text: "экскурсия",
        className: "secondary",
      },
      {
        id: 2,
        text: "с хирургами",
        className: "default",
      },
    ],
    image: "/images/banners/banner-2.png",
    body: "Присоединяйтесь на первую пробежку друзей Школы Павленко!",
    buttonText: "Узнать подробнее",
    buttonLink: "/contacts",
  },
  {
    id: 3,
    background: "dark",
    headerData: [
      {
        id: 0,
        text: "Какую",
        className: "default",
      },
      {
        id: 1,
        text: "проблему",
        className: "secondary",
      },
      {
        id: 2,
        text: "решает Школа Павленко",
        className: "default",
      },
    ],
    image: "/images/banners/banner-1.png",
    body: "Проект помогает восполнить нехватку онкохирургов и повысить выживаемость пациентов с диагнозом рак в России",
    buttonText: "Узнать подробнее",
    buttonLink: "/contacts",
  },
];
