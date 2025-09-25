'use client';
import { useState } from 'react';

const SEAT_ROWS = 7;
const SEATS_PER_ROW = 12;

// Include aisles as gaps between seat groups per row
const AISLE_AFTER_SEAT = 5;

const getInitialSeats = () => {
  const seats = [];
  for (let row = 0; row < SEAT_ROWS; row++) {
    const rowSeats = [];
    for (let seat = 0; seat < SEATS_PER_ROW; seat++) {
      const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;
      rowSeats.push({ id: seatId, selected: false });
    }
    seats.push(rowSeats);
  }
  return seats;
};

const AVAILABLE_TIMINGS = [
  { id: 'MORNING_SHOW', name: 'Morning Show', time: '10:00 AM' },
  { id: 'AFTERNOON_SHOW', name: 'Afternoon Show', time: '2:30 PM' },
  { id: 'EVENING_SHOW', name: 'Evening Show', time: '6:00 PM' },
  { id: 'NIGHT_SHOW', name: 'Night Show', time: '9:30 PM' },
];

export default function RealisticSeatSelector() {
  const [seats, setSeats] = useState(getInitialSeats());
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeatSelection = (rowIdx, seatIdx) => {
    const updatedSeats = seats.map((row, r) =>
      row.map((seat, s) => {
        if (r === rowIdx && s === seatIdx) {
          const newSelected = !seat.selected;
          if (newSelected) {
            setSelectedSeats([...selectedSeats, seat.id]);
          } else {
            setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
          }
          return { ...seat, selected: newSelected };
        }
        return seat;
      })
    );
    setSeats(updatedSeats);
  };

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: 'auto', fontFamily: 'Arial, sans-serif', color: '#fff', background: '#121212' }}>
      <h2 style={{ marginBottom: 20, textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>
        Select Your Seats
      </h2>

      {/* Screen */}
      <div style={{ margin: '0 auto 30px', width: '80%', height: 30, background: 'linear-gradient(90deg, #bbb, #888, #bbb)', borderRadius: 6, textAlign: 'center', lineHeight: '30px', color: '#222', fontWeight: 'bold', fontSize: 16 }}>
        SCREEN
      </div>

      {/* Seats Grid with aisles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {seats.map((row, ridx) => (
          <div key={`row-${ridx}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
            {/* Row label */}
            <div style={{ width: 20, color: '#bbb', fontWeight: 'bold', userSelect: 'none' }}>
              {String.fromCharCode(65 + ridx)}
            </div>

            {/* Seats in the row with aisle */}
            {row.map((seat, sidx) => (
              <div key={seat.id} style={{ marginRight: sidx === AISLE_AFTER_SEAT ? 20 : 0 }}>
                <button
                  type="button"
                  onClick={() => toggleSeatSelection(ridx, sidx)}
                  title={`Seat ${seat.id}`}
                  aria-pressed={seat.selected}
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: seat.selected ? '#ff5050' : '#555',
                    borderRadius: 6,
                    border: '1.5px solid #333',
                    color: '#fff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, transform 0.2s',
                    userSelect: 'none',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {seat.id}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Showtime Selector */}
      <div style={{ marginTop: 30 }}>
        <label htmlFor="showtime-select" style={{ color: '#bbb', fontWeight: 'bold', display: 'block', marginBottom: 6 }}>
          Select Showtime:
        </label>
        <select
          id="showtime-select"
          value={selectedShowtime}
          onChange={(e) => setSelectedShowtime(e.target.value)}
          style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #555', backgroundColor: '#222', color: '#fff', fontSize: 16 }}
        >
          <option value="">-- Choose a showtime --</option>
          {AVAILABLE_TIMINGS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} - {t.time}
            </option>
          ))}
        </select>
      </div>

      {/* Summary and Book Button */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 16 }}>
          <strong>Selected Showtime:</strong> {selectedShowtime || 'None'}
        </p>
        <p style={{ fontSize: 16 }}>
          <strong>Selected Seats:</strong> {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
        </p>
        <button
          disabled={!selectedShowtime || selectedSeats.length === 0}
          onClick={() => alert(`Booking ${selectedSeats.length} seat(s) for ${selectedShowtime}`)}
          style={{
            marginTop: 20,
            width: '100%',
            padding: '14px 0',
            backgroundColor: selectedShowtime && selectedSeats.length > 0 ? '#f44336' : '#666',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 'bold',
            cursor: selectedShowtime && selectedSeats.length > 0 ? 'pointer' : 'not-allowed',
            boxShadow: selectedShowtime && selectedSeats.length > 0 ? '0 4px 10px rgba(244,67,54,0.5)' : 'none',
            transition: 'background-color 0.3s, box-shadow 0.3s',
          }}
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
}
