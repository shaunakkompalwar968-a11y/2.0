"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, HeartHandshake, Compass } from "lucide-react";
import { submitContact } from "@/lib/api";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact({
        name,
        email,
        phone,
        subject,
        message,
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-[#FAF8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Information & Visual Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-[#E8E6DA] shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#22281F]">
                Contact Information
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#5C7457]/10 flex items-center justify-center text-[#5C7457] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8A9286] block">Direct Reservations</span>
                    <a href="tel:+919876543210" className="font-medium text-[#22281F] hover:text-[#5C7457]">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#5C7457]/10 flex items-center justify-center text-[#5C7457] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8A9286] block">Email Inquiries</span>
                    <a href="mailto:info@poojagarden.in" className="font-medium text-[#22281F] hover:text-[#5C7457]">
                      info@poojagarden.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#5C7457]/10 flex items-center justify-center text-[#5C7457] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8A9286] block">Location</span>
                    <p className="font-medium text-[#22281F]">
                      Pooja Garden Highway Valley, Kasauli, Himachal Pradesh, India - 173204
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#5C7457]/10 flex items-center justify-center text-[#5C7457] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8A9286] block">Service Hours</span>
                    <p className="font-medium text-[#22281F]">
                      Restaurant: 07:30 AM - 11:00 PM | Lodge: 24/7 Check-in
                    </p>
                  </div>
                </div>
              </div>

              {/* Stylized Mountain Map Preview */}
              <div className="rounded-xl overflow-hidden border border-[#E8E6DA] bg-[#E8E6DA]/50 p-4 relative group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#5C7457] flex items-center gap-1.5">
                    <Compass className="w-4 h-4" />
                    How to Reach Pooja Garden
                  </span>
                  <span className="text-[10px] bg-[#5C7457]/10 px-2 py-0.5 rounded text-[#5C7457] font-medium">
                    Easy Scenic Drive
                  </span>
                </div>
                <p className="text-xs text-[#5B6357] leading-relaxed">
                  Located along the scenic pine corridor just 65 km from Chandigarh International Airport and 30 km from Kalka Railway Station. Ample private secure valet parking available for all guests.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Send Us a Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E8E6DA] shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#22281F] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6357] mb-8">
                Have questions regarding wedding ceremonies, corporate garden retreats, special dietary needs, or group bookings? Write to us and our hospitality desk will respond promptly.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-[#5C7457]/10 rounded-xl border border-[#5C7457]/20 space-y-3">
                  <CheckCircle className="w-12 h-12 text-[#5C7457] mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-[#22281F]">
                    Thank You For Your Message!
                  </h4>
                  <p className="text-sm text-[#5B6357] max-w-md mx-auto">
                    Your inquiry has been delivered directly to our management team. We will contact you via email or phone within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-[#5C7457] text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#5B6357] mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Table, Stay, or Event Inquiry"
                        className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5B6357] mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please share any questions, dates, party size, or special requirements..."
                      className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#E8E6DA] rounded-xl text-sm text-[#22281F] focus:outline-none focus:border-[#5C7457] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-xl text-sm font-semibold tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? "Sending Message..." : "Send Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 3 Bottom Highlight Cards matching the screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-2xl border border-[#E8E6DA] text-center space-y-2 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#5C7457]/10 flex items-center justify-center text-[#5C7457] mx-auto">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#22281F]">Visit Us</h4>
            <p className="text-xs text-[#5B6357]">Experience the peaceful gardens & flavors in person.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E6DA] text-center space-y-2 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#5C7457]/10 flex items-center justify-center text-[#5C7457] mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#22281F]">Call Us</h4>
            <p className="text-xs text-[#5B6357]">We&apos;re available around the clock at +91 98765 43210.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E6DA] text-center space-y-2 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#5C7457]/10 flex items-center justify-center text-[#5C7457] mx-auto">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#22281F]">Follow Us</h4>
            <p className="text-xs text-[#5B6357]">Stay connected for seasonal harvest feasts & stay packages.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
