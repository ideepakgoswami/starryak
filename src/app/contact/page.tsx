"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Order Inquiry");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <section className="bg-linear-to-b from-[#F3ECE2] to-[#FAF7F2] py-14 sm:py-20 border-b border-[#E6DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B46036] font-semibold bg-white px-3.5 py-1.5 rounded-full border border-[#E6DED3] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>We&apos;re Here to Help</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-[#221D1A] font-medium tracking-tight">
            Connect With Our Studio
          </h1>

          <p className="text-base text-[#73675E] mt-3">
            Have a question about an order, fragrance notes, or bespoke wedding favors? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-medium text-[#221D1A]">
                Studio Details
              </h2>
              <p className="text-xs text-[#73675E] mt-1">
                Reach us through any of our direct atelier communication channels.
              </p>
            </div>

            <div className="space-y-4">
              {/* WhatsApp direct */}
              <div className="p-5 rounded-lg bg-white border border-[#E6DED3] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-[#221D1A]">
                    <MessageSquare className="w-4 h-4 text-emerald-700" />
                    <span>WhatsApp Concierge</span>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                    Fastest
                  </span>
                </div>
                <p className="text-xs text-[#73675E]">
                  Chat with our candle makers directly for scent recommendations or quick order updates.
                </p>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B46036] hover:underline pt-1"
                >
                  <span>Chat +91 98765 43210</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>

              {/* Email */}
              <div className="p-5 rounded-lg bg-white border border-[#E6DED3] shadow-2xs space-y-2">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#221D1A]">
                  <Mail className="w-4 h-4 text-[#B46036]" />
                  <span>Email Support</span>
                </div>
                <p className="text-xs text-[#73675E]">
                  For press inquiries, corporate collaborations, and general customer care.
                </p>
                <a
                  href="mailto:concierge@starryak.in"
                  className="inline-block text-xs font-semibold text-[#221D1A] hover:text-[#B46036]"
                >
                  concierge@starryak.in
                </a>
              </div>

              {/* Studio location */}
              <div className="p-5 rounded-lg bg-white border border-[#E6DED3] shadow-2xs space-y-2">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#221D1A]">
                  <MapPin className="w-4 h-4 text-[#B46036]" />
                  <span>Atelier &amp; Fulfillment</span>
                </div>
                <p className="text-xs text-[#73675E] leading-relaxed">
                  Starry AK Candle Studio<br />
                  Indiranagar, 12th Main Road<br />
                  Bengaluru, Karnataka 560038, India
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[#8E8379] pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Mon – Sat: 10:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E6DED3] text-xs text-[#73675E]">
              Looking for quick answers? Browse our{" "}
              <Link href="/faq" className="text-[#B46036] font-medium underline">
                Frequently Asked Questions
              </Link>{" "}
              covering shipping times, candle care, and bulk orders.
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E6DED3] shadow-md">
              {sent ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-[#FAF7F2] text-[#75836C] border border-[#75836C]/40 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-[#221D1A]">
                    Message Sent
                  </h3>
                  <p className="text-xs sm:text-sm text-[#73675E] max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out, <strong className="text-[#221D1A]">{name}</strong>. A member of our concierge team will respond to <strong>{email}</strong> within 12–24 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="text-xs font-semibold text-[#B46036] uppercase tracking-wider hover:underline pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#221D1A]">
                      Send Us a Note
                    </h3>
                    <p className="text-xs text-[#73675E] mt-0.5">
                      Fill out the form below and we will get back to you promptly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Priya Sharma"
                        className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="priya@example.com"
                        className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                        Subject
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                      >
                        <option value="Order Inquiry">Order Inquiry &amp; Tracking</option>
                        <option value="Fragrance Advice">Fragrance Advice / Selection</option>
                        <option value="Personalized Gifting">Personalized Gifting Help</option>
                        <option value="Corporate / Bulk Order">Corporate / Bulk Order Inquiry</option>
                        <option value="Feedback / Other">Feedback / Other Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can our candle makers assist you today?"
                      className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#221D1A] hover:bg-[#3D332B] text-white py-3 rounded-md font-medium text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
