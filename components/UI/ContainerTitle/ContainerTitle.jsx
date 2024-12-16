'use client'

import { useRouter } from 'next/navigation'
import LearnMoreButton from "@/components/UI/Buttons/LearnMoreButton/LearnMoreButton";
import styles from './ContainerTitle.module.scss'

export default function ContainerTitle(props) {
    const { titleText, buttonTheme, buttonText, buttonUrl, children } = props
    const router = useRouter();

    const onSubmit = () => {
        router.push(buttonUrl)
    }

    return (
        <>
            <div className={styles.titleContainer}>
                <h2>{titleText}</h2>
                {buttonText && buttonUrl && (
                    <div className={styles.desktopButton}>
                        <LearnMoreButton
                            theme={buttonTheme}
                            text={buttonText}
                            onClick={onSubmit}
                        />
                    </div>
                )}
            </div>
            {children}
            {buttonText && buttonUrl && (
                <div className={styles.tabletButton}>
                    <LearnMoreButton
                        theme={buttonTheme}
                        text={buttonText}
                        onClick={onSubmit}
                    />
                </div>
            )}
        </>
    )
}
