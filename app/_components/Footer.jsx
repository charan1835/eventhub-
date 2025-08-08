import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-purple-900 via-black to-pink-900 text-white py-10 border-t border-pink-500/30">
      <div className="container mx-auto px-4 flex flex-col items-center gap-8">
        {/* Brand/Logo */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent select-none">EventHub</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-lg font-semibold">
          <a href="#" className="hover:text-pink-400 transition-colors duration-200">Home</a>
          <a href="#" className="hover:text-pink-400 transition-colors duration-200">Events</a>
          <a href="#" className="hover:text-pink-400 transition-colors duration-200">About Us</a>
          <a href="#" className="hover:text-pink-400 transition-colors duration-200">Contact</a>
          <a href="#" className="hover:text-pink-400 transition-colors duration-200">FAQ</a>
        </nav>

        {/* Divider */}
        <div className="w-full border-t border-pink-500/20 my-4" />

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6">
          <a href="#" aria-label="Twitter" className="hover:text-pink-400 transition-colors duration-200">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 4.01c-.72.32-1.5.53-2.32.63.83-.5 1.47-1.29 1.77-2.25-.78.46-1.64.8-2.55.98-.74-.79-1.79-1.28-2.96-1.28-2.24 0-4.06 1.82-4.06 4.06 0 .32.04.63.1.92-3.37-.17-6.36-1.78-8.36-4.23-.35.6-.55 1.3-.55 2.05 0 1.4.71 2.64 1.79 3.37-.66-.02-1.28-.2-1.82-.5v.05c0 1.97 1.4 3.6 3.26 3.97-.34.09-.7.14-1.07.14-.26 0-.52-.03-.77-.07.52 1.62 2.03 2.79 3.82 2.82-1.39 1.09-3.14 1.74-5.04 1.74-.33 0-.66-.02-.98-.06 1.8 1.16 3.93 1.84 6.22 1.84 7.46 0 11.53-6.18 11.53-11.53 0-.18-.0-.36-.01-.54.79-.57 1.47-1.28 2.01-2.08z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition-colors duration-200">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c-1.5 0-2.875-.638-3.871-1.643-.996-1.005-1.639-2.375-1.639-3.871 0-1.5.638-2.875 1.643-3.871 1.005-.996 2.375-1.639 3.871-1.639 1.5 0 2.875.638 3.871 1.643.996 1.005 1.639 2.375 1.639 3.871 0 1.5-.638 2.875-1.643 3.871-1.005.996-2.375 1.639-3.871 1.639zm15.71-8.251c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zM12 10.25c-1.5 0-2.875-.638-3.871-1.643-.996-1.005-1.639-2.375-1.639-3.871 0-1.5.638-2.875 1.643-3.871 1.005-.996 2.375-1.639 3.871-1.639 1.5 0 2.875.638 3.871 1.643.996 1.005 1.639 2.375 1.639 3.871 0 1.5-.638 2.875-1.643 3.871-1.005.996-2.375 1.639-3.871 1.639z" />
            </svg>
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-pink-400 transition-colors duration-200">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.238 2.744 7.854 6.56 9.14.48.088.654-.208.654-.46 0-.228-.008-.836-.013-1.649-2.67.58-3.23-.97-3.23-.97-.436-1.107-1.06-1.4-1.06-1.4-.868-.592.064-.58.064-.58.96.068 1.465.986 1.465.986.852 1.463 2.234 1.04 2.77.794.085-.618.333-1.04.608-1.28-2.126-.242-4.365-1.063-4.365-4.743 0-1.048.375-1.908 1.01-2.58-.102-.243-.438-1.22.097-2.54 0 0 .827-.264 2.71.986.786-.218 1.62-.327 2.45-.332.83.005 1.664.114 2.45.332 1.883-1.25 2.71-1 2.71-1 .536 1.32.202 2.297.097 2.54.635.672 1.01 1.532 1.01 2.58 0 3.688-2.24 4.498-4.37 4.735.34.29.64.86.64 1.74 0 1.26-.012 2.275-.012 2.58 0 .25.174.55.658.455C20.258 19.83 23 16.214 23 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs md:text-sm text-gray-400 mt-2">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-white">EventHub</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
