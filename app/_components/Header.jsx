"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const SignInButton = dynamic(() => import("@clerk/nextjs").then(mod => mod.SignInButton), { ssr: false });
const SignUpButton = dynamic(() => import("@clerk/nextjs").then(mod => mod.SignUpButton), { ssr: false });
const UserButton = dynamic(() => import("@clerk/nextjs").then(mod => mod.UserButton), { ssr: false });

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upload", href: "/upload" },
  { name: "My Bookings", href: "/mybookings" },
  { name: "About", href: "/about" },
  { name: "Connect", href: "/connect" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/95 to-black/80 backdrop-blur-md text-white shadow-lg border-b border-pink-500/20 transition-all duration-300 ease-out">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-3">
        {/* Squid Game inspired logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            {/* Circle (from Squid Game logo) */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-red-600 border-2 border-white shadow-lg shadow-pink-500/30 group-hover:rotate-12 transition-transform duration-300"></div>
            {/* Square (from Squid Game logo) */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-400 to-cyan-300 border border-white shadow-md group-hover:-rotate-12 transition-transform duration-300"></div>
            {/* Triangle (from Squid Game logo) */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-300 to-amber-400 border border-white shadow-sm rotate-45 group-hover:rotate-0 transition-transform duration-300"></div>
          </div>
          <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-pink-400 via-red-400 to-pink-500 bg-clip-text text-transparent">
            Event<span className="text-white">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative group font-medium text-white/90 hover:text-white transition-colors duration-300"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}

          {isSignedIn ? (
            <div className="ml-4 hover:scale-110 transition-transform duration-200">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex gap-3 ml-4">
              <SignInButton mode="modal">
                <button className="px-5 py-1.5 border border-pink-500/50 text-pink-400 rounded-full hover:bg-pink-500/10 hover:border-pink-500/80 hover:text-pink-300 transition-all duration-300 shadow-sm hover:shadow-pink-500/20">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-5 py-1.5 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-pink-500/30">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 focus:outline-none transition-all duration-200"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={26} className="text-pink-400" />
          ) : (
            <Menu size={26} />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden px-5 py-3 space-y-4 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-lg border-t border-pink-500/20 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block py-2 px-3 rounded-lg hover:bg-white/5 text-lg font-medium transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

<div className="pt-2 border-t border-purple-800/20"> {/* Changed border color slightly for theme */}
  {isSignedIn ? (
    <div className="flex justify-center py-2">
      <UserButton afterSignOutUrl="/" />
    </div>
  ) : (
    <div className="flex flex-col gap-3">
      <SignInButton mode="modal">
        <button
          className="relative w-full px-6 py-3 font-semibold text-lg rounded-full overflow-hidden
                     bg-gradient-to-br from-purple-600 to-indigo-700 text-white
                     shadow-lg shadow-purple-500/30
                     transform transition-all duration-400 ease-out
                     hover:scale-105 hover:shadow-xl hover:shadow-purple-400/50
                     after:content-[''] after:absolute after:inset-0 after:bg-[url('/path/to/music-wave-pattern.svg')] after:bg-cover after:opacity-10 after:mix-blend-overlay after:transition-opacity after:duration-300
                     group"
          onClick={() => setIsOpen(false)}
        >
          <span className="relative z-10 tracking-wide">Tune In</span>
          {/* Subtle light pulse effect */}
          <span className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-10 animate-pulse-fade-out"></span>
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button
          className="relative w-full px-6 py-3 font-semibold text-lg rounded-full overflow-hidden
                     bg-gradient-to-br from-pink-500 to-red-600 text-white
                     shadow-lg shadow-red-500/30
                     transform transition-all duration-400 ease-out
                     hover:scale-105 hover:shadow-xl hover:shadow-red-400/50
                     before:absolute before:inset-0 before:bg-[url('/path/to/vinyl-grooves.svg')] before:bg-cover before:opacity-10 before:mix-blend-overlay before:transition-opacity before:duration-300
                     group"
          onClick={() => setIsOpen(false)}
        >
          <span className="relative z-10 tracking-wide">Hit Play</span>
          {/* Glowing ring effect */}
          <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white group-hover:border-opacity-40 transition-all duration-300 animate-spin-slow"></span>
        </button>
      </SignUpButton>
    </div>
  )}
</div>
        </div>
      )}
    </nav>
  );
}