import Banner from "@/components/Fundraising/Banner/Banner";
import FundraisingLibrary from "@/components/Fundraising/FundraisingLibrary/FundraisingLibrary";

const bannerData = {
  headerText: "Друзья хирургов",
  body: "объединяйтесь, чтобы поддержать Школу Павленко",
  buttonLink: "/fundraising/new",
  buttonText: "Создать сбор",
};

export default function Page() {
  return (
    <>
      <Banner data={bannerData} />
      <FundraisingLibrary />
    </>
  );
}
