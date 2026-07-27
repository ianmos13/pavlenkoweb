
import useFetch from "@/services/hook/useFetch";
import { PAGE_SIZE } from "@/lib/pagination";

const useEnrolmentData = () => {
  const { data, loading, error } = useFetch(`/enrolment-datas?sort=rank:asc&populate=*&pagination[pageSize]=${PAGE_SIZE}`);
  return { enrolmentDatas: data, loading, error };
};

export default useEnrolmentData;
