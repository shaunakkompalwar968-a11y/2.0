"use client";

import React, { useState } from "react";
import { Calendar, ShieldCheck, Clock, Award, CheckCircle, BedDouble, Utensils } from "lucide-react";
import confetti from "canvas-confetti";
import { bookRoom, bookTable, FALLBACK_ROOMS } from "@/lib/api";

export default function BookingSection() {
  const [bookingMode, setBookingMode] = useState<"room" | "table">("room");
  const [loading, setLoading] = useState(false);
  const [confirmedData, setConfirmedData] = useState<any>(null);

  // Room state
  const [selectedRoomId, setSelectedRoomId] = useState<number>(1);
  const [roomName, setRoomName] = useState("");
  const [roomEmail, setRoomEmail] = useState("");
  const [roomPhone, setRoomPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomGuests, setRoomGuests] = useState(2);
  const [roomRequests, setRoomRequests] = useState("");

  // Table state
  const [tableName, setTableName] = useState("");
  const [tableEmail, setTableEmail] = useState("");
  const [tablePhone, setTablePhone] = useState("");
  const [tableDate, setTableDate] = useState("");
  const [tableTime, setTableTime] = useState("19:30");
  const [tableGuests, setTableGuests] = useState(2);
  const [tableArea, setTableArea] = useState("Garden Dining");
  const [tableRequests, setTableRequests] = useState("");

  React.useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);
    setCheckIn(today);
    setCheckOut(tmrw.toISOString().split("T")[0]);
    setTableDate(today);
  }, []);

  const activeRoom = FALLBACK_ROOMS.find((r) => r.id === selectedRoomId) || FALLBACK_ROOMS[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const estimatedTotal = activeRoom.price_per_night * nights;

  const handleRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await bookRoom({
        room_id: selectedRoomId,
        name: roomName,
        email: roomEmail,
        phone: roomPhone,
        check_in: checkIn,
        check_out: checkOut,
        guests: Number(roomGuests),
        special_requests: roomRequests,
      });
      setConfirmedData({ type: "room", ...res });
      confetti({ particleCount: 90, spread: 60 });
    } catch {
      alert("Booking failed. Please try again or call +91 98765 43210.");
    } finally {
      setLoading(false);
    }
  };

  const handleTableSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await bookTable({
        name: tableName,
        email: tableEmail,
        phone: tablePhone,
        date: tableDate,
        time: tableTime,
        guests: Number(tableGuests),
        seating_area: tableArea,
        special_requests: tableRequests,
      });
      setConfirmedData({ type: "table", ...res });
      confetti({ particleCount: 90, spread: 60 });
    } catch {
      alert("Table reservation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-[#FAF8F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Toggle Mode */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#E8E6DA]/70 p-1.5 rounded-2xl flex max-w-md w-full border border-[#E8E6DA]">
            <button
              onClick={() => { setBookingMode("room"); setConfirmedData(null); }}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                bookingMode === "room"
                  ? "bg-[#5C7457] text-[#FAF8F2] shadow-sm"
                  : "text-[#5B6357] hover:text-[#22281F]"
              }`}
            >
              <BedDouble className="w-4 h-4" />
              Book Room / Stay
            </button>
            <button
              onClick={() => { setBookingMode("table"); setConfirmedData(null); }}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                bookingMode === "table"
                  ? "bg-[#5C7457] text-[#FAF8F2] shadow-sm"
                  : "text-[#5B6357] hover:text-[#22281F]"
              }`}
            >
              <Utensils className="w-4 h-4" />
              Reserve a Dining Table
            </button>
          </div>
        </div>

        {confirmedData ? (
          /* Confirmation State */
          <div className="bg-white p-10 rounded-2xl border border-[#E8E6DA] text-center max-w-xl mx-auto shadow-md space-y-5 animate-fade-in">
            <CheckCircle className="w-16 h-16 text-[#5C7457] mx-auto" />
            <h3 className="font-serif text-3xl font-bold text-[#22281F]">
              Reservation Confirmed!
            </h3>
            <p className="text-sm text-[#5B6357]">
              {confirmedData.message}
            </p>
            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-[#E8E6DA] text-left text-sm space-y-2">
              <div className="flex justify-between border-b border-[#E8E6DA] pb-2 font-mono">
                <span className="text-[#8A9286]">Booking Reference:</span>
                <span className="font-bold text-[#C8693F]">{confirmedData.booking_ref}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A9286]">Guest:</span>
                <span className="font-medium text-[#22281F]">{confirmedData.name}</span>
              </div>
              {confirmedData.type === "room" ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#8A9286]">Room:</span>
                    <span className="font-medium text-[#22281F]">{confirmedData.room_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A9286]">Dates:</span>
                    <span className="font-medium text-[#22281F]">{confirmedData.check_in} &rarr; {confirmedData.check_out}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A9286]">Total:</span>
                    <span className="font-bold text-[#5C7457]">₹{confirmedData.total_price?.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#8A9286]">Date & Time:</span>
                    <span className="font-medium text-[#22281F]">{confirmedData.date} at {confirmedData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A9286]">Area:</span>
                    <span className="font-medium text-[#22281F]">{confirmedData.seating_area}</span>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setConfirmedData(null)}
              className="px-6 py-2.5 bg-[#5C7457] hover:bg-[#465942] text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
            >
              Make Another Booking
            </button>
          </div>
        ) : (
          /* Booking Forms & Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-[#E8E6DA] shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#22281F] mb-6">
                {bookingMode === "room" ? "Select Dates & Guest Information" : "Reserve Dining Experience"}
              </h3>

              {bookingMode === "room" ? (
                <form onSubmit={handleRoomSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Choose Room or Suite *
                    </label>
                    <select
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                    >
                      {FALLBACK_ROOMS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} — ₹{r.price_per_night.toLocaleString()} / night
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Check In *
                      </label>
                      <input
                        type="date"
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Check Out *
                      </label>
                      <input
                        type="date"
                        required
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Guest Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={roomPhone}
                        onChange={(e) => setRoomPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={roomEmail}
                        onChange={(e) => setRoomEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Guests *
                      </label>
                      <select
                        value={roomGuests}
                        onChange={(e) => setRoomGuests(Number(e.target.value))}
                        className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      >
                        <option value={1}>1 Adult</option>
                        <option value={2}>2 Adults</option>
                        <option value={3}>3 Adults</option>
                        <option value={4}>4 Adults / Family</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Special Requests
                    </label>
                    <textarea
                      rows={2}
                      value={roomRequests}
                      onChange={(e) => setRoomRequests(e.target.value)}
                      placeholder="Extra bed, quiet floor, anniversary arrangement..."
                      className="w-full px-4 py-2 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-xs text-[#22281F] focus:outline-none focus:border-[#5C7457] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-xl text-sm font-semibold tracking-wider uppercase shadow-md transition-all cursor-pointer disabled:opacity-70 mt-2"
                  >
                    {loading ? "Checking Availability..." : "Check Availability & Confirm"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleTableSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={tableName}
                        onChange={(e) => setTableName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={tablePhone}
                        onChange={(e) => setTablePhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Reservation Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={tableDate}
                        onChange={(e) => setTableDate(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-xs text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Meal Time *
                      </label>
                      <select
                        value={tableTime}
                        onChange={(e) => setTableTime(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-xs text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      >
                        <option value="12:30">12:30 PM (Lunch)</option>
                        <option value="13:30">01:30 PM (Lunch)</option>
                        <option value="19:30">07:30 PM (Dinner)</option>
                        <option value="20:30">08:30 PM (Dinner)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Guests *
                      </label>
                      <select
                        value={tableGuests}
                        onChange={(e) => setTableGuests(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-xs text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      >
                        {[1, 2, 4, 6, 8, 10, 15].map((g) => (
                          <option key={g} value={g}>{g} Guests</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={tableEmail}
                      onChange={(e) => setTableEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Seating Zone
                    </label>
                    <select
                      value={tableArea}
                      onChange={(e) => setTableArea(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                    >
                      <option value="Garden Dining">Garden Dining (Al fresco)</option>
                      <option value="Scenic Terrace">Scenic Terrace (Valley View)</option>
                      <option value="Indoor Heritage Hall">Indoor Heritage Hall</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-xl text-sm font-semibold tracking-wider uppercase shadow-md transition-all cursor-pointer disabled:opacity-70 mt-2"
                  >
                    {loading ? "Reserving..." : "Confirm Table Reservation"}
                  </button>
                </form>
              )}
            </div>

            {/* Right Summary Column matching the screenshot */}
            <div className="lg:col-span-5 space-y-6">
              {/* Selected Room Preview */}
              {bookingMode === "room" && (
                <div className="bg-white rounded-2xl border border-[#E8E6DA] overflow-hidden shadow-sm">
                  <div className="aspect-[16/9] relative">
                    <img
                      src={activeRoom.image_url}
                      alt={activeRoom.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h4 className="font-serif text-xl font-bold">{activeRoom.name}</h4>
                      <p className="text-xs text-white/80">{activeRoom.view_type}</p>
                    </div>
                  </div>
                  <div className="p-5 space-y-3 text-sm">
                    <div className="flex justify-between items-center text-[#5B6357] text-xs">
                      <span>Rate Per Night:</span>
                      <span className="font-semibold text-[#22281F]">₹{activeRoom.price_per_night.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#5B6357] text-xs">
                      <span>Stay Duration:</span>
                      <span className="font-semibold text-[#22281F]">{nights} {nights === 1 ? "Night" : "Nights"}</span>
                    </div>
                    <div className="border-t border-[#E8E6DA] pt-3 flex justify-between items-center">
                      <span className="font-serif font-bold text-base text-[#22281F]">Total Estimate:</span>
                      <span className="font-serif font-bold text-xl text-[#5C7457]">₹{estimatedTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Best Rate Guarantee Badge matching the screenshot */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8E6DA] flex items-center gap-3 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#5C7457]/10 flex items-center justify-center text-[#5C7457] shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#22281F]">
                    Best Rate Guarantee
                  </h4>
                  <p className="text-xs text-[#5B6357]">
                    Book direct for the best rates, free room upgrades when available, and exclusive welcomes.
                  </p>
                </div>
              </div>

              {/* Why Book Direct Pillars */}
              <div className="bg-[#5C7457]/10 p-6 rounded-2xl border border-[#5C7457]/20 space-y-4">
                <h4 className="font-serif text-sm font-bold text-[#22281F] uppercase tracking-wider">
                  Why Book Direct?
                </h4>
                <div className="space-y-3 text-xs text-[#5B6357]">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#5C7457] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#22281F]">Free Cancellation</p>
                      <p>Up to 24 hrs before check-in date.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#5C7457] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#22281F]">Exclusive Offers</p>
                      <p>Special seasonal rates, meal packages and botanical tours.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-4 h-4 text-[#5C7457] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#22281F]">Priority Support</p>
                      <p>We&apos;re here to accommodate any personal preferences.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
