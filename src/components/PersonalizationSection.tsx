"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { PersonalizationConfig, PersonalizedData } from "@/types";

interface PersonalizationSectionProps {
  config: PersonalizationConfig;
  personalizationData: PersonalizedData | null;
  onUpdatePersonalization: (data: PersonalizedData | null) => void;
}

export default function PersonalizationSection({
  config,
  personalizationData,
  onUpdatePersonalization,
}: PersonalizationSectionProps) {
  const [isEnabled, setIsEnabled] = useState(personalizationData !== null);
  const [name, setName] = useState(personalizationData?.name || "");
  const [message, setMessage] = useState(personalizationData?.message || "");
  const [occasion, setOccasion] = useState(
    personalizationData?.occasion || config.occasionsList[0] || ""
  );

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    if (!checked) {
      onUpdatePersonalization(null);
    } else {
      onUpdatePersonalization({
        name,
        message,
        occasion,
      });
    }
  };

  const handleFieldChange = (
    updatedName: string,
    updatedMessage: string,
    updatedOccasion: string
  ) => {
    setName(updatedName);
    setMessage(updatedMessage);
    setOccasion(updatedOccasion);

    if (isEnabled) {
      onUpdatePersonalization({
        name: updatedName,
        message: updatedMessage,
        occasion: updatedOccasion,
      });
    }
  };

  return (
    <div
      id="personalize"
      className="p-5 rounded-lg border border-[#E6DED3] bg-[#FAF7F2]/80 space-y-4 transition-all"
    >
      {/* Header & Toggle */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B46036] shrink-0" />
          <div>
            <h4 className="font-serif text-base font-medium text-[#221D1A]">
              Make It Personal
            </h4>
            <p className="text-xs text-[#73675E]">
              Custom hand-foiled keepsake label with your words
            </p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => handleToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[#D5C8B8] peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B46036]" />
        </label>
      </div>

      {isEnabled && (
        <div className="space-y-4 pt-2 border-t border-[#E6DED3] animate-fade-in">
          {/* Fee notice */}
          <div className="text-xs bg-[#F3ECE2] text-[#221D1A] p-2.5 rounded flex items-center justify-between">
            <span className="font-medium">Personalization Fee:</span>
            <span className="font-bold text-[#B46036]">
              +₹{config.additionalPrice}
            </span>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            {/* Occasion Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#221D1A] mb-1">
                Occasion (Optional)
              </label>
              <select
                value={occasion}
                onChange={(e) =>
                  handleFieldChange(name, message, e.target.value)
                }
                className="w-full bg-white border border-[#E6DED3] text-xs text-[#221D1A] rounded px-3 py-2 focus:outline-hidden focus:border-[#B46036]"
              >
                {config.occasionsList.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            {/* Recipient Name */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#221D1A]">
                  {config.nameLabel}
                </label>
                <span className="text-[10px] text-[#73675E]">
                  {name.length}/{config.maxNameLength}
                </span>
              </div>
              <input
                type="text"
                maxLength={config.maxNameLength}
                value={name}
                onChange={(e) =>
                  handleFieldChange(e.target.value, message, occasion)
                }
                placeholder="e.g. Deepak or Priya & Kabir"
                className="w-full bg-white border border-[#E6DED3] text-xs text-[#221D1A] placeholder-[#8E8379] rounded px-3 py-2 focus:outline-hidden focus:border-[#B46036]"
              />
            </div>

            {/* Custom Message */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#221D1A]">
                  {config.messageLabel}
                </label>
                <span className="text-[10px] text-[#73675E]">
                  {message.length}/{config.maxMessageLength}
                </span>
              </div>
              <textarea
                rows={2}
                maxLength={config.maxMessageLength}
                value={message}
                onChange={(e) =>
                  handleFieldChange(name, e.target.value, occasion)
                }
                placeholder="e.g. May your year be as bright and warm as this flame."
                className="w-full bg-white border border-[#E6DED3] text-xs text-[#221D1A] placeholder-[#8E8379] rounded px-3 py-2 focus:outline-hidden focus:border-[#B46036] resize-none"
              />
            </div>
          </div>

          {/* Interactive Live Candle Label Preview */}
          <div className="bg-white rounded border border-[#E6DED3] p-4 text-center shadow-2xs">
            <span className="text-[10px] uppercase tracking-widest text-[#73675E] block mb-2 font-medium">
              Live Custom Label Preview
            </span>
            <div className="border border-dashed border-[#C29D57] rounded p-3 bg-[#FAF7F2] max-w-xs mx-auto">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#73675E] block">
                STARRY AK
              </span>
              <p className="font-serif text-sm font-semibold text-[#221D1A] mt-1">
                {name || "Your Name Here"}
              </p>
              {occasion && (
                <span className="text-[10px] tracking-wider text-[#B46036] uppercase font-medium block mt-0.5">
                  • {occasion} •
                </span>
              )}
              <p className="text-[11px] text-[#73675E] italic mt-1 leading-snug">
                “{message || "Your custom message will appear here"}”
              </p>
              <span className="text-[8px] tracking-widest text-[#8E8379] block mt-1 uppercase">
                Hand-Poured Soy Wax • India
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#75836C]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Label will be printed exactly as previewed above</span>
          </div>
        </div>
      )}
    </div>
  );
}
