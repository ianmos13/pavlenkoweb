
import useFetch from "@/services/hook/useFetch";

const useEnrolmentData = () => {
  const { data, loading, error } = useFetch(`/enrolment-datas?sort=rank:asc&populate=*&pagination[pageSize]=9999999`);
  return { enrolmentDatas: data, loading, error };
};

export default useEnrolmentData;
