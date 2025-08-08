'use client';

import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    GlobalApi.getAllEvents().then((res) => {
      setEvents(res.events);
    }).catch((err) => {
      console.error("Error fetching events:", err);
    });
  }, []);

  return (
    <div className="px-6 py-12 w-full mx-auto bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen mt-10">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        .music-container {
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

        .carousel-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .events-list {
          display: flex;
          overflow-x: auto;
          gap: 2rem;
          padding: 2rem 1rem;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .events-list::-webkit-scrollbar {
          display: none;
        }

        .event-card {
          flex: 0 0 auto;
          width: 350px;
          scroll-snap-align: center;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: scale(0.9) translateY(20px);
          opacity: 0.7;
          position: relative;
          overflow: hidden;
        }

        .event-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, 
            rgba(147, 51, 234, 0.1) 0%, 
            rgba(59, 130, 246, 0.1) 25%, 
            rgba(16, 185, 129, 0.1) 50%, 
            rgba(245, 101, 101, 0.1) 75%, 
            rgba(147, 51, 234, 0.1) 100%);
          opacity: 0;
          animation: rainbow-border 3s linear infinite;
          border-radius: 20px;
          transition: opacity 0.3s ease;
        }

        @keyframes rainbow-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .event-card:hover {
          transform: scale(1.05) translateY(-10px);
          opacity: 1;
          box-shadow: 
            0 25px 50px rgba(147, 51, 234, 0.3),
            0 0 0 1px rgba(147, 51, 234, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .event-card:hover::before {
          opacity: 1;
        }

        .event-image {
          position: relative;
          overflow: hidden;
          border-radius: 16px 16px 0 0;
        }

        .event-image img {
          transition: all 0.4s ease;
          filter: brightness(0.8) contrast(1.2);
        }

        .event-card:hover .event-image img {
          transform: scale(1.1);
          filter: brightness(1) contrast(1.3);
        }

        .music-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(147, 51, 234, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: bold;
          backdrop-filter: blur(10px);
        }

        .event-content {
          padding: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .event-title {
          color: white;
          font-weight: 700;
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .event-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          line-height: 1.5;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 2rem;
        }

        .vinyl-loader {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(45deg, #1a1a1a, #333);
          border: 4px solid #147234;
          position: relative;
          animation: spin 2s linear infinite;
        }

        .vinyl-loader::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: #147234;
          border-radius: 50%;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Mobile Responsive */
        @media (max-width: 767px) {
          .event-card {
            width: calc(100% - 2rem);
            scroll-snap-align: start;
          }
          
          .events-list {
            padding: 1rem 0.5rem;
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .event-card {
            width: calc(100% - 1rem);
          }
        }
      `}</style>
      
      <div className="music-container relative">
        {/* Floating Musical Notes Background */}
        <div className="floating-notes">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="music-note"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            >
              {['♪', '♫', '♬', '♩', '♭', '♯'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>

        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-white title-glow mb-4">
            🎵 MUSIC EVENTS 🎵
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="carousel-container">
          <div className="events-list">
            {events.length === 0 ? (
              <div className="loading-container w-full">
                <div className="vinyl-loader"></div>
                <p className="text-white text-xl font-semibold">
                  Loading amazing events...
                </p>
              </div>
            ) : (
              events.map((event, index) => (
                <div
                  key={event.id}
                  className="event-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="event-image">
                    <img
                      src={event.image?.url}
                      alt={event.eventname}
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
              ))
            )}
          </div>
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