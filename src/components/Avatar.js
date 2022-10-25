import React from 'react';
import styles from '../styles/Avatar.module.css';

export const Avatar = ({ src, height = 45, text }) => {
    /**
     * Returns a span element with an image and text.
     * This component has been created with the Moments walkthrough.
     */
    return (
        <span>
            <img className={styles.Avatar} src={src}
                height={height} width={height} alt='Avatar' 
            />
            {text}
        </span>
    )
}
