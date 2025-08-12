import React from "react";

export default function Logo({ size = 22 }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      fontWeight: 800, color: "#14F195"
    }}>
      {/* Neon 0G-ish spark */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#14F195" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4" fill="#14F195"/>
      </svg>
      <span>MemeCoin 2048</span>
    </div>
  );
}
