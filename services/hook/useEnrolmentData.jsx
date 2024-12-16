
import useFetch from "@/services/hook/useFetch";

const useEnrolmentData = () => {
  const { data, loading, error } = useFetch(`/enrolment-datas?populate=*`);
  return { enrolmentDatas: data, loading, error };
};

export default useEnrolmentData;
