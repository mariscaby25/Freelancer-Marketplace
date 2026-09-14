import React, { useState, useEffect } from 'react';
import '../styles/banner.css';

const SLIDES = [
  '/images/banner.jpeg?v=2',
  '/images/banner1.jpeg?v=2',
  '/images/banner_2.jpeg?v=2',
  '/images/banner_3.jpeg?v=2',
  '/images/banner_4.jpeg?v=2',
];

export default function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-banner">
      <div className="page-banner-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {SLIDES.map((src, i) => (
          <div className="page-banner-slide" key={i}>
            <img src={src} alt={`Banner ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}