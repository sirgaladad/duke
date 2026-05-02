/* ============================================================
   PfgShell — the redesigned navigation chrome.
   Two side-nav variations exposed via a `navVariant` prop:
     "drawer"  — slide-in right drawer, dense organized rail
     "rail"    — persistent left rail with icons + labels (desktop)

   Top bar holds: brand · Signals · Forecast · Technique · Access ·
                  Pocket Fishing the Game · search · bell · You menu

   The shell is presentational. It receives:
     - user (or null for logged-out state)
     - currentRoute, onRoute(routeId)
     - signal (live PFG signal)
     - navVariant
   ============================================================ */

(function(){
  const I = window.PfgIcons;

  /* primary nav (top-level information architecture) */
  const PRIMARY = [
    { id: "signals",   label: "Signals",   icon: I.Signals,   sub: "Today's verdict" },
    { id: "forecast",  label: "Forecast",  icon: I.Forecast,  sub: "7-day window" },
    { id: "technique", label: "Technique", icon: I.Technique, sub: "How to fish it" },
    { id: "access",    label: "Access",    icon: I.Access,    sub: "Where to launch" },
    { id: "game",      label: "Pocket Fishing the Game", icon: I.Game, sub: "Card game · NEW", isNew: true }
  ];

  /* "You" menu — logged-in surfaces */
  const YOU = [
    { id: "profile",  label: "My Profile",   icon: I.Profile, sub: "PRs · home water · share card" },
    { id: "tackle",   label: "Tackle Box",   icon: I.Tackle,  sub: "Setups · lures · today's picks" },
    { id: "species",  label: "Species",      icon: I.Species, sub: "Field guide · binder · 30 cards" },
    { id: "dock",     label: "The Dock",     icon: I.Dock,    sub: "Find anglers · guides · trips", isNew: true }
  ];

  window.PFG_NAV = { PRIMARY, YOU };

  /* ---------- TopBar ------------------------------------------ */
  function TopBar({ user, currentRoute, onRoute, signal, onMenu, onSignIn, dense }) {
    const verdict = signal?.verdict || "GO";
    const verdictColor = verdict === "GO" ? "var(--pfg-go)"
                       : verdict === "SCOUT" ? "var(--pfg-scout)"
                       : "var(--pfg-hold)";
    const headerH = dense ? 56 : 64;
    // Publish header height so SideRail (and anything else sticky) can pin
    // flush to the bar regardless of dense vs. regular mode.
    React.useEffect(() => {
      document.documentElement.style.setProperty("--pfg-topbar-h", headerH + "px");
    }, [headerH]);
    return (
      <header style={{
        position: "sticky", top: 0, zIndex: 40,
        height: headerH,
        display: "flex", alignItems: "center",
        padding: "0 22px",
        background: "rgba(13,27,42,0.85)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}>
        {/* Brand */}
        <button onClick={() => onRoute("home")} style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "none", border: "none", cursor: "pointer",
          padding: "6px 0", marginRight: 28
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "linear-gradient(135deg, var(--pfg-accent), #0097a7)",
            display: "grid", placeItems: "center",
            boxShadow: "0 2px 8px rgba(0,188,212,0.4)"
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d1b2a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12c3-5 9-5 13-2l5-2-1.5 4 1.5 4-5-2c-4 3-10 3-13-2z"/>
              <circle cx="16" cy="11" r="0.9" fill="#0d1b2a" stroke="none"/>
            </svg>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{
              fontSize: 9, letterSpacing: 1.6, fontWeight: 700,
              color: "var(--pfg-accent)", opacity: 0.75, lineHeight: 1
            }}>POCKET FISHING GUIDE</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: -0.3, lineHeight: 1.2 }}>
              Arkansas
            </div>
          </div>
        </button>

        {/* Primary nav (desktop) */}
        <nav style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          {PRIMARY.map(item => {
            const active = currentRoute === item.id;
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => onRoute(item.id)} style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "8px 12px", borderRadius: 8,
                background: active ? "rgba(0,188,212,0.12)" : "transparent",
                border: "none", cursor: "pointer",
                color: active ? "var(--pfg-accent)" : "#cfd8dc",
                fontSize: 13, fontWeight: active ? 700 : 500,
                fontFamily: "inherit", position: "relative",
                transition: "background 120ms"
              }}>
                <Icon size={16}/>
                <span>{item.label}</span>
                {item.isNew && (
                  <span style={{
                    fontSize: 8, fontWeight: 800, letterSpacing: 0.8,
                    background: "var(--pfg-spawn)", color: "#fff",
                    padding: "2px 5px", borderRadius: 3, marginLeft: 2
                  }}>NEW</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Live verdict pill */}
        <button data-verdict-pill onClick={() => onRoute("signals")} style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "6px 12px 6px 8px", borderRadius: 999,
          background: "rgba(0,0,0,0.3)",
          border: `1.5px solid ${verdictColor}`,
          cursor: "pointer", marginRight: 14
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: verdictColor,
            boxShadow: `0 0 8px ${verdictColor}`,
            animation: "pfg-pulse 1.6s ease-in-out infinite"
          }}/>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.8, color: verdictColor }}>
            {verdict}
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#cfd8dc" }}>
            {signal?.waterTempF?.toFixed(1) || "54.5"}°F
          </span>
        </button>

        {/* Search · Bell · User */}
        <button title="Search" style={iconBtn}><I.Search size={18}/></button>
        {user && (
          <button title="Notifications" style={{ ...iconBtn, position: "relative" }}>
            <I.Bell size={18}/>
            <span style={{
              position: "absolute", top: 8, right: 8,
              width: 7, height: 7, borderRadius: "50%",
              background: "var(--pfg-spawn)"
            }}/>
          </button>
        )}

        {user
          ? <UserChip user={user} onMenu={onMenu}/>
          : <button onClick={onSignIn} style={{
              padding: "8px 16px", borderRadius: 8,
              background: "var(--pfg-accent)", color: "#0d1b2a",
              fontSize: 12, fontWeight: 800, letterSpacing: 0.3,
              border: "none", cursor: "pointer", marginLeft: 8,
              fontFamily: "inherit"
            }}>Sign in</button>
        }
      </header>
    );
  }

  const iconBtn = {
    width: 36, height: 36, borderRadius: 8,
    background: "transparent", border: "none", cursor: "pointer",
    color: "#cfd8dc", display: "grid", placeItems: "center"
  };

  function UserChip({ user, onMenu }) {
    return (
      <button onClick={onMenu} style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "4px 10px 4px 4px", borderRadius: 999,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        cursor: "pointer", fontFamily: "inherit"
      }}>
        <Avatar user={user} size={28}/>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{user.handle}</span>
        <window.PfgIcons.Chevron size={14}/>
      </button>
    );
  }

  function Avatar({ user, size = 32, ring }) {
    const initials = (user.name || user.handle || "?")
      .replace(/^@/, "").split(/[\s_]/).filter(Boolean).map(s => s[0]).slice(0,2).join("").toUpperCase();
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: `linear-gradient(135deg, ${user.color || "#00bcd4"}, ${user.color2 || "#0097a7"})`,
        display: "grid", placeItems: "center",
        fontSize: size * 0.36, fontWeight: 800, color: "#0d1b2a",
        boxShadow: ring ? `0 0 0 3px ${ring}` : "none",
        flexShrink: 0
      }}>{initials}</div>
    );
  }
  window.PfgAvatar = Avatar;

  /* ---------- Side drawer (variant: "drawer") --------------- */
  function SideDrawer({ open, onClose, user, currentRoute, onRoute, onSignOut }) {
    if (!open) return null;
    return (
      <>
        <div onClick={onClose} style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(8,16,26,0.55)", backdropFilter: "blur(2px)"
        }}/>
        <aside style={{
          position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 51,
          width: 380, background: "#0f2235",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "-12px 0 40px rgba(0,0,0,0.4)",
          display: "flex", flexDirection: "column",
          animation: "pfgSlideInRight 220ms ease-out"
        }}>
          {/* drawer header — user card */}
          <div style={{ padding: "20px 22px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 9, letterSpacing: 1.6, fontWeight: 700, color: "var(--pfg-accent)" }}>
                YOUR ANGLER
              </div>
              <button onClick={onClose} style={{ ...iconBtn, width: 32, height: 32 }}><I.Close size={16}/></button>
            </div>
            {user ? (
              <button onClick={() => { onRoute("profile"); onClose(); }} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10, padding: "10px 12px",
                cursor: "pointer", textAlign: "left", fontFamily: "inherit"
              }}>
                <Avatar user={user} size={42}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{user.name}</div>
                  <div style={{ fontSize: 11, color: "var(--pfg-accent)", fontWeight: 600 }}>{user.handle}</div>
                  <div style={{ fontSize: 10, color: "var(--pfg-fg-muted)", marginTop: 2 }}>
                    {user.homeWater}
                  </div>
                </div>
                <I.Chevron size={16}/>
              </button>
            ) : null}
          </div>

          {/* drawer body — sectioned nav */}
          <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px" }}>
            <DrawerSection title="Browse" items={PRIMARY} currentRoute={currentRoute}
                           onPick={(id) => { onRoute(id); onClose(); }}/>
            <div style={{ height: 18 }}/>
            <DrawerSection title="You" items={YOU} currentRoute={currentRoute}
                           onPick={(id) => { onRoute(id); onClose(); }}/>
          </div>

          {/* drawer footer */}
          <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.06)",
                        display: "flex", gap: 8 }}>
            <button style={drawerFooterBtn}><I.Settings size={15}/> Settings</button>
            <button onClick={onSignOut} style={drawerFooterBtn}><I.Logout size={15}/> Sign out</button>
          </div>
        </aside>
      </>
    );
  }

  const drawerFooterBtn = {
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
    padding: "10px 12px", borderRadius: 8,
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
    color: "#cfd8dc", fontSize: 12, fontWeight: 600,
    cursor: "pointer", fontFamily: "inherit"
  };

  function DrawerSection({ title, items, currentRoute, onPick }) {
    return (
      <div>
        <div style={{
          fontSize: 9, letterSpacing: 1.8, fontWeight: 800,
          color: "var(--pfg-fg-muted)", padding: "0 10px 10px"
        }}>{title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map(item => {
            const active = currentRoute === item.id;
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => onPick(item.id)} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 8,
                background: active ? "rgba(0,188,212,0.10)" : "transparent",
                border: "none", cursor: "pointer", textAlign: "left",
                fontFamily: "inherit"
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: active ? "rgba(0,188,212,0.18)" : "rgba(255,255,255,0.04)",
                  display: "grid", placeItems: "center",
                  color: active ? "var(--pfg-accent)" : "#cfd8dc"
                }}><Icon size={18}/></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: active ? "#fff" : "#e0e6ed" }}>
                      {item.label}
                    </span>
                    {item.isNew && (
                      <span style={{
                        fontSize: 8, fontWeight: 800, letterSpacing: 0.8,
                        background: "var(--pfg-spawn)", color: "#fff",
                        padding: "1px 4px", borderRadius: 3
                      }}>NEW</span>
                    )}
                  </div>
                  <div style={{ fontSize: 10.5, color: "var(--pfg-fg-muted)", marginTop: 1 }}>
                    {item.sub}
                  </div>
                </div>
                {active && <span style={{ width: 4, height: 22, borderRadius: 2, background: "var(--pfg-accent)" }}/>}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---------- Side rail (variant: "rail") ------------------- */
  function SideRail({ user, currentRoute, onRoute, expanded, onToggle }) {
    const w = expanded ? 220 : 68;
    return (
      <aside style={{
        width: w, flexShrink: 0,
        background: "#0a1726", borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column",
        transition: "width 220ms ease",
        position: "sticky", top: "var(--pfg-topbar-h, 64px)",
        height: "calc(100vh - var(--pfg-topbar-h, 64px))",
        overflow: "hidden"
      }}>
        <div style={{ padding: "14px 14px 6px" }}>
          <button onClick={onToggle} style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: expanded ? "space-between" : "center",
            padding: "8px 10px", borderRadius: 8,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "#cfd8dc", cursor: "pointer", fontFamily: "inherit"
          }}>
            <I.Menu size={16}/>
            {expanded && <span style={{ fontSize: 11, fontWeight: 700 }}>Collapse</span>}
          </button>
        </div>

        <RailSection title="Browse" items={PRIMARY} currentRoute={currentRoute}
                     onPick={onRoute} expanded={expanded}/>
        <RailSection title="You" items={YOU} currentRoute={currentRoute}
                     onPick={onRoute} expanded={expanded}/>

        <div style={{ marginTop: "auto", padding: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {user && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "6px", borderRadius: 8,
              background: "rgba(255,255,255,0.03)"
            }}>
              <Avatar user={user} size={32}/>
              {expanded && (
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
                  <div style={{ fontSize: 10, color: "var(--pfg-accent)" }}>{user.handle}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    );
  }

  function RailSection({ title, items, currentRoute, onPick, expanded }) {
    return (
      <div style={{ padding: "10px 10px" }}>
        {expanded && (
          <div style={{
            fontSize: 9, letterSpacing: 1.6, fontWeight: 800,
            color: "var(--pfg-fg-muted)", padding: "8px 8px 6px"
          }}>{title.toUpperCase()}</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map(item => {
            const active = currentRoute === item.id;
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => onPick(item.id)} title={item.label} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: expanded ? "9px 10px" : "10px",
                justifyContent: expanded ? "flex-start" : "center",
                borderRadius: 8,
                background: active ? "rgba(0,188,212,0.14)" : "transparent",
                color: active ? "var(--pfg-accent)" : "#cfd8dc",
                border: "none", cursor: "pointer", textAlign: "left",
                fontFamily: "inherit", position: "relative"
              }}>
                <Icon size={18}/>
                {expanded && (
                  <span style={{ flex: 1, fontSize: 13, fontWeight: active ? 700 : 500, whiteSpace: "nowrap" }}>
                    {item.label}
                  </span>
                )}
                {item.isNew && expanded && (
                  <span style={{
                    fontSize: 8, fontWeight: 800,
                    background: "var(--pfg-spawn)", color: "#fff",
                    padding: "1px 4px", borderRadius: 3
                  }}>NEW</span>
                )}
                {item.isNew && !expanded && (
                  <span style={{
                    position: "absolute", top: 6, right: 6,
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--pfg-spawn)"
                  }}/>
                )}
                {active && expanded && <span style={{ width: 3, height: 18, borderRadius: 2, background: "var(--pfg-accent)" }}/>}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  Object.assign(window, {
    PfgTopBar: TopBar,
    PfgSideDrawer: SideDrawer,
    PfgSideRail: SideRail
  });
})();
