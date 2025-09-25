'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function MovieBookingPage() {
  const { movieName } = useParams();

  // Dummy showtimes
  const showtimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];

  // Dummy seats layout: 5 rows x 8 seats
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 8;

  const [selectedShowtime, setSelectedShowtime] = useState(showtimes[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 md:px-12 py-16 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Movie Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 drop-shadow-lg">
          {movieName || 'Movie Title'}
        </h1>

        {/* Showtimes Section */}
        <section className="bg-gray-800 p-6 rounded-2xl shadow-xl mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Select a Showtime</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {showtimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedShowtime(time)}
                className={`
                  px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300
                  ${selectedShowtime === time
                    ? 'bg-pink-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </section>

        {/* Theater Screen and Seats Section */}
        <section className="bg-gray-800 p-6 rounded-2xl shadow-xl mb-12">
          <div className="w-full max-w-2xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-10 rounded-t-lg text-center flex items-center justify-center text-gray-300 font-bold tracking-widest text-sm shadow-inner">
              SCREEN THIS WAY
            </div>

            {/* Seats Layout */}
            <div className="grid grid-rows-5 gap-3 mt-8 p-4 bg-gray-900 rounded-b-lg shadow-inner">
              {rows.map((row) => (
                <div key={row} className="flex justify-center gap-3">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seat = `${row}${i + 1}`;
                    const isSelected = selectedSeats.includes(seat);
                    const isOccupied = Math.random() < 0.2; // Dummy occupied seats

                    return (
                      <button
                        key={seat}
                        onClick={() => !isOccupied && toggleSeat(seat)}
                        disabled={isOccupied}
                        className={`
                          w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300
                          ${isOccupied
                            ? 'bg-red-500 cursor-not-allowed opacity-50'
                            : isSelected
                              ? 'bg-green-500 text-white transform scale-110 shadow-lg'
                              : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                          }
                        `}
                      >
                        {seat}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            {/* Legend for seat status */}
            <div className="flex justify-center gap-6 mt-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-gray-600"></span> Available
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500"></span> Selected
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500"></span> Occupied
              </div>
            </div>
          </div>
        </section>

        {/* Booking Summary Section */}
        <section className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Booking Summary</h2>
          <div className="text-gray-300 space-y-3">
            <p className="flex justify-between items-center">
              <span className="font-semibold text-lg">Movie:</span>
              <span className="text-white text-lg font-mono">{movieName || 'Movie Title'}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="font-semibold text-lg">Showtime:</span>
              <span className="text-white text-lg font-mono">{selectedShowtime}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="font-semibold text-lg">Seats:</span>
              <span className="text-white text-lg font-mono">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
              </span>
            </p>
            <p className="flex justify-between items-center border-t border-gray-700 pt-4">
              <span className="font-bold text-xl">Total Price:</span>
              <span className="text-pink-500 font-extrabold text-2xl">
                ${(selectedSeats.length * 12).toFixed(2)}
              </span>
            </p>
          </div>
          <button
            disabled={selectedSeats.length === 0}
            className={`mt-8 w-full px-4 py-4 rounded-lg font-bold text-xl transition-all duration-300
              ${selectedSeats.length === 0
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-pink-600 text-white hover:bg-pink-500 shadow-xl'
              }
            `}
          >
            Proceed to Payment
          </button>
        </section>
      </div>
    </div>
  );
}