import RunningLine from '@/components/UI/RunningLines/RunningLine/RunningLine'
import styles from './RunningLines.module.scss'
import AnimatedComponent from "@/components/UI/Animation/AnimatedComponent/AnimatedComponent";

export default function RunningLines({ data, headerData, isImages }) {
	return (
		<AnimatedComponent>
			<section
				className={`${styles.runningLines} ${
					isImages ? styles.imageRunningLines : ""
				}`}
			>
				{headerData && (
					<div className={`${styles.header} container`}>
						<h2>{headerData}</h2>
					</div>
				)}
				<div className={styles.lines}>
					{data.firstLine && (
						<RunningLine data={data.firstLine} isImages={isImages} />
					)}
					{data.secondLine && (
						<RunningLine
							data={data.secondLine}
							isImages={isImages}
							reverse={true}
						/>
					)}
				</div>
			</section>
		</AnimatedComponent>
	);
}

