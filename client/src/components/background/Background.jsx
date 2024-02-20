import React, { useState, useEffect } from 'react';
import './Background.css';

export default function Background() {
    const [background, setBackground] = useState(null);
    const [count, setCount] = useState(1); // Cambiado para empezar desde 1

    useEffect(() => {
        const loadImages = async () => {
            const images = [];
            for (let i = 1; i <= 12; i++) {
                const img = new Image();
                img.src = `../src/images/background${i}.png`;
                images.push(img);
                await new Promise(resolve => img.onload = resolve);
            }
            return images;
        };

        const interval = setInterval(() => {
            setCount(prevCount => (prevCount % 12) + 1); // Ciclar de 1 a 12
        }, 2000);

        loadImages().then(images => {
            setBackground(images);
        });

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='app-background' style={{ backgroundImage: `url(${background ? background[count - 1].src : ''})` }}></div>
    );
}
