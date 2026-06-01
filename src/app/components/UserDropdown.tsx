'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  const menuItems = [
    { label: 'My Account', href: '/account' },
    { label: 'Orders',     href: '/account/orders' },
    { label: 'Favorites',  href: '/account/favorites' },
    { label: 'Rewards',    href: '/account/rewards' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

        .ud-trigger {
          display: flex;
          align-items: center;
          gap: 7px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.2s;
        }

        .ud-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d89a5b, #c4813f);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #1a0e0a;
          flex-shrink: 0;
          box-shadow: 0 2px 10px rgba(216,154,91,0.35);
          transition: box-shadow 0.2s;
        }

        .ud-trigger:hover .ud-avatar {
          box-shadow: 0 4px 16px rgba(216,154,91,0.5);
        }

        .ud-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(250,240,228,0.84);
          transition: color 0.2s;
        }

        .ud-trigger:hover .ud-name {
          color: #d89a5b;
        }

        .ud-chevron {
          color: rgba(216,154,91,0.6);
          font-size: 9px;
          transition: transform 0.25s ease, color 0.2s;
        }

        .ud-chevron.open {
          transform: rotate(180deg);
          color: #d89a5b;
        }

        .ud-menu {
          position: absolute;
          top: calc(100% + 14px);
          right: 0;
          width: 195px;
          background: rgba(26,14,10,0.97);
          border: 1px solid rgba(216,154,91,0.18);
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.45);
          backdrop-filter: blur(16px);
          padding: 10px 0;
          z-index: 150;
          animation: udDrop 0.2s ease;
          overflow: hidden;
        }

        @keyframes udDrop {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ud-menu-item {
          display: block;
          padding: 11px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: rgba(250,240,228,0.65);
          text-decoration: none;
          transition: all 0.18s;
        }

        .ud-menu-item:hover {
          background: rgba(216,154,91,0.08);
          color: #d89a5b;
          padding-left: 26px;
        }

        .ud-separator {
          height: 1px;
          background: rgba(216,154,91,0.1);
          margin: 8px 0;
        }

        .ud-logout {
          width: 100%;
          padding: 11px 20px;
          background: none;
          border: none;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: rgba(250,100,100,0.7);
          cursor: pointer;
          transition: all 0.18s;
          display: block;
        }

        .ud-logout:hover {
          background: rgba(255,80,80,0.06);
          color: rgba(255,100,100,0.95);
          padding-left: 26px;
        }
      `}</style>

      <div ref={ref} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <button
          className="ud-trigger"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={`${user.firstName}'s account menu`}
        >
          <span className="ud-avatar">
            {user.firstName.charAt(0).toUpperCase()}
          </span>
          <span className="ud-name">{user.firstName}</span>
          <svg
            className={`ud-chevron${open ? ' open' : ''}`}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="currentColor"
          >
            <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </button>

        {open && (
          <div className="ud-menu" role="menu">
            {/* User greeting */}
            <div style={{
              padding: '12px 20px 10px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'rgba(250,240,228,0.35)',
              textTransform: 'uppercase',
              borderBottom: '1px solid rgba(216,154,91,0.1)',
              marginBottom: '6px',
            }}>
              {user.firstName} {user.lastName}
            </div>

            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="ud-menu-item"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="ud-separator" />

            <button
              className="ud-logout"
              role="menuitem"
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
