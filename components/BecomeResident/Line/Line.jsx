"use client";
import RunningLine from '@/components/UI/RunningLines/RunningLine/RunningLine'
import styles from './Line.module.scss'
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";

export default function Line() {
	const { data, loading, error } = useFetch("/running-line-become-resident");

	if (loading) return <Loader />;
	if (error) return <div>Error: {error}</div>;

	
	return (
		<div className={styles.lineContainer}>
			 {data?.data && <RunningLine data={data.data} />}
		</div>
	)
}
