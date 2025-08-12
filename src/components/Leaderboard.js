// src/components/Leaderboard.js
import React, { useEffect, useState } from "react";
import { getReadContract, CONTRACT_ADDRESS } from "../chain/contract";

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [season, setSeason] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const c = getReadContract();
        const s = await c.season();
        setSeason(Number(s));
        const top = await c.getTop(s);
        const formatted = top
          .filter(e => e.player !== "0x0000000000000000000000000000000000000000" && e.score > 0n)
          .map((e, i) => ({ rank: i + 1, player: e.player, score: Number(e.score) }));
        setRows(formatted);
      } catch (err) {
        console.warn("Leaderboard load failed:", err?.message || err);
      }
    })();
  }, []);

  return (
    <div style={{ width: "100%", marginTop: 16 }}>
      <h3 style={{ color: "#14F195" }}>🏆 Leaderboard — Season {season}</h3>
      {rows.length === 0 ? (
        <div style={{ opacity: 0.7 }}>No scores yet. Be the first!</div>
      ) : (
        <div style={{ border: "1px solid #14F19533", borderRadius: 12, overflow: "hidden" }}>
          {rows.map(r => (
            <div key={r.rank}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 120px",
                gap: 8,
                padding: "10px 14px",
                background: "rgba(20,241,149,0.05)",
                borderBottom: "1px solid #14F19522"
              }}>
              <div>#{r.rank}</div>
              <div style={{ fontFamily: "monospace" }}>
                {r.player.slice(0,6)}...{r.player.slice(-4)}
              </div>
              <div style={{ textAlign: "right", fontWeight: "bold" }}>{r.score}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
        Contract: {CONTRACT_ADDRESS.slice(0,6)}...{CONTRACT_ADDRESS.slice(-4)}
      </div>
    </div>
  );
}
