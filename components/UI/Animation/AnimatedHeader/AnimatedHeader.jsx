'use client'

import styles from "./AnimatedHeader.module.scss";
import {motion} from 'framer-motion';

export default function AnimatedHeader({ children, reanimate }) {

    return (
        <motion.div
            key={reanimate}
            className={styles.container}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            variants={{
                hidden: { opacity: 0, y: -50 },
                visible: { opacity: 1, y: 0 },
            }}
        >
            {children}
        </motion.div>
    );
}
