'use client'

import styles from "./AnimatedComponent.module.scss";
import {motion} from 'framer-motion';

export default function AnimatedComponent({ children, reanimate }) {
    return (
        <motion.div
            key={reanimate}
            className={styles.container}
            initial={{ opacity: 0, y: 300 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
}
