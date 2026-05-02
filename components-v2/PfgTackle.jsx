/* ============================================================
   PfgTackle — Tackle Box screen.
   Tabs: Today (signal-matched) · Setups · Lures · Rods/Reels · Wishlist
   ============================================================ */

(function(){
  const I = window.PfgIcons;

  const SETUPS = [
    { id: 1, name: "Bull Shoals · Spring Browns",  rod: "9' 5wt Sage R8",  reel: "Lamson Liquid",   line: "5wt WF",       lure: "Egan's Headstand · #14", match: 92 },
    { id: 2, name: "Crooked Creek · Smallmouth",   rod: "7' MH baitcaster",reel: "Shimano SLX 150", line: "12 lb fluoro", lure: "Ned Rig · 3\" green pumpkin", match: 88 },
    { id: 3, name: "Beaver · White Bass run",      rod: "7' M spinning",   reel: "Stradic 3000",    line: "10 lb braid",  lure: "Sassy Shad · chrome",     match: 96 },
    { id: 4, name: "Conway · Catfish night",       rod: "7'6 H spinning",  reel: "Penn Pursuit IV", line: "30 lb mono",   lure: "Cut shad on circle hook", match: 71 },
    { id: 5, name: "Norfork · Trout midges",       rod: "9' 4wt",          reel: "Orvis Hydros",    line: "4wt WF",       lure: "Zebra midge #18 · black", match: 84 }
  ];

  const LURES = [
    { id:1, name:"Sassy Shad · chrome",   type:"swimbait",  color:"#cfd8dc", match: "GO", count: 8 },
    { id:2, name:"Ned Rig · grn pumpkin", type:"finesse",   color:"#5a7050", match: "GO", count: 12 },
    { id:3, name:"Spinnerbait · 3/8 wht", type:"reaction",  color:"#fff",    match: "GO", count: 4 },
    { id:4, name:"Zebra midge · #18",     type:"fly",       color:"#1a1a1a", match: "SCOUT", count: 24 },
    { id:5, name:"Chatterbait · perch",   type:"reaction",  color:"#d4a045", match: "SCOUT", count: 3 },
    { id:6, name:"Tube jig · brn/orange", type:"finesse",   color:"#7a4a2a", match: "GO", count: 9 },
    { id:7, name:"Topwater popper",       type:"topwater",  color:"#2a8a4a", match: "HOLD", count: 2 },
    { id:8, name:"Crawfish craw · red",   type:"finesse",   color:"#a83030", match: "SCOUT", count: 11 }
  ];

  const RODS = [
    { name: "Sage R8 9' 5wt",         spec: "Fast · trout dry/nymph",  uses: 42 },
    { name: "Shimano SLX 7' MH",      spec: "Baitcaster · jigs/T-rig", uses: 28 },
    { name: "G. Loomis NRX+ 7' M",    spec: "Spinning · finesse bass", uses: 36 },
    { name: "Penn Pursuit IV 7'6 H",  spec: "Heavy spin · catfish",    uses: 14 }
  ];

  function TackleScreen({ user, signal }) {
    const [tab, setTab] = React.useState("today");
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 1.6, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>YOUR KIT</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: -0.6, margin: "4px 0 0" }}>
              Tackle Box
            </h1>
          </div>
          <button style={{
            padding: "10px 14px", borderRadius: 8,
            background: "var(--pfg-accent)", color: "#0d1b2a",
            fontSize: 12, fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 6
          }}><I.Plus size={14}/> Add gear</button>
        </div>

        {/* tabs */}
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 18 }}>
          {[
            { id: "today",   label: "Today's picks", badge: "PFG" },
            { id: "setups",  label: "Setups", count: SETUPS.length },
            { id: "lures",   label: "Lures", count: LURES.length },
            { id: "rods",    label: "Rods + Reels", count: RODS.length },
            { id: "wish",    label: "Wishlist" }
          ].map(t => {
            const on = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "10px 14px", borderRadius: 0,
                background: "transparent", border: "none",
                borderBottom: `2px solid ${on ? "var(--pfg-accent)" : "transparent"}`,
                color: on ? "#fff" : "var(--pfg-fg-muted)",
                fontSize: 12, fontWeight: on ? 800 : 600,
                cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 6
              }}>
                {t.label}
                {t.count != null && <span style={{ fontSize: 10, color: "var(--pfg-fg-muted)" }}>{t.count}</span>}
                {t.badge && (
                  <span style={{
                    fontSize: 8, fontWeight: 800, letterSpacing: 0.5,
                    padding: "1px 5px", borderRadius: 3,
                    background: "var(--pfg-spawn)", color: "#fff"
                  }}>{t.badge}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* tab content */}
        {tab === "today" && <TodayPicks signal={signal}/>}
        {tab === "setups" && <SetupsList/>}
        {tab === "lures" && <LureGrid/>}
        {tab === "rods" && <RodList/>}
        {tab === "wish" && <Wishlist/>}
      </div>
    );
  }

  /* ---------- Today's picks ---------- */
  function TodayPicks({ signal }) {
    return (
      <div>
        <div style={{
          padding: "12px 16px", borderRadius: 10, marginBottom: 16,
          background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.25)",
          display: "flex", alignItems: "center", gap: 12
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "var(--pfg-go)", boxShadow: "0 0 10px var(--pfg-go)"
          }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "var(--pfg-go)" }}>
              GO FISH · 54.5°F · BARO RISING · WHITE BASS PEAK SPAWN
            </div>
            <div style={{ fontSize: 11, color: "var(--pfg-fg-muted)" }}>
              We re-ranked your tackle for today's conditions and target species.
            </div>
          </div>
        </div>

        <SectionTitle>TOP MATCHES FOR TODAY</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {SETUPS.slice(0,4).sort((a,b) => b.match - a.match).map(s => <SetupCard key={s.id} setup={s} compact/>)}
        </div>

        <SectionTitle style={{ marginTop: 20 }}>LURES MATCHING THIS SIGNAL</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {LURES.filter(l => l.match === "GO").map(l => <LureCard key={l.id} lure={l}/>)}
        </div>
      </div>
    );
  }

  function SetupsList() {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {SETUPS.map(s => <SetupCard key={s.id} setup={s}/>)}
      </div>
    );
  }

  function SetupCard({ setup, compact }) {
    return (
      <div style={{
        padding: 14, borderRadius: 10,
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
        position: "relative"
      }}>
        <div style={{
          position: "absolute", top: 12, right: 12,
          padding: "3px 7px", borderRadius: 4,
          background: setup.match >= 90 ? "var(--pfg-go)"
                     : setup.match >= 80 ? "rgba(76,175,80,0.18)"
                     : "rgba(255,255,255,0.06)",
          color: setup.match >= 90 ? "#0d1b2a" : "var(--pfg-fg-muted)",
          fontSize: 10, fontWeight: 800, fontFamily: "ui-monospace,monospace"
        }}>{setup.match}%</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: -0.2, paddingRight: 50 }}>
          {setup.name}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 4, marginTop: 10, fontSize: 10.5 }}>
          {[
            ["ROD", setup.rod], ["REEL", setup.reel], ["LINE", setup.line], ["LURE", setup.lure]
          ].map(([k,v]) => (
            <React.Fragment key={k}>
              <span style={{ color: "var(--pfg-fg-muted)", letterSpacing: 1, fontWeight: 700 }}>{k}</span>
              <span style={{ color: "#cfd8dc" }}>{v}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  function LureGrid() {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {LURES.map(l => <LureCard key={l.id} lure={l} large/>)}
      </div>
    );
  }

  function LureCard({ lure, large }) {
    const matchTone = lure.match === "GO" ? "var(--pfg-go)"
                    : lure.match === "SCOUT" ? "var(--pfg-scout)" : "var(--pfg-hold)";
    return (
      <div style={{
        padding: 12, borderRadius: 10,
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)"
      }}>
        <div style={{
          aspectRatio: "1.4",
          background: `radial-gradient(ellipse at center, ${lure.color}66, transparent 70%)`,
          borderRadius: 6, display: "grid", placeItems: "center",
          marginBottom: 8
        }}>
          {/* mini lure silhouette */}
          <svg width="60%" height="60%" viewBox="0 0 100 40">
            <ellipse cx="40" cy="20" rx="32" ry="11" fill={lure.color} opacity="0.9"/>
            <circle cx="60" cy="18" r="2" fill="#0d1b2a"/>
            <path d="M8 20 L0 12 L0 28 Z" fill={lure.color} opacity="0.6"/>
            <path d="M76 20 L86 14 M76 20 L86 26" stroke="#444" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#fff" }}>{lure.name}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <span style={{ fontSize: 9, color: "var(--pfg-fg-muted)", letterSpacing: 1, fontWeight: 700, textTransform: "uppercase" }}>
            {lure.type} · ×{lure.count}
          </span>
          <span style={{
            fontSize: 9, fontWeight: 800, letterSpacing: 0.6,
            padding: "2px 5px", borderRadius: 3,
            color: matchTone, border: `1px solid ${matchTone}66`
          }}>{lure.match}</span>
        </div>
      </div>
    );
  }

  function RodList() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {RODS.map(r => (
          <div key={r.name} style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: 14, borderRadius: 10,
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)"
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: 8,
              background: "rgba(0,188,212,0.10)",
              display: "grid", placeItems: "center", color: "var(--pfg-accent)"
            }}><I.Tackle size={22}/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{r.name}</div>
              <div style={{ fontSize: 11, color: "var(--pfg-fg-muted)" }}>{r.spec}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", fontFamily: "ui-monospace,monospace" }}>{r.uses}</div>
              <div style={{ fontSize: 9, letterSpacing: 1, color: "var(--pfg-fg-muted)", fontWeight: 700 }}>OUTINGS</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function Wishlist() {
    return (
      <div style={{
        padding: 24, borderRadius: 12,
        background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.12)",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🎣</div>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>Build a wishlist</div>
        <div style={{ fontSize: 11, color: "var(--pfg-fg-muted)", marginTop: 4, maxWidth: 380, margin: "4px auto 0" }}>
          Save lures, rods, and lines you're eyeing. We'll alert you when they go on sale at partner shops.
        </div>
        <button style={{
          marginTop: 14, padding: "9px 16px", borderRadius: 8,
          background: "var(--pfg-accent)", color: "#0d1b2a",
          fontSize: 12, fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit"
        }}>+ Add first item</button>
      </div>
    );
  }

  const SectionTitle = ({ children, style }) => (
    <div style={{ fontSize: 9, letterSpacing: 1.6, fontWeight: 800, color: "var(--pfg-fg-muted)", marginBottom: 10, ...style }}>
      {children}
    </div>
  );

  Object.assign(window, { PfgTackleScreen: TackleScreen });
})();
