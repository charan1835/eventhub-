import React from 'react'
import "./globals.css";
// app/page.js

import Events from './_components/Events';
import FAQPage from './_components/faq';

export default function Home() {
  return (
    <>
      <Events />
      <FAQPage />
    </>
  );
}

