"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const SignInButton = dynamic(() => import("@clerk/nextjs").then(mod => mod.SignInButton), { ssr: false, loading: () => <div className="w-20 h-8 rounded-full bg-white/10 animate-pulse" /> });
const SignUpButton = dynamic(() => import("@clerk/nextjs").then(mod => mod.SignUpButton), { ssr: false, loading: () => <div className="w-20 h-8 rounded-full bg-white/10 animate-pulse" /> });
const UserButton = dynamic(() => import("@clerk/nextjs").then(mod => mod.UserButton), { ssr: false });

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upload", href: "/upload" },
  { name: "Heroes", href: "/heroes" },
  { name: "My Bookings", href: "/mybookings" },
  { name: "About", href: "/about" },
  { name: "Connect", href: "/connect" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 text-white transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-pink-500/30 shadow-2xl shadow-pink-500/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out forwards;
        }
        .nav-link::after, .nav-link::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0;
          height: 2px;
          transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .nav-link::after {
          background: linear-gradient(to right, #ec4899, #f472b6);
        }
        .nav-link::before {
          background: rgba(236, 72, 153, 0.3);
          transition-delay: 0.1s;
        }
        .nav-link:hover::after, .nav-link:hover::before {
          width: 100%;
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-3">
        {/* New Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-pink-500 opacity-60 blur-md group-hover:blur-lg transition-all duration-300"></div>
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent select-none">
            Event<span className="text-white">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className="nav-link relative group font-medium text-white/80 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-3 ml-4">
            {isLoaded && (
              isSignedIn ? (
                <div className="hover:scale-110 transition-transform duration-200">
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <>
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
                </>
              )
            )}
          </div>
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
        <div className="md:hidden px-5 py-4 space-y-2 bg-black/90 backdrop-blur-xl border-t border-pink-500/20 animate-fade-in-down">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className="block py-2.5 px-4 rounded-lg hover:bg-white/10 text-lg font-semibold transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-purple-800/20">
            {isLoaded && (
              isSignedIn ? (
                <div className="flex justify-center py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <SignInButton mode="modal">
                    <button
                      className="w-full px-6 py-3 font-semibold text-lg rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-lg shadow-purple-500/30 transform transition-transform duration-300 hover:scale-105"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button
                      className="w-full px-6 py-3 font-semibold text-lg rounded-full bg-gradient-to-br from-pink-500 to-red-600 text-white shadow-lg shadow-red-500/30 transform transition-transform duration-300 hover:scale-105"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}