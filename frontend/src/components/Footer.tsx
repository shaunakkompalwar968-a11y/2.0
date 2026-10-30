"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Send, Check } from "lucide-react";
import { subscribeNewsletter } from "@/lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await subscribeNewsletter(email);
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#5C7457] text-[#FAF8F2] pt-14 pb-8 border-t border-[#FAF8F2]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Subscription Banner */}
        <div className="bg-[#465942] rounded-2xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#FAF8F2]/10 shadow-lg">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#FAF8F2]">
              Join the Pooja Garden Family
            </h3>
            <p className="text-[#FAF8F2]/80 text-sm mt-1 max-w-md">
              Subscribe for exclusive dining offers, seasonal chef specials, and discounted weekend resort stay packages.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#FAF8F2]/15 text-[#FAF8F2] px-4 py-2.5 rounded-xl text-sm font-medium">
                <Check className="w-5 h-5 text-[#FAF8F2]" />
                <span>You are subscribed! Welcome to our inner circle.</span>
              </div>
            ) : (
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-4 pr-12 py-3 bg-[#FAF8F2]/10 border border-[#FAF8F2]/25 rounded-xl text-sm text-[#FAF8F2] placeholder-[#FAF8F2]/50 focus:outline-none focus:border-[#C8693F] focus:bg-[#FAF8F2]/15 transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-1.5 p-2 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#FAF8F2]/10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF8F2]">
                Pooja Garden
              </span>
            </div>
            <p className="text-[#FAF8F2]/80 text-sm leading-relaxed">
              Where authentic flavors meet serene alpine nature. Savor fresh, chef-crafted delicacies and recharge in our peaceful boutique suites.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#FAF8F2]/10 hover:bg-[#C8693F] flex items-center justify-center text-[#FAF8F2] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#FAF8F2]/10 hover:bg-[#C8693F] flex items-center justify-center text-[#FAF8F2] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#FAF8F2]/10 hover:bg-[#C8693F] flex items-center justify-center text-[#FAF8F2] transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#FAF8F2] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF8F2]/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/restaurant" className="hover:text-white transition-colors">Our Restaurant</Link>
              </li>
              <li>
                <Link href="/lodge" className="hover:text-white transition-colors">Rooms & Suites</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition-colors">Full Food Menu</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">Resort Gallery</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Our Story & Heritage</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact & Directions</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#FAF8F2] mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-[#FAF8F2]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8693F] mt-1 shrink-0" />
                <span>Pooja Garden Highway Valley, Kasauli Hills, Himachal Pradesh 173204</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8693F] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8693F] shrink-0" />
                <a href="mailto:info@poojagarden.in" className="hover:text-white">info@poojagarden.in</a>
              </li>
            </ul>
          </div>

          {/* Hours & Dining Times */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#FAF8F2] mb-4">
              Timings
            </h4>
            <div className="space-y-2 text-xs text-[#FAF8F2]/85">
              <div className="flex justify-between py-1 border-b border-[#FAF8F2]/10">
                <span>Breakfast:</span>
                <span className="font-medium text-white">07:30 AM - 10:30 AM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FAF8F2]/10">
                <span>Lunch:</span>
                <span className="font-medium text-white">12:30 PM - 03:30 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FAF8F2]/10">
                <span>Hi-Tea & Snacks:</span>
                <span className="font-medium text-white">04:30 PM - 06:30 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FAF8F2]/10">
                <span>Dinner:</span>
                <span className="font-medium text-white">07:00 PM - 11:00 PM</span>
              </div>
              <div className="flex justify-between py-1 pt-2">
                <span>Lodge Front Desk:</span>
                <span className="font-medium text-[#FAF8F2]">24 Hours Open</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF8F2]/70 gap-4">
          <p>© 2026 Pooja Garden. All rights reserved.</p>
          <p className="italic font-serif tracking-wider text-[#FAF8F2]/90">
            Good Food • Clean Stays • Lasting Memories
          </p>
        </div>
      </div>
    </footer>
  );
}
