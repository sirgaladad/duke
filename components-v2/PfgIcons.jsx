/* ============================================================
   PfgIcons — small consistent icon set for the redesigned app.
   24px, 1.75 stroke, currentColor. Uses simple geometric forms
   so they sit calmly next to the field-guide photography.
   ============================================================ */

(function(){
  const stroke = (props) => ({
    width: props.size || 22, height: props.size || 22,
    viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
    strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round"
  });

  const Signals = (p) => (
    <svg {...stroke(p)}>
      <path d="M4 14c2-3 5-3 7 0s5 3 7 0"/>
      <circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none"/>
      <path d="M3 18h18" opacity="0.5"/>
    </svg>
  );
  const Forecast = (p) => (
    <svg {...stroke(p)}>
      <path d="M6 16a3.5 3.5 0 1 1 1.4-6.7A5 5 0 0 1 17 11a3 3 0 1 1 .5 6H7"/>
      <path d="M9 20l-1 2M13 20l-1 2M17 20l-1 2" opacity="0.7"/>
    </svg>
  );
  const Technique = (p) => (
    <svg {...stroke(p)}>
      <path d="M4 4l8 9"/>
      <path d="M12 13c2 0 5-1 7 1"/>
      <path d="M19 14c1.2 1.2 1.2 3 0 4-1.5 1.5-4 .5-4-1.5"/>
      <path d="M3 4h2"/>
    </svg>
  );
  const Access = (p) => (
    <svg {...stroke(p)}>
      <path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/>
      <circle cx="12" cy="9" r="2.4"/>
    </svg>
  );
  const Game = (p) => (
    <svg {...stroke(p)}>
      <rect x="3.5" y="6.5" width="13" height="11" rx="2"/>
      <path d="M8 12h3M9.5 10.5v3"/>
      <circle cx="14" cy="10.5" r="0.9" fill="currentColor" stroke="none"/>
      <circle cx="15.5" cy="13" r="0.9" fill="currentColor" stroke="none"/>
      <path d="M17 8l3-1-1 3-3 1z"/>
    </svg>
  );
  const Profile = (p) => (
    <svg {...stroke(p)}>
      <circle cx="12" cy="8.5" r="3.5"/>
      <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/>
    </svg>
  );
  const Tackle = (p) => (
    <svg {...stroke(p)}>
      <path d="M4 9h16l-1.5 9.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 9z"/>
      <path d="M9 9V6.5A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5V9"/>
      <path d="M4 13h16" opacity="0.6"/>
    </svg>
  );
  const Species = (p) => (
    <svg {...stroke(p)}>
      <path d="M3 12c3-5 9-5 13-2l5-2-1.5 4 1.5 4-5-2c-4 3-10 3-13-2z"/>
      <circle cx="16" cy="11" r="0.9" fill="currentColor" stroke="none"/>
      <path d="M11 9.5c0 1.7-.7 3.7-2 5"/>
    </svg>
  );
  const Dock = (p) => (
    <svg {...stroke(p)}>
      <circle cx="8.5" cy="8.5" r="3"/>
      <circle cx="15.5" cy="8.5" r="3"/>
      <path d="M3 19c1-3 3-4.5 5.5-4.5S13 16 14 19"/>
      <path d="M11 19c1-3 3-4.5 5.5-4.5S20 16 21 19" opacity="0.7"/>
    </svg>
  );
  const Search = (p) => (
    <svg {...stroke(p)}>
      <circle cx="11" cy="11" r="6.5"/>
      <path d="M16 16l4 4"/>
    </svg>
  );
  const Bell = (p) => (
    <svg {...stroke(p)}>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2H4.5L6 16z"/>
      <path d="M10.5 20a1.5 1.5 0 0 0 3 0"/>
    </svg>
  );
  const Menu = (p) => (
    <svg {...stroke(p)}>
      <path d="M4 7h16M4 12h16M4 17h16"/>
    </svg>
  );
  const Close = (p) => (
    <svg {...stroke(p)}>
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>
  );
  const Chevron = (p) => (
    <svg {...stroke(p)}>
      <path d="M9 6l6 6-6 6"/>
    </svg>
  );
  const Plus = (p) => (
    <svg {...stroke(p)}>
      <path d="M12 5v14M5 12h14"/>
    </svg>
  );
  const Heart = (p) => (
    <svg {...stroke(p)}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>
    </svg>
  );
  const X = (p) => (
    <svg {...stroke(p)}>
      <path d="M7 7l10 10M17 7L7 17"/>
    </svg>
  );
  const Star = (p) => (
    <svg {...stroke(p)}>
      <path d="M12 4l2.4 5 5.6.8-4 4 1 5.6L12 16.7 6.9 19.4l1-5.6-4-4 5.6-.8z"/>
    </svg>
  );
  const Pin = (p) => (
    <svg {...stroke(p)}>
      <path d="M12 22s-7-7-7-13a7 7 0 0 1 14 0c0 6-7 13-7 13z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  );
  const Thermometer = (p) => (
    <svg {...stroke(p)}>
      <path d="M14 4a2 2 0 1 0-4 0v10.3a4 4 0 1 0 4 0z"/>
      <circle cx="12" cy="17" r="1.4" fill="currentColor" stroke="none"/>
    </svg>
  );
  const Wave = (p) => (
    <svg {...stroke(p)}>
      <path d="M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
      <path d="M3 13c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
      <path d="M3 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
    </svg>
  );
  const Moon = (p) => (
    <svg {...stroke(p)}>
      <path d="M20 14a8 8 0 1 1-10-10 6 6 0 0 0 10 10z"/>
    </svg>
  );
  const Sun = (p) => (
    <svg {...stroke(p)}>
      <circle cx="12" cy="12" r="3.5"/>
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>
    </svg>
  );
  const Logout = (p) => (
    <svg {...stroke(p)}>
      <path d="M14 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4"/>
      <path d="M10 8l-4 4 4 4M6 12h10"/>
    </svg>
  );
  const Settings = (p) => (
    <svg {...stroke(p)}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M19 12c0-.5 0-1-.1-1.5l2-1.5-2-3.4-2.4.8c-.7-.6-1.5-1-2.4-1.4L13.5 2h-3l-.6 2.5c-.9.3-1.7.8-2.4 1.4l-2.4-.8-2 3.4 2 1.5c-.1.5-.1 1-.1 1.5s0 1 .1 1.5l-2 1.5 2 3.4 2.4-.8c.7.6 1.5 1 2.4 1.4L10.5 22h3l.6-2.5c.9-.3 1.7-.8 2.4-1.4l2.4.8 2-3.4-2-1.5c.1-.5.1-1 .1-1.5z" opacity="0.5"/>
    </svg>
  );
  const Apple = (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.2-2.8.8-3.5.8-.7 0-1.9-.8-3.1-.8-1.6 0-3 .9-3.8 2.4-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2-.1 1.6-.8 3-.8 1.4 0 1.8.8 3.1.7 1.3 0 2.1-1.1 2.9-2.3.6-.8 1-1.7 1.3-2.6-.1 0-2.6-1-2.6-3.7zM14.4 5.5c.6-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.6 2.8-1.3z"/>
    </svg>
  );
  const Google = (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.3-.9 2.3-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"/>
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"/>
      <path fill="#FBBC04" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1A10 10 0 0 0 2 12c0 1.6.4 3.1 1.1 4.6L6.4 14z"/>
      <path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 2.9 14.7 2 12 2 8.1 2 4.7 4.2 3.1 7.4L6.4 10c.8-2.3 3-4.1 5.6-4.1z"/>
    </svg>
  );
  const Mail = (p) => (
    <svg {...stroke(p)}>
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="M4 7l8 6 8-6"/>
    </svg>
  );

  Object.assign(window, {
    PfgIcons: {
      Signals, Forecast, Technique, Access, Game,
      Profile, Tackle, Species, Dock,
      Search, Bell, Menu, Close, Chevron, Plus,
      Heart, X, Star, Pin, Thermometer, Wave, Moon, Sun,
      Logout, Settings, Apple, Google, Mail
    }
  });
})();
