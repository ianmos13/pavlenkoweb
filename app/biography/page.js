import ImageWithDescription from "@/components/UI/ImageWithDescription/ImageWithDescription";
import TextContainer from "@/components/Biography/TextContainer/TextContainer";
import QuoteCard from "@/components/Biography/QuoteCard/QuoteCard";
import CoverflowSwiper from "@/components/UI/CoverflowSwiper/CoverflowSwiper";
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";
import BiographyVideoComponent from "@/components/Biography/BiographyVideoComponent/BiographyVideoComponent";
import BiographyHeader from "@/components/Biography/BiographyHeader/BiographyHeader";

const text1 = `В 2018 году Андрей Николаевич заболел раком желудка и&nbsp;прошел путь пациента, поддерживая тысячи людей своим отношением к&nbsp;болезни и&nbsp;просветительской работой. Одной из&nbsp;главных его целей стало создание Школы для&nbsp;хирургов-онкологов, которая смогла&nbsp;бы в&nbsp;долгосрочной перспективе увеличить выживаемость пациентов.<br /><br />В&nbsp;январе 2020&nbsp;года Андрей Павленко ушел из&nbsp;жизни, но его&nbsp;проекты продолжают развитие. Для&nbsp;команды Школы очень важно сохранить и&nbsp;продолжить дело друга, наставника и&nbsp;учителя.`;
const quote1 = `Я хочу собрать под\u00A0этим зонтиком всех неравнодушных профессионалов, настоящих лидеров, которые научат новую генерацию хирургов, дадут новый стимул для\u00A0развития и\u00A0новую ментальность. Это\u00A0хирургия high-level — то, что\u00A0требует от\u00A0хирурга максимальных знаний и\u00A0технических умений.`;
const swiperData = [
    "/images/biography/slider-1.webp",
    "/images/biography/slider-2.webp",
    "/images/biography/slider-3.webp",
    "/images/biography/slider-1.webp",
    "/images/biography/slider-2.webp",
    "/images/biography/slider-3.webp"
]
const text2 = `Андрей Николаевич остается для&nbsp;нас примером мужества, силы и&nbsp;честности. Примером того, как&nbsp;нужно относиться к&nbsp;коллегам и&nbsp;пациентам, как&nbsp;важно стремиться к&nbsp;развитию и&nbsp;любить свою непростую, но&nbsp;такую нужную работу. Он старался передать свои знания и&nbsp;любовь к&nbsp;хирургии молодым коллегам. Важной задачей Школы, по&nbsp;мнению Андрея Павленко, было собрать лучший преподавательский состав.<br /><br />«В&nbsp;жизни очень важно встретить правильного человека, учителя, особенно важно это для&nbsp;хирурга. Настоящий учитель развеет твои сомнения и&nbsp;поможет в&nbsp;становлении. Плохой – лишь усилит твою неуверенность. Мне повезло», – Андрей Павленко мечтал, чтобы повезло встретить хороших учителей и&nbsp;другим молодым врачам, стремящимся найти свое место в&nbsp;медицине.`;
const videoCaption = `Это\u00A0видео смонтировал друг Андрея и\u00A0школы, хирург Илья Гоцадзе. В\u00A0видео использованы фрагменты фильма Таких дел "Жизнь человека".`;
const text3 = `Андрей Павленко видел проблему нехватки практики – главной в\u00A0хирургическом образовании. И\u00A0ее, по\u00A0его задумке, должна решить Школа. Для\u00A0этого в\u00A0основу программы школы заложено 70% практики в\u00A0операционной.`;
const quote2 = `Молодые доктора, которые приходят в\u00A0ординатуру по\u00A0онкологии или хирургии, не\u00A0получают практических навыков на\u00A0должном уровне. У\u00A0нас нет обязательного перечня вмешательств, которые должен освоить и\u00A0самостоятельно выполнить обучающийся. Поэтому на\u00A0выходе мы имеем хирургов-теоретиков.`;
const text4 = `Андрей Николаевич был одним из&nbsp;немногих, кто решился использовать свою ситуацию для&nbsp;изменения жизни пациентов, рассказывая от&nbsp;первого лица, что&nbsp;значит быть онкологическим больным с&nbsp;неблагоприятным прогнозом. Андрей Павленко определил три главных чувства пациентов: растерянность, страх, апатия. Он считал, что&nbsp;врачи должны помогать преодолеть&nbsp;их. Андрей Николаевич, как&nbsp;врач, до&nbsp;последнего поддерживал своих пациентов и не&nbsp;давал падать духом ни им&nbsp;самим, ни их&nbsp;близким.<br /><br />В&nbsp;школе Павленко, кроме хирургического опыта и&nbsp;медицинских знаний, резиденты получают важные коммуникативные навыки. Ведь настоящий врач – это не&nbsp;только холодный ум и&nbsp;твердая рука, но&nbsp;и чуткое сердце, желание помочь, спасти, защитить!`;

export default function page() {
  return (
    <>
      <BiographyHeader />
      <TextContainer text={text1} />
      <QuoteCard author={"Андрей Павленко"} text={quote1} />
      <AnimatedComponent>
        <CoverflowSwiper data={swiperData} />
      </AnimatedComponent>
      <TextContainer text={text2} />
      <BiographyVideoComponent
        videoCaption={videoCaption}
        preview={"images/Biography-video-preview.webp"}
      />
      <TextContainer text={text3} />
      <QuoteCard author={"Андрей Павленко"} text={quote2} />
      <TextContainer text={text4} />
      <AnimatedComponent>
        <ImageWithDescription
          imgPath={"/images/Biography-last.webp"}
          textOverlay={
            "В\u00A0школе Павленко кроме хирургического опыта и\u00A0медицинских знаний резиденты получают важные коммуникативные навыки. Ведь настоящий врач – это не\u00A0только холодный ум и\u00A0твердая рука, но\u00A0и\u00A0чуткое сердце, желание помочь, спасти, защитить!"
          }
          lastElement={true}
        />
      </AnimatedComponent>
    </>
  );
}
