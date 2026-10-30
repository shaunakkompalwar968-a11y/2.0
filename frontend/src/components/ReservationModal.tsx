"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, Users, CheckCircle, Utensils, BedDouble, Phone, Mail, User } from "lucide-react";
import confetti from "canvas-confetti";
import { bookTable, bookRoom, FALLBACK_ROOMS } from "@/lib/api";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "table" | "room";
  initialRoomId?: number;
}

export default function ReservationModal({
  isOpen,
  onClose,
  initialTab = "table",
  initialRoomId
}: ReservationModalProps) {
  const [activeTab, setActiveTab] = useState<"table" | "room">(initialTab);
  const [loading, setLoading] = useState(false);
  const [confirmedData, setConfirmedData] = useState<any>(null);

  // Table form state
  const [tableName, setTableName] = useState("");
  const [tableEmail, setTableEmail] = useState("");
  const [tablePhone, setTablePhone] = useState("");
  const [tableDate, setTableDate] = useState("");
  const [tableTime, setTableTime] = useState("19:30");
  const [tableGuests, setTableGuests] = useState(2);
  const [tableArea, setTableArea] = useState("Garden Dining");
  const [tableRequests, setTableRequests] = useState("");

  // Room form state
  const [roomId, setRoomId] = useState<number>(initialRoomId || 1);
  const [roomName, setRoomName] = useState("");
  const [roomEmail, setRoomEmail] = useState("");
  const [roomPhone, setRoomPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomGuests, setRoomGuests] = useState(2);
  const [roomRequests, setRoomRequests] = useState("");

  React.useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);
    setTableDate(today);
    setCheckIn(today);
    setCheckOut(tmrw.toISOString().split("T")[0]);
  }, []);

  if (!isOpen) return null;

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
        special_requests: tableRequests
      });
      setConfirmedData({ type: "table", ...res });
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch {
      alert("Something went wrong while booking your table. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await bookRoom({
        room_id: Number(roomId),
        name: roomName,
        email: roomEmail,
        phone: roomPhone,
        check_in: checkIn,
        check_out: checkOut,
        guests: Number(roomGuests),
        special_requests: roomRequests
      });
      setConfirmedData({ type: "room", ...res });
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {
      alert("Something went wrong while booking your stay. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setConfirmedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-[#FAF8F2] rounded-2xl shadow-2xl border border-[#E8E6DA] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#5C7457] text-[#FAF8F2]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl tracking-wide font-medium">Pooja Garden</span>
            <span className="text-xs uppercase px-2 py-0.5 bg-[#FAF8F2]/20 rounded-full text-[#FAF8F2]">
              Instant Reservation
            </span>
          </div>
          <button 
            onClick={resetAndClose}
            className="p-1 rounded-full text-[#FAF8F2]/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedData ? (
          /* Confirmation Success State */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#5C7457]/15 flex items-center justify-center text-[#5C7457]">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#22281F] font-semibold">
                Reservation Confirmed!
              </h3>
              <p className="text-[#5B6357] text-sm mt-1 max-w-md mx-auto">
                {confirmedData.message}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E8E6DA] text-left text-sm space-y-2.5 max-w-md mx-auto shadow-sm">
              <div className="flex justify-between border-b border-[#E8E6DA]/70 pb-2">
                <span className="text-[#8A9286]">Booking Reference:</span>
                <span className="font-mono font-bold text-[#C8693F]">{confirmedData.booking_ref}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A9286]">Guest Name:</span>
                <span className="font-medium text-[#22281F]">{confirmedData.name || confirmedData.guest_name}</span>
              </div>
              {confirmedData.type === "table" ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#8A9286]">Date & Time:</span>
                    <span className="font-medium text-[#22281F]">{confirmedData.date} at {confirmedData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A9286]">Party Size:</span>
                    <span className="font-medium text-[#22281F]">{confirmedData.guests} Guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A9286]">Seating Area:</span>
                    <span className="font-medium text-[#22281F]">{confirmedData.seating_area}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#8A9286]">Accommodation:</span>
                    <span className="font-medium text-[#22281F]">{confirmedData.room_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A9286]">Stay Dates:</span>
                    <span className="font-medium text-[#22281F]">{confirmedData.check_in} to {confirmedData.check_out}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A9286]">Total Estimate:</span>
                    <span className="font-bold text-[#5C7457]">₹{confirmedData.total_price?.toLocaleString()}</span>
                  </div>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 bg-[#5C7457] hover:bg-[#465942] text-white rounded-lg text-sm font-medium transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          /* Form Tabs */
          <div className="p-6">
            <div className="flex bg-[#E8E6DA]/60 p-1 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("table")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${
                  activeTab === "table"
                    ? "bg-[#5C7457] text-[#FAF8F2] shadow-sm"
                    : "text-[#5B6357] hover:text-[#22281F]"
                }`}
              >
                <Utensils className="w-4 h-4" />
                Reserve a Table
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("room")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${
                  activeTab === "room"
                    ? "bg-[#5C7457] text-[#FAF8F2] shadow-sm"
                    : "text-[#5B6357] hover:text-[#22281F]"
                }`}
              >
                <BedDouble className="w-4 h-4" />
                Book Room / Stay
              </button>
            </div>

            {activeTab === "table" ? (
              /* Table Booking Form */
              <form onSubmit={handleTableSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-[#8A9286]" />
                      <input
                        type="text"
                        required
                        value={tableName}
                        onChange={(e) => setTableName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 w-4 h-4 text-[#8A9286]" />
                      <input
                        type="tel"
                        required
                        value={tablePhone}
                        onChange={(e) => setTablePhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5B6357] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-[#8A9286]" />
                    <input
                      type="email"
                      required
                      value={tableEmail}
                      onChange={(e) => setTableEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={tableDate}
                        onChange={(e) => setTableDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-xs text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Time *
                    </label>
                    <select
                      value={tableTime}
                      onChange={(e) => setTableTime(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-xs text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                    >
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="13:30">01:30 PM (Lunch)</option>
                      <option value="14:30">02:30 PM (Lunch)</option>
                      <option value="19:00">07:00 PM (Dinner)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:00">08:00 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                      <option value="21:00">09:00 PM (Dinner)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Guests *
                    </label>
                    <select
                      value={tableGuests}
                      onChange={(e) => setTableGuests(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-xs text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5B6357] mb-1">
                    Seating Preference
                  </label>
                  <select
                    value={tableArea}
                    onChange={(e) => setTableArea(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                  >
                    <option value="Garden Dining">Garden Dining (Al fresco, starlit garden)</option>
                    <option value="Scenic Terrace">Scenic Terrace (Mountain & valley breeze)</option>
                    <option value="Indoor Heritage Hall">Indoor Heritage Hall (Cozy fireplace)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5B6357] mb-1">
                    Special Requests or Dietary Preferences
                  </label>
                  <textarea
                    rows={2}
                    value={tableRequests}
                    onChange={(e) => setTableRequests(e.target.value)}
                    placeholder="E.g., Birthday celebration, high chair needed, spicy food preference..."
                    className="w-full px-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-xs text-[#22281F] focus:outline-none focus:border-[#5C7457] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-lg text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? "Confirming Table..." : "Confirm Table Reservation"}
                </button>
              </form>
            ) : (
              /* Room Booking Form */
              <form onSubmit={handleRoomSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#5B6357] mb-1">
                    Select Room / Suite *
                  </label>
                  <select
                    value={roomId}
                    onChange={(e) => setRoomId(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                  >
                    {FALLBACK_ROOMS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} - ₹{r.price_per_night.toLocaleString()} / night ({r.bed_type})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Check-In Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-xs text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Check-Out Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-xs text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
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
                      className="w-full px-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
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
                      placeholder="jane@example.com"
                      className="w-full px-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Number of Guests *
                    </label>
                    <select
                      value={roomGuests}
                      onChange={(e) => setRoomGuests(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-xs text-[#22281F] focus:outline-none focus:border-[#5C7457]"
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
                    placeholder="E.g., Early check-in, extra pillows, floral setup..."
                    className="w-full px-3 py-2 bg-white border border-[#E8E6DA] rounded-lg text-xs text-[#22281F] focus:outline-none focus:border-[#5C7457] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-lg text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? "Confirming Stay..." : "Confirm Room Stay"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
