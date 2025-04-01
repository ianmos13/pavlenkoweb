"use client";

import React from "react";
import RunningLines from "@/components/UI/RunningLines/RunningLines";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";

const RunningLinesIndex = () => {
  const { data: linesData, loading, error } = useFetch("/running-line-index");

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;


  if (!linesData?.linesData) {
    return null;
  }

  return <RunningLines data={linesData.linesData} />;
};

export default RunningLinesIndex;
