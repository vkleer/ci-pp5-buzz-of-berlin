import React from 'react';
import styles from '../styles/Avatar.module.css';

/**
 * Returns a span element with an image and text.
 * This component has been created with the Moments walkthrough.
 */
export const Avatar = ({ src, height = 45, text }) => {
    return (
        <span>
            <img className={styles.Avatar} src={src}
                height={height} width={height} alt='Avatar' 
            />
            {text}
        </span>
    )
}
