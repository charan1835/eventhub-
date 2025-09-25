'use client';

import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GlobalApi from '../_utils/GlobalApi';

export default function Hero() {
  const [heroes, setHeroes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroRef = useRef(null);
  const videoRefs = useRef([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch heroes
  useEffect(() => {
    async function fetchHeroes() {
      try {
        const data = await GlobalApi.fetchHygraphHeroes();
        setHeroes(data.heroes || []);
      } catch (err) {
        console.error('Failed to fetch heroes:', err);
        setError('Failed to load heroes.');
      } finally {
        setLoading(false);
      }
    }
    fetchHeroes();
  }, []);

  // IntersectionObserver to unmute/mute the current hero video when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo) {
          if (entry.isIntersecting) {
            currentVideo.muted = false;
            currentVideo.play().catch(() => {});
          } else {
            currentVideo.muted = true;
            currentVideo.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    const currentHeroRef = heroRef.current;
    if (currentHeroRef) observer.observe(currentHeroRef);

    return () => {
      if (currentHeroRef) observer.unobserve(currentHeroRef);
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroes.length) % heroes.length);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white gap-4">
        <div className="scanner">
          <span></span>
        </div>
        <p className="text-xl font-mono tracking-widest">Loading Heroes...</p>
        <style jsx>{`
          .scanner {
            width: 100px;
            height: 100px;
            position: relative;
            border: 2px solid #ec489933;
            border-radius: 50%;
          }
          .scanner span {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 200px;
            margin-top: -100px;
            margin-left: -100px;
            background: radial-gradient(ellipse at center, #ec489944 0%, transparent 60%);
            border-radius: 50%;
            animation: scan 2s linear infinite;
          }
          @keyframes scan {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  if (error) return <div className="flex items-center justify-center h-screen bg-black text-red-500"><p>{error}</p></div>;
  if (heroes.length === 0) return <div className="flex items-center justify-center h-screen bg-black text-white"><p>No heroes available.</p></div>;

  return (
    <div ref={heroRef} className="relative w-full h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">
        <h1 className="section-title">Currently Trending Events</h1>
      <style jsx>{`
        .section-title {
          position: relative;
          z-index: 30;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-size: clamp(1.25rem, 2.2vw + 1rem, 2.25rem);
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-align: center;
          background: linear-gradient(90deg, #ffffff, #f0abfc, #ec4899);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 8px rgba(236, 72, 153, 0.25));
        }
        .section-title::after {
          content: '';
          display: block;
          width: 90px;
          height: 3px;
          margin: 0.75rem auto 0;
          background: linear-gradient(90deg, transparent, #ec4899, transparent);
          border-radius: 9999px;
          opacity: 0.85;
        }
        .starfield {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: transparent;
          animation: stars 200s linear infinite, flicker 3s linear infinite;
        }
        .starfield:before, .starfield:after {
          content: '';
          position: absolute;
          background-image: radial-gradient(#fff 1px, transparent 1px);
          background-size: 2px 2px;
          width: 100%; height: 100%;
        }
        .starfield:before { animation: travel-z-1 10s linear infinite; }
        .starfield:after { animation: travel-z-2 20s linear infinite; }
        @keyframes stars { from { transform: translateY(0px); } to { transform: translateY(-2000px); } }
        @keyframes travel-z-1 { from { transform: translateZ(-50px); } to { transform: translateZ(50px); } }
        @keyframes travel-z-2 { from { transform: translateZ(-100px); } to { transform: translateZ(100px); } }
        @keyframes flicker { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

        .hero-name {
          text-shadow: 0 0 5px #ec4899, 0 0 10px #ec4899, 0 0 20px #ec4899;
          animation: flicker-text 3s ease-in-out infinite alternate;
        }
        @keyframes flicker-text {
          0%, 18%, 22%, 25%, 53%, 57%, 100% { text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #ec4899, 0 0 80px #ec4899, 0 0 90px #ec4899, 0 0 100px #ec4899, 0 0 150px #ec4899; }
          20%, 24%, 55% { text-shadow: none; }
        }

        /* Responsive adjustments */
        @media (max-width: 767px) {
          .hero-carousel-container {
            perspective: 800px;
          }
          .hero-video-slide {
            transition: transform 0.5s ease-out;
          }
          .hero-name {
            bottom: 6rem; /* 96px */
            font-size: 2.25rem; /* Equivalent to text-4xl */
          }
          .nav-button {
            padding: 0.5rem; /* p-2 */
          }
          .dots-container {
            bottom: 1.5rem; /* bottom-6 */
            gap: 0.75rem; /* gap-3 */
          }
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="starfield"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      {/* Hero videos */}
      <div className="hero-carousel-container relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
        {heroes.map((hero, index) => (
          <div key={hero.name4} className="hero-video-slide absolute w-full h-full transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(${(index - currentIndex) * 80}%) translateZ(${Math.abs(index - currentIndex) * -200}px) rotateY(${(index - currentIndex) * -20}deg)`,
              zIndex: heroes.length - Math.abs(index - currentIndex),
              filter: `brightness(${index === currentIndex ? 1 : 0.4})`,
              opacity: index === currentIndex ? 1 : 0.8,
            }}
          >
          <div className="absolute w-full h-full flex items-center justify-center">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={hero.clip?.url}
              autoPlay
              loop
              playsInline
              muted={index !== currentIndex}
              className="w-full max-w-4xl md:max-w-5xl aspect-video object-cover rounded-2xl shadow-2xl shadow-pink-500/20"
            />
          </div>
          </div>
        ))}
      </div>

      {/* Hero Name */}
      <h2 className="absolute bottom-24 text-4xl md:text-6xl font-black tracking-widest uppercase hero-name">
        {heroes[currentIndex]?.name4}
      </h2>

      {/* Navigation */}
      <div className="absolute inset-x-0 bottom-1/2 transform-gpu flex items-center justify-between px-4 md:px-10">
        <button onClick={handlePrev} className="nav-button p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-pink-500/30 transition-all duration-300 hover:scale-110 shadow-lg"><ChevronLeft className="w-6 h-6 md:w-8 md:h-8" /></button>
        <button onClick={handleNext} className="nav-button p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-pink-500/30 transition-all duration-300 hover:scale-110 shadow-lg"><ChevronRight className="w-6 h-6 md:w-8 md:h-8" /></button>
      </div>

      {/* Dots */}
      <div className="dots-container absolute bottom-8 flex gap-4 items-center">
        {heroes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 ${index === currentIndex ? 'w-4 h-4 bg-pink-500 ring-2 ring-pink-500/50 ring-offset-2 ring-offset-black' : 'w-3 h-3 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
