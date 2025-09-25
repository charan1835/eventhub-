import React from 'react';
import Hero from './_components/Hero';
import "./globals.css";
// app/page.js

import Events from './_components/Events';
import FAQPage from './_components/faq';

export default function Home() {
  return (
    <>
      <Events />
      <Hero/>
      <FAQPage />
    </>
  );
}

