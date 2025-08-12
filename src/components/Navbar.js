// src/components/Navbar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive ? "navlink underline" : "navlink";

  return (
    <>
      <header className="nav-shell">
        <nav className="nav-inner">
          {/* LEFT: Logo */}
          <div className="nav-left">
            <div className="logo-badge">M</div>
            <span className="brand">MemeCoin 2048</span>
          </div>

          {/* CENTER: Desktop links ONLY */}
          <div className="nav-center desktop-only">
            <NavLink to="/game" className={linkClass}>
              Game
            </NavLink>
            <NavLink to="/leaderboard" className={linkClass}>
              Leaderboard
            </NavLink>
          </div>

          {/* RIGHT: Desktop pills + Mobile burger */}
          <div className="nav-right">
            {/* Desktop-only buttons */}
            <a
              className="pill pill--purple desktop-only"
              href="https://hub.0g.ai/faucet"
              target="_blank"
              rel="noreferrer"
            >
              Faucet
            </a>

            {/* Web3Modal connect (desktop) */}
            <div className="desktop-only">
              <w3m-button balance="show" size="md"></w3m-button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="burger mobile-only"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="drawer" role="dialog" aria-modal="true">
          <div className="drawer-panel">
            <div className="drawer-head">
              <div className="logo-badge">M</div>
              <span className="brand">MemeCoin 2048</span>
              <button
                className="close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="drawer-links" onClick={() => setOpen(false)}>
              <NavLink to="/game" className="drawer-link">
                Game
              </NavLink>
              <a
                href="https://hub.0g.ai/faucet"
                target="_blank"
                rel="noreferrer"
                className="drawer-link"
              >
                Faucet
              </a>
              <NavLink to="/leaderboard" className="drawer-link">
                Leaderboard
              </NavLink>
            </div>

            {/* Connect Wallet inside menu */}
            <div className="drawer-btn">
              <w3m-button size="md"></w3m-button>
            </div>

            {/* Mobile footer lives inside drawer */}
            <div className="drawer-foot">
              <div className="drawer-socials">
                <a
                  href="https://x.com/Tunmzy234"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X / Twitter"
                >
                  <FaXTwitter size={20} />
                </a>
                <a
                  href="https://t.me/alphadropzone/150"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                >
                  <FaTelegramPlane size={20} />
                </a>
              </div>
              <div className="drawer-copy">
                © {new Date().getFullYear()} MemeCoin 2048
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
