"use client";
import { useParams } from "next/navigation";
import SingleMarketPage from "@/components/Market/SingleMarketPage/SingleMarketPage";
import useFetchProducts from "@/services/hook/useFetchProducts";
import Loader from "@/components/UI/Loader/Loader";

export default function Page() {
  const { id } = useParams();

  const { products, loading, error } = useFetchProducts();

  const productData = products.find((product) => product.link === id);
  console.log(productData);
  if (loading) return <Loader loading={loading} />;
  if (error) return <div>Произошла ошибка при загрузке данных.</div>;
  if (!productData) return <div>Продукт не найден.</div>;

  return (
    <>
      <SingleMarketPage
        title={productData.title}
        article={productData.article}
        price={productData.price}
        discontPrice={productData.discontPrice}
        description={productData.description}
        images={productData.galleryImages.map((img) => img.url)}
        wbUrl={productData.wb_url}
        ozonUrl={productData.ozon_url}
      />
    </>
  );
}
