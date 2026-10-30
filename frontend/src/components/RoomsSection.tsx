"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, Bed, Eye, Wifi, Clock, Mountain, Car, Check } from "lucide-react";
import { Room, FALLBACK_ROOMS } from "@/lib/api";
import ReservationModal from "./ReservationModal";

interface RoomsSectionProps {
  initialRooms?: Room[];
  showHeading?: boolean;
}

export default function RoomsSection({
  initialRooms = FALLBACK_ROOMS,
  showHeading = true,
}: RoomsSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number>(1);

  const openBooking = (roomId: number) => {
    setSelectedRoomId(roomId);
    setModalOpen(true);
  };

  const lodgeAmenities = [
    { icon: Wifi, title: "Free Wi-Fi", desc: "High-Speed Internet" },
    { icon: Clock, title: "Room Service", desc: "24/7 Available" },
    { icon: Mountain, title: "Mountain View", desc: "From Every Room" },
    { icon: Car, title: "Parking", desc: "Secure On-Site" },
  ];

  return (
    <>
      <section className="py-20 bg-[#FAF8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showHeading && (
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#5C7457] bg-[#5C7457]/10 px-3 py-1 rounded-full">
                Accommodations & Lodging
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#22281F] mt-3">
                Rooms & Suites
              </h2>
              <p className="text-sm sm:text-base text-[#5B6357] mt-3">
                Choose from our well-designed rooms and suites, offering comfort, tranquil botanical gardens, and relaxation.
              </p>
            </div>
          )}

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E8E6DA] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group card-hover"
              >
                {/* Room Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E8E6DA]">
                  <img
                    src={room.image_url}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#22281F]/80 backdrop-blur-md text-[#FAF8F2] px-3 py-1.5 rounded-full text-xs font-semibold">
                    ₹{room.price_per_night.toLocaleString()} / night
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#22281F] group-hover:text-[#5C7457] transition-colors">
                      {room.name}
                    </h3>

                    <p className="text-xs text-[#5B6357] mt-2 line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Room Specs */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#E8E6DA]/60 text-[11px] text-[#5B6357]">
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-[#5C7457]" />
                        <span>{room.bed_type}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#5C7457]" />
                        <span>Up to {room.capacity_adults} Adults</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2">
                        <Eye className="w-3.5 h-3.5 text-[#5C7457]" />
                        <span>{room.view_type}</span>
                      </div>
                    </div>

                    {/* Amenities Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded text-[10px] text-[#5B6357] flex items-center gap-1"
                        >
                          <Check className="w-2.5 h-2.5 text-[#5C7457]" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 mt-4 border-t border-[#E8E6DA] flex items-center justify-between gap-3">
                    <button
                      onClick={() => openBooking(room.id)}
                      className="flex-1 py-2.5 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
                    >
                      Book Now
                    </button>
                    <Link
                      href="/lodge"
                      className="px-4 py-2.5 border border-[#E8E6DA] hover:border-[#5C7457] hover:text-[#5C7457] text-[#22281F] rounded-lg text-xs font-medium transition-colors text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Amenities Highlight Bar */}
          <div className="mt-16 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E6DA] shadow-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {lodgeAmenities.map((amenity, idx) => {
                const Icon = amenity.icon;
                return (
                  <div key={idx} className="flex items-center gap-3.5 text-left">
                    <div className="w-11 h-11 rounded-xl bg-[#5C7457]/10 flex items-center justify-center text-[#5C7457] shrink-0 border border-[#5C7457]/15">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#22281F]">
                        {amenity.title}
                      </h4>
                      <p className="text-[11px] text-[#5B6357]">
                        {amenity.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <ReservationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab="room"
        initialRoomId={selectedRoomId}
      />
    </>
  );
}
