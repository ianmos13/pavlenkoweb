import styles from './Banner.module.scss'
import ButtonBox from "@/components/UI/Buttons/ButtonBox/ButtonBox";
import LearnMoreButton from "@/components/UI/Buttons/LearnMoreButton/LearnMoreButton";
import {useRouter} from "next/navigation";

export default function Banner(props) {
    const { data, size } = props
    const router = useRouter();
    const goToPage = () => {
        router.push(data.buttonLink);
    };

    return (
        <div className={`${styles.container} ${styles[`${data.background}Container`]} ${styles[`${size}Container`]}`}>
            <div className={styles.infoContainer}>
                <div className={styles.titleContainer}>
                    { size==='large' ? (
                        <h1> <TitleBody data={data} /> </h1>
                    ) : (
                        <h2> <TitleBody data={data} /> </h2>
                    )}
                </div>
                <div className={styles.description}>
                    <h4>{data.body}</h4>
                </div>
                <ButtonBox className={styles.button}>
                    <LearnMoreButton
                        onClick={goToPage}
                        text={data.buttonText}
                        theme={'red'}
                    />
                </ButtonBox>
            </div>
            <div className={styles.imageContainer}>
                <img src={data.image} alt="" ></img>
            </div>
        </div>
    )
}

const TitleBody = ({data}) => {
    return (
        <>
            { data.headerData.map((header, idx) => (
                <span
                    key={idx}
                    className={`${header.className} ${styles[header.className]}`}
                >
                    {header.text}
                </span>
            ))}
        </>
    )
}
