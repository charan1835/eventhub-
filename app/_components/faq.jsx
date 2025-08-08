'use client';

import React, { useState } from 'react';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "❓ What is EventHub?",
      answer: "EventHub is a one-stop platform to discover, organize, and attend events. Whether it's a college fest, concert, workshop, or private gathering — we got you covered!"
    },
    {
      id: 2,
      question: "❓ How do I register for an event?",
      answer: "Just click on the event, tap \"Register Now,\" fill out your details, and boom — you're in! Some events may generate a QR code for entry."
    },
    {
      id: 3,
      question: "❓ Do I need an account to register?",
      answer: "Yep! You'll need to sign in via email or social login using Clerk for a smooth experience and to track your bookings."
    },
    {
      id: 4,
      question: "❓ Can I host or organize my own event?",
      answer: "Hell yeah! Just sign in as an organizer and hit \"Create Event.\" Add details, banner, date/time, and you're live."
    },
    {
      id: 5,
      question: "❓ How do I know my registration is confirmed?",
      answer: "You'll receive a confirmation email and a QR code (if required). You can also view all registered events in \"My Bookings.\""
    },
    {
      id: 6,
      question: "❓ Is EventHub free to use?",
      answer: "Registering for EventHub is totally free. Some events may be paid depending on the organizer."
    },
    {
      id: 7,
      question: "❓ Can I cancel or transfer my ticket?",
      answer: "It depends on the event policy. If the organizer allows it, cancellation or transfer options will be visible in your bookings."
    },
    {
      id: 8,
      question: "❓ Where can I view my registered events?",
      answer: "Head to your profile → \"My Bookings.\" All your past and upcoming events are there."
    },
    {
      id: 9,
      question: "❓ I'm facing issues. How can I contact support?",
      answer: "Go to the \"Connect\" page and fill the form. We'll get back ASAP."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleContactClick = () => {
    const phoneNumber = '8688605760';
    const message = encodeURIComponent('hey dude i have issue i need ur help..!');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden flex items-center justify-center py-12">
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-24 h-24 bg-white/10 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/2 right-[15%] w-40 h-40 bg-white/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-[25%] w-20 h-20 bg-white/10 rounded-full animate-spin-slow"></div>
        <div className="absolute top-[5%] right-[5%] w-16 h-16 bg-white/10 rounded-full animate-bounce-slow delay-200"></div>
        <div className="absolute bottom-[5%] left-[5%] w-28 h-28 bg-white/10 rounded-full animate-pulse-slow delay-400"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
            💥 FAQ
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto">
            Everything you need to know about EventHub
          </p>
        </div>

        {/* FAQ Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div
                  key={faq.id}
                  className={`bg-white rounded-xl shadow-lg border border-indigo-100 overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1 ${
                    activeIndex === index ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5 md:p-6 font-semibold text-base md:text-lg flex justify-between items-center hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 rounded-t-xl"
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ${
                        activeIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      activeIndex === index 
                        ? 'max-h-96 opacity-100 py-4 md:py-6' 
                        : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-5 md:px-6 text-gray-700 leading-relaxed">
                      <p className="text-sm md:text-base">
                        {faq.answer.split(/(".*?")/).map((part, i) => 
                          part.startsWith('"') && part.endsWith('"') ? (
                            <span key={i} className="bg-gradient-to-r from-indigo-100 to-purple-100 px-2 py-1 rounded-md font-semibold text-indigo-700 whitespace-nowrap">
                              {part.slice(1, -1)}
                            </span>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <button
                onClick={handleContactClick} // Added onClick handler
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg text-base md:text-lg"
              >
                Get in Touch 🚀
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-bounce-slow {
          animation: bounce-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FAQPage;
