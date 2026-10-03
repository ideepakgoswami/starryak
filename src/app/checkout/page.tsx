"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Delhi NCR",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, shippingFee, total, clearCart } = useCart();

  // Form State
  const [fullName, setFullName] = useState("Deepak Verma");
  const [email, setEmail] = useState("deepak@example.com");
  const [phone, setPhone] = useState("9876543210");
  const [street, setStreet] = useState("Flat 402, Oakwood Greens, 100 Feet Road");
  const [city, setCity] = useState("Bengaluru");
  const [state, setState] = useState("Karnataka");
  const [pincode, setPincode] = useState("560038");

  // Payment Selection Placeholder
  const [paymentMethod, setPaymentMethod] = useState<
    "upi" | "card" | "netbanking" | "cod"
  >("upi");
  const [upiApp, setUpiApp] = useState("gpay");

  // Order Placement State
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate backend / payment verification (Razorpay placeholder)
    setTimeout(() => {
      const generatedId = `SAK-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setOrderConfirmed(true);
      clearCart();
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#75836C] border border-[#75836C]/40 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-[#B46036] font-semibold">
            Order Placed Successfully
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#221D1A] mt-1">
            Thank you for your order, {fullName.split(" ")[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-[#73675E] mt-2">
            Your candles are being hand-prepared and packed at our studio. A confirmation has been sent to <strong>{email}</strong>.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white p-6 rounded-xl border border-[#E6DED3] text-left max-w-md mx-auto shadow-xs space-y-4 text-xs">
          <div className="flex justify-between border-b border-[#F3ECE2] pb-3">
            <span className="text-[#73675E]">Order Number:</span>
            <span className="font-bold text-[#221D1A]">{orderId}</span>
          </div>

          <div className="flex justify-between border-b border-[#F3ECE2] pb-3">
            <span className="text-[#73675E]">Payment Method:</span>
            <span className="font-semibold text-[#221D1A] uppercase">
              {paymentMethod === "upi" ? `UPI (${upiApp.toUpperCase()})` : paymentMethod}
            </span>
          </div>

          <div className="flex justify-between border-b border-[#F3ECE2] pb-3">
            <span className="text-[#73675E]">Delivery Destination:</span>
            <span className="font-medium text-[#221D1A] text-right">
              {street}, {city}, {state} - {pincode}
            </span>
          </div>

          <div className="flex justify-between text-sm font-bold text-[#221D1A] pt-1">
            <span>Total Paid:</span>
            <span>₹{total}</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="bg-[#221D1A] hover:bg-[#3D332B] text-white px-7 py-3 rounded-md text-xs font-medium uppercase tracking-widest transition-colors"
          >
            Return to Home
          </Link>
          <Link
            href="/shop"
            className="bg-white hover:bg-[#FAF7F2] text-[#221D1A] border border-[#E6DED3] px-7 py-3 rounded-md text-xs font-medium uppercase tracking-widest transition-colors"
          >
            Explore More Scents
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-medium text-[#221D1A]">
          Your bag is empty
        </h2>
        <p className="text-xs text-[#73675E]">
          Please add a candle to your bag before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-[#221D1A] text-white px-6 py-2.5 rounded text-xs uppercase tracking-wider font-medium"
        >
          Browse Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Checkout Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#73675E] mb-1">
          <Lock className="w-3.5 h-3.5 text-[#75836C]" />
          <span>Encrypted 256-bit Secure Checkout</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#221D1A]">
          Checkout
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form: Details, Shipping & Payment */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Customer Information */}
          <div className="bg-white p-6 rounded-xl border border-[#E6DED3] shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F3ECE2] pb-3">
              <h2 className="font-serif text-lg font-medium text-[#221D1A]">
                1. Contact Information
              </h2>
              <span className="text-[10px] text-[#73675E] uppercase tracking-wider">
                India Mobile Required
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                  Phone (for Delivery SMS) *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-2.5 rounded-l bg-[#E6DED3]/50 border border-r-0 border-[#E6DED3] text-xs text-[#73675E]">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded-r px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                  Email Address (for order receipts &amp; tracking) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                />
              </div>
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="bg-white p-6 rounded-xl border border-[#E6DED3] shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F3ECE2] pb-3">
              <h2 className="font-serif text-lg font-medium text-[#221D1A]">
                2. Shipping Address
              </h2>
              <span className="text-[10px] text-[#73675E] uppercase tracking-wider">
                Pan-India Delivery
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                  Street Address &amp; House / Apartment No. *
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="House/Flat number, Building name, Street"
                  className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                    State / UT *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-[#FAF7F2] border border-[#E6DED3] rounded px-3 py-2 text-xs text-[#221D1A] focus:outline-hidden focus:border-[#B46036]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Payment Method Placeholder (Architecture prepared for Razorpay) */}
          <div className="bg-white p-6 rounded-xl border border-[#E6DED3] shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F3ECE2] pb-3">
              <div>
                <h2 className="font-serif text-lg font-medium text-[#221D1A]">
                  3. Payment Method
                </h2>
                <span className="text-[10px] text-[#B46036] uppercase tracking-wider font-semibold">
                  Prototype Mode (Zero Actual Charge)
                </span>
              </div>
              <span className="text-[10px] bg-[#FAF7F2] text-[#73675E] px-2 py-0.5 rounded border border-[#E6DED3]">
                Razorpay Ready
              </span>
            </div>

            <div className="space-y-3">
              {/* Option 1: UPI */}
              <label
                className={`p-4 rounded-lg border flex flex-col gap-3 cursor-pointer transition-all ${
                  paymentMethod === "upi"
                    ? "border-[#B46036] bg-[#FAF7F2]"
                    : "border-[#E6DED3] hover:border-[#D5C8B8]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="text-[#B46036] focus:ring-[#B46036]"
                    />
                    <span className="text-xs font-bold text-[#221D1A]">
                      UPI Instant (Google Pay, PhonePe, Paytm, QR)
                    </span>
                  </div>
                  <QrCode className="w-4 h-4 text-[#73675E]" />
                </div>

                {paymentMethod === "upi" && (
                  <div className="pl-6 pt-2 border-t border-[#E6DED3] flex items-center gap-3">
                    {["gpay", "phonepe", "paytm"].map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setUpiApp(app)}
                        className={`px-3 py-1.5 rounded text-[11px] font-semibold uppercase border transition-colors ${
                          upiApp === app
                            ? "bg-[#221D1A] text-white border-[#221D1A]"
                            : "bg-white text-[#73675E] border-[#E6DED3]"
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                )}
              </label>

              {/* Option 2: Cards */}
              <label
                className={`p-4 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-[#B46036] bg-[#FAF7F2]"
                    : "border-[#E6DED3] hover:border-[#D5C8B8]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="text-[#B46036] focus:ring-[#B46036]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#221D1A] block">
                      Credit / Debit Card
                    </span>
                    <span className="text-[10px] text-[#73675E]">
                      Visa, Mastercard, RuPay, Amex
                    </span>
                  </div>
                </div>
                <CreditCard className="w-4 h-4 text-[#73675E]" />
              </label>

              {/* Option 3: Net Banking */}
              <label
                className={`p-4 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === "netbanking"
                    ? "border-[#B46036] bg-[#FAF7F2]"
                    : "border-[#E6DED3] hover:border-[#D5C8B8]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "netbanking"}
                    onChange={() => setPaymentMethod("netbanking")}
                    className="text-[#B46036] focus:ring-[#B46036]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#221D1A] block">
                      Net Banking
                    </span>
                    <span className="text-[10px] text-[#73675E]">
                      HDFC, ICICI, SBI, Axis &amp; 50+ Indian banks
                    </span>
                  </div>
                </div>
                <Building className="w-4 h-4 text-[#73675E]" />
              </label>

              {/* Option 4: COD */}
              <label
                className={`p-4 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-[#B46036] bg-[#FAF7F2]"
                    : "border-[#E6DED3] hover:border-[#D5C8B8]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="text-[#B46036] focus:ring-[#B46036]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#221D1A] block">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[10px] text-[#73675E]">
                      Pay in cash upon doorstep delivery
                    </span>
                  </div>
                </div>
                <Banknote className="w-4 h-4 text-[#73675E]" />
              </label>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#E6DED3] shadow-xs space-y-5 sticky top-28">
            <h3 className="font-serif text-lg font-medium text-[#221D1A] pb-3 border-b border-[#F3ECE2]">
              Order Summary ({cart.length} item{cart.length > 1 ? "s" : ""})
            </h3>

            {/* Line items mini scroll */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <div className="relative w-12 h-12 rounded bg-[#F3ECE2] shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="50px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-semibold text-[#221D1A] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-[#73675E] block">
                      Qty: {item.quantity} • {item.variant.weight}
                    </span>
                    {(item.selectedColour || item.selectedFragrance) && (
                      <span className="text-[10px] text-[#73675E] block truncate">
                        {item.selectedColour && `Colour: ${item.selectedColour}`}
                        {item.selectedColour && item.selectedFragrance && " • "}
                        {item.selectedFragrance && `Scent: ${item.selectedFragrance}`}
                      </span>
                    )}
                    {item.personalization && (
                      <span className="text-[10px] text-[#B46036] italic truncate block">
                        Foil label for &quot;{item.personalization.name}&quot;
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-[#221D1A]">
                    ₹{item.totalPrice}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 pt-3 border-t border-[#F3ECE2] text-xs">
              <div className="flex justify-between text-[#73675E]">
                <span>Items Subtotal</span>
                <span className="text-[#221D1A] font-medium">₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-[#73675E]">
                <span>Shipping in India</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#75836C] font-semibold">FREE</span>
                  ) : (
                    <span>₹{shippingFee}</span>
                  )}
                </span>
              </div>

              <div className="flex justify-between text-[#73675E]">
                <span>GST / Taxes</span>
                <span className="text-[#221D1A]">Included</span>
              </div>

              <div className="pt-3 border-t border-[#F3ECE2] flex justify-between text-base font-bold text-[#221D1A]">
                <span>Total Due</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#B46036] hover:bg-[#9E502B] text-white py-3.5 rounded-md font-medium text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              {isProcessing ? (
                <span>Generating Order...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Place Order • ₹{total}</span>
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-[10px] text-[#8E8379]">
                * Prototype demonstration: No actual card or bank charges will be made.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
