import useFetch from "@/services/hook/useFetch";

const useFetchProducts = () => {
  const {
    data: productsData,
    loading,
    error,
  } = useFetch("/products?populate=*");

  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const formattedProducts = productsData
    ? productsData.map((product) => ({
        id: product.id,
        title: product.title || "Без названия",
        img: product.image_for_card?.url
          ? `${API_URL}${product.image_for_card.url}`
          : "/images/market/prepear-photo.svg",
        price: product.price ? `${product.price} ₽` : "Цена не указана",
        discontPrice: product.discontPrice ? `${product.discontPrice} ₽` : null,
        description: product.description || "Нет описания",
        link: product.link,
        article: product.article,
        wb_url: product.wb_url,
        ozon_url: product.ozon_url,
        createdAt: product.createdAt,
     
        galleryImages: product.images_for_galery
          ? product.images_for_galery.map((img) => ({
              id: img.id,
              url: `${API_URL}${img.url}`,
              name: img.name,
              width: img.width,
              height: img.height,
            }))
          : [],
      }))
    : [];

  return { products: formattedProducts, loading, error };
};

export default useFetchProducts;
