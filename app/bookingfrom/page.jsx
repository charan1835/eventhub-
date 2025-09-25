"use client";

import { useState } from "react";

function BookingFormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ticketType: "",
    quantity: 1,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with Hygraph mutation or your API endpoint
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", ticketType: "", quantity: 1 });
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-12 px-5 md:px-10 lg:px-20 bg-gray-950 min-h-screen text-white">
      <div className="max-w-2xl mx-auto bg-gray-900/70 p-8 rounded-2xl shadow-lg border border-white/10 backdrop-blur-md">
        <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          🎟️ Book Your Tickets
        </h1>

        {success ? (
          <div className="text-center py-6">
            <p className="text-lg font-semibold text-green-400">
              ✅ Booking confirmed! Check your email for details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name */}
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 bg-gray-800 border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 bg-gray-800 border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Ticket Type */}
            <div>
              <label className="block mb-2 font-medium">Ticket Type</label>
              <select
                name="ticketType"
                required
                value={formData.ticketType}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 bg-gray-800 border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="" disabled>
                  Select ticket type
                </option>
                <option value="General">General Admission</option>
                <option value="VIP">VIP Pass</option>
                <option value="Student">Student Pass</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block mb-2 font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                max="10"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 bg-gray-800 border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 font-semibold shadow-md hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default BookingFormPage;
