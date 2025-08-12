import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="left">© {new Date().getFullYear()} MemeCoin 2048</div>
        <div className="right">
          <a
            href="https://x.com/Tunmzy234"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X / Twitter"
            className="icon-link"
            title="@Tunmzy234 on X"
          >
            <FaXTwitter size={18} />
          </a>
          <a
            href="https://t.me/alphadropzone/150"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="icon-link"
            title="Alpha Drop Zone on Telegram"
          >
            <FaTelegramPlane size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
