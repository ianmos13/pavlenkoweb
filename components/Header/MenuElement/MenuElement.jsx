import Link from "next/link";
import styles from './MenuElement.module.scss'
import {useEffect, useState} from "react";

export default function MenuElement(props) {
    const { theme, element, isOpen, handleClickMenu } = props
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true)
    }, []);

    return (
        <div
            className={`${styles.container} ${styles[`${theme}Container`]}`}
            onClick={() => handleClickMenu(element.ref) }
        >
            {element.children ? (
                <>
                    <p className={styles.link} >
                        <span>{element.title}</span>
                        <svg className={`${styles.icon} ${isOpen ? styles.active : '' }`} />
                    </p>
                    {ready && (
                        <div className={`${styles.dropdownMenuWrapper} ${isOpen ? styles.active : '' }`}>
                            <ul className={`${styles.dropdownMenu} ${isOpen ? styles.active : '' }`}>
                                { element.children.map((child, idx) => (
                                    <li key={idx} className={styles.dropdownElement} >
                                        <Link
                                            href={child.link}
                                            className={styles.link}
                                        >
                                            <span>{child.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            ) : (
                <Link
                    className={styles.link}
                    href={element.link}
                >
                    <span>{element.title}</span>
                </Link>
            )}
        </div>
    )
}
