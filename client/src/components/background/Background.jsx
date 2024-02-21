import React, { useState, useEffect } from 'react';
import './Background.css';

// Importar las imágenes de fondo directamente
import background0 from '../../images/background0.png';
import background1 from '../../images/background1.png';
import background2 from '../../images/background2.png';
import background3 from '../../images/background3.png';
import background4 from '../../images/background4.png';
import background5 from '../../images/background5.png';
import background6 from '../../images/background6.png';
import background7 from '../../images/background7.png';
import background8 from '../../images/background8.png';
import background9 from '../../images/background9.png';
import background10 from '../../images/background10.png';
import background11 from '../../images/background11.png';
import background12 from '../../images/background12.png';

const backgrounds = [
    background0,
    background1,
    background2,
    background3,
    background4,
    background5,
    background6,
    background7,
    background8,
    background9,
    background10,
    background11,
    background12
];

export default function Background() {
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState([]);

    useEffect(() => {
        const loadImages = async () => {
            const images = [];
            for (let i = 0; i < backgrounds.length; i++) {
                const img = new Image();
                img.src = backgrounds[i];
                images.push(img);
                await new Promise(resolve => img.onload = resolve);
            }
            return images;
        };

        loadImages().then(images => {
            setLoadedImages(images);
        });

        // Cambiar el fondo cada 30 segundos
        const interval = setInterval(() => {
            setCurrentBackgroundIndex(prevIndex => (prevIndex + 1) % backgrounds.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='app-background' style={{ backgroundImage: `url(${loadedImages.length > 0 ? loadedImages[currentBackgroundIndex].src : ''})` }}></div>
    );
}
