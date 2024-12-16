import ImageWithDescription from "@/components/UI/ImageWithDescription/ImageWithDescription";
import TextContainer from "@/components/Biography/TextContainer/TextContainer";
import QuoteCard from "@/components/Biography/QuoteCard/QuoteCard";
import CoverflowSwiper from "@/components/UI/CoverflowSwiper/CoverflowSwiper";
import HeaderText from "@/components/UI/HeaderText/HeaderText";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import BiographyVideoComponent from "@/components/Biography/BiographyVideoComponent/BiographyVideoComponent";
const text1 = `В 2018 году Андрей Николаевич заболел раком желудка и прошел путь пациента, поддерживая тысячи людей своим отношением к болезни и просветительской работой. Одной из главных его целей стало создание Школы для хирургов-онкологов, которая смогла бы в долгосрочной перспективе увеличить выживаемость пациентов.<br /><br />В январе 2020 года Андрей Павленко ушел из жизни, но его проекты продолжают развитие. Для команды Школы очень важно сохранить и продолжить дело друга, наставника и учителя.`;

const quote1 = `Я хочу собрать под этим зонтиком всех неравнодушных профессионалов, настоящих лидеров, которые научат новую генерацию хирургов, дадут новый стимул для развития и новую ментальность. Это хирургия high-level — то, что требует от хирурга максимальных знаний и технических умений.`;

const swiperData = [
    "/images/biography/slider-1.png",
    "/images/biography/slider-2.png",
    "/images/biography/slider-3.png",
    "/images/biography/slider-1.png",
    "/images/biography/slider-2.png",
    "/images/biography/slider-3.png"
]

const text2 = `Андрей Николаевич остается для нас примером мужества, силы и честности. Примером того, как нужно относиться к коллегам и пациентам, как важно стремиться к развитию и любить свою непростую, но такую нужную работу. Он старался передать свои знания и любовь к хирургии молодым коллегам. Важной задачей Школы, по мнению Андрея Павленко, было собрать лучший преподавательский состав.<br /><br />«В жизни очень важно встретить правильного человека, учителя, особенно важно это для хирурга. Настоящий учитель развеет твои сомнения и поможет в становлении. Плохой – лишь усилит твою неуверенность. Мне повезло», – Андрей Павленко мечтал, чтобы повезло встретить хороших учителей и другим молодым врачам, стремящимся найти свое место в медицине.`;

const videoCaption = `Это видео смонтировал друг Андрея и школы, хирург Илья Гоцадзе. В видео использованы фрагменты фильма Таких дел "Жизнь человека".`;

const text3 = `Андрей Павленко видел проблему нехватки практики – главной в хирургическом образовании. И ее, по его задумке, должна решить Школа. Для этого в основу программы школы заложено 70% практики в операционной.`;

const quote2 = `Молодые доктора, которые приходят в ординатуру по онкологии или хирургии, не получают практических навыков на должном уровне. У нас нет обязательного перечня вмешательств, которые должен освоить и самостоятельно выполнить обучающийся. Поэтому на выходе мы имеем хирургов-теоретиков.`;

const text4 = `Андрей Николаевич был одним из немногих, кто решился использовать свою ситуацию для изменения жизни пациентов, рассказывая от первого лица, что значит быть онкологическим больным с неблагоприятным прогнозом. Андрей Павленко определил три главных чувства пациентов: растерянность, страх, апатия. Он считал, что врачи должны помогать преодолеть их. Андрей Николаевич, как врач, до последнего поддерживал своих пациентов и не давал падать духом ни им самим, ни их близким.<br /><br />В школе Павленко, кроме хирургического опыта и медицинских знаний, резиденты получают важные коммуникативные навыки. Ведь настоящий врач – это не только холодный ум и твердая рука, но и чуткое сердце, желание помочь, спасти, защитить!`;

export default function page() {
  return (
    <>
      <HeaderText>Андрей Николаевич Павленко</HeaderText>
      <AnimatedComponent>
        <ImageWithDescription
            imgPath={"/images/Biography-main.svg"}
            textOverlay={
              " 24 июня Школа Павленко и Городская клиническая онкологическая больница №1 провелинаучно-практическую конференцию «Осложнения в хирургии малого таза» из цикла «Будущее онкологии», приуроченную к выпуску первых резидентов образовательного проекта."
            }
          />
      </AnimatedComponent>
      <AnimatedComponent>
        <TextContainer text={text1} />
      </AnimatedComponent>
      <AnimatedComponent>
        <QuoteCard author={"Андрей Павленко"} text={quote1} />
      </AnimatedComponent>
      <AnimatedComponent>
        <CoverflowSwiper data={swiperData} />
      </AnimatedComponent>
      <AnimatedComponent>
        <TextContainer text={text2} />
      </AnimatedComponent>
      <AnimatedComponent>
        <BiographyVideoComponent
          videoCaption={videoCaption}
          videoPath={"https://rutube.ru/video/e0d0e89c2daea0a3db298172a63a8f8a/?r=plwd"}
          preview={"images/Biography-video-preview.svg"}
        />
      </AnimatedComponent>
      <AnimatedComponent>
        <TextContainer text={text3} />
      </AnimatedComponent>
      <AnimatedComponent>
        <QuoteCard author={"Андрей Павленко"} text={quote2} />
      </AnimatedComponent>
      <AnimatedComponent>
        <TextContainer text={text4} />
      </AnimatedComponent>
      <AnimatedComponent>
        <ImageWithDescription
          imgPath={"/images/Biography-last.svg"}
          textOverlay={
            "В школе Павленко кроме хирургического опыта и медицинских знаний резиденты получают важные коммуникативные навыки. Ведь настоящий врач – это не только холодный ум и твердая рука, но и чуткое сердце, желание помочь, спасти, защитить!"
          }
        />
      </AnimatedComponent>
    </>
  );
}
