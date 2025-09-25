'use client';

import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'; 
import GlobalApi from '../_utils/GlobalApi.js';

function Events() {
  const [events, setEvents] = useState([]);
  
  // Deterministic floating notes (SSR/CSR safe)
  const notes = useMemo(() => {
    function seeded(seed) {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    }
    const arr = [];
    const glyphs = ['♪', '♫', '♬', '♩', '♭', '♯'];
    for (let i = 0; i < 12; i++) {
      const r1 = seeded(100 + i);
      const r2 = seeded(200 + i);
      const r3 = seeded(300 + i);
      const r4 = seeded(400 + i);
      arr.push({
        left: `${(r1 * 100).toFixed(2)}%`,
        animationDelay: `${(r2 * 6).toFixed(2)}s`,
        animationDuration: `${(4 + r3 * 4).toFixed(2)}s`,
        char: glyphs[Math.floor(r4 * glyphs.length)]
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    let active = true;
    const getEvents = async () => {
      try {
        const data = await GlobalApi.fetchHygraphEvents();
        if (active) {
          const list = (data?.events || []).map((e) => ({
            id: e.id,
            slug: e.slug,
            eventname: e.eventname,
            about: e.about,
            image: e.image,
          }));
          setEvents(list);
        }
      } catch (err) {
        console.error('Error fetching events (Hygraph):', err);
      }
    };
    getEvents();
    return () => { active = false };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-purple-900/50 to-black text-white">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        .events-container {
          font-family: 'Orbitron', monospace;
        }

        .title-glow {
          text-shadow: 0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3);
          animation: pulse-glow 2s ease-in-out infinite alternate;
        }

        @keyframes pulse-glow {
          from { text-shadow: 0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3); }
          to { text-shadow: 0 0 30px rgba(147, 51, 234, 0.8), 0 0 60px rgba(147, 51, 234, 0.5); }
        }

        .floating-notes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .music-note {
          position: absolute;
          color: rgba(147, 51, 234, 0.3);
          font-size: 1.5rem;
          animation: float-up 6s linear infinite;
        }

        @keyframes float-up {
          0% {
            opacity: 0;
            transform: translateY(100vh) rotate(0deg);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) rotate(360deg);
          }
        }

        .events-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2.5rem;
        }

        .event-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          padding: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .event-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 1rem;
          background: linear-gradient(120deg, rgba(236, 72, 153, 0.4), rgba(147, 51, 234, 0.4), rgba(59, 130, 246, 0.4));
          z-index: -1;
          transition: all 0.4s ease;
          opacity: 0.5;
          filter: blur(2px);
        }

        .event-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .event-card:hover::before {
          opacity: 0.8;
          filter: blur(4px);
          transform: scale(1.02);
        }

        .event-image {
          position: relative;
          overflow: hidden;
          border-radius: 1rem 1rem 0 0;
        }

        .event-image img {
          transition: all 0.4s ease;
           filter: saturate(0.9) brightness(0.8);
        }

        .event-card:hover .event-image img {
          transform: scale(1.1);
           filter: saturate(1.2) brightness(1);
        }

        .music-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(236, 72, 153, 0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: bold;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .event-content {
          padding: 1.5rem;
          position: relative;
          z-index: 2;
          background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
          border-radius: 0 0 1rem 1rem;
        }

        .event-title {
          color: white;
          font-weight: 700;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .event-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          line-height: 1.6;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          min-height: 4.3rem; /* 3 lines * 1.6 line-height * 0.9rem font-size */
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          gap: 2rem;
        }

        .scanner {
          width: 120px;
          height: 120px;
          position: relative;
        }
        .scanner::before, .scanner::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #ec4899;
          animation: spin 2s linear infinite;
        }
        .scanner::after {
          border-top-color: #8b5cf6;
          animation: spin 3s linear infinite reverse;
        }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .scanner-text {
          color: #f472b6;
          text-shadow: 0 0 5px #f472b6, 0 0 10px #f472b6;
          animation: pulse-text 1.5s ease-in-out infinite alternate;
        }

        @keyframes pulse-text {
          from { opacity: 0.7; }
          to { opacity: 1; }
        }

        /* Mobile Responsive */
        @media (max-width: 767px) {
          .events-list {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
      
      <div className="events-container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        {/* Floating Musical Notes Background (deterministic for SSR/CSR) */}
        <div className="floating-notes">
          {notes.map((n, i) => (
            <div key={i} className="music-note" style={{ left: n.left, animationDelay: n.animationDelay, animationDuration: n.animationDuration }}>
              {n.char}
            </div>
          ))}
        </div>

        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
            Featured Events
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto">
            Discover the next wave of live music and unforgettable moments.
          </p>
        </div>
        
        <div className="events-list">
          {events.length === 0 ? (
            <div className="loading-container col-span-full">
              <div className="scanner"></div>
              <p className="scanner-text text-xl font-semibold">
                Scanning for events...
              </p>
            </div>
          ) : (
            events.map((event, index) => (
              <Link href={`/Eventinfo/${event.slug}`} key={`${event.id}-${index}`}>
                <div className="event-card">
                    <div className="event-image">
                      <img
                        src={event.image?.url || ''}
                        alt={event.eventname || 'Event'}
                        className="w-full h-48 object-cover"
                      />
                      <div className="music-overlay">
                        🎪 LIVE
                      </div>
                    </div>
                    
                    <div className="event-content">
                      <h2 className="event-title">
                        🎤 {event.eventname}
                      </h2>
                      <div className="event-description">
                        {event.about}
                      </div>
                    </div>
                  </div>
              </Link>
            ))
          )}
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 text-white/60 text-sm">
            <span>🎼</span>
            <span>Feel the rhythm, live the music</span>
            <span>🎼</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;