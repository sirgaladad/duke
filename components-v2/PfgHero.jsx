/* ============================================================
   PfgHero — three hero variations for the home/signals page.
   All three share the same input signal data; mounted via
   `variant` prop: "verdict", "card", "dashboard".
   ============================================================ */

(function(){
  const I = window.PfgIcons;

  /* ---------- shared bits ---------------------------------- */
  function NextWindowStrip({ user }) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px", borderRadius: 10,
        background: "rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.06)"
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: "rgba(0,188,212,0.14)",
          color: "var(--pfg-accent)",
          display: "grid", placeItems: "center"
        }}>🌅</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, letterSpacing: 1.4, fontWeight: 700, color: "var(--pfg-fg-muted)" }}>
            NEXT BEST WINDOW
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
            Tomorrow · 5:42–7:18 AM · Norfork Tailwater
          </div>
        </div>
        <button style={{
          fontSize: 11, fontWeight: 700, padding: "6px 10px",
          borderRadius: 6, background: "var(--pfg-accent)",
          color: "#0d1b2a", border: "none", cursor: "pointer"
        }}>Plan trip</button>
      </div>
    );
  }

  function Greeting({ user }) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Tight lines";
    if (!user) return null;
    return (
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 12, color: "var(--pfg-fg-muted)", fontWeight: 500 }}>
          {greeting}, {user.name.split(" ")[0]} · {user.homeWater}
        </div>
      </div>
    );
  }

  /* ---------- VARIANT A · Verdict-front ------------------- */
  const VERDICT_COLOR    = { GO: "var(--pfg-go)", SCOUT: "var(--pfg-scout)", HOLD: "var(--pfg-hold)" };
  const VERDICT_HEADLINE = { GO: "GO FISH.",      SCOUT: "SCOUT IT.",        HOLD: "HOLD OFF." };

  function HeroVerdict({ signal, user }) {
    const verdict = signal?.verdict || "GO";
    const verdictColor = VERDICT_COLOR[verdict] || VERDICT_COLOR.HOLD;
    return (
      <section style={{
        position: "relative",
        background: "linear-gradient(135deg, #0d2137 0%, #0a3d5c 50%, #0d4a5e 100%)",
        borderRadius: 16, overflow: "hidden",
        padding: "32px 36px",
        border: "1px solid rgba(255,255,255,0.06)"
      }}>
        {/* spawn-bar accent */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "var(--pfg-grad-spawn-bar)"
        }}/>
        <Greeting user={user}/>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 36, alignItems: "center" }}>
          {/* big verdict */}
          <div>
            <div style={{
              fontSize: 10, letterSpacing: 2, fontWeight: 700,
              color: "var(--pfg-accent)", opacity: 0.85, marginBottom: 8
            }}>
              ● LIVE · {signal?.waterTempF?.toFixed(1) || "54.5"}°F · BARO RISING
            </div>
            <div style={{
              fontSize: 96, lineHeight: 0.95, letterSpacing: -3,
              fontWeight: 800, color: verdictColor,
              textShadow: "0 0 40px rgba(76,175,80,0.35)"
            }}>
              {VERDICT_HEADLINE[verdict] || VERDICT_HEADLINE.HOLD}
            </div>
            <div style={{
              fontSize: 18, color: "#fff", fontWeight: 600,
              maxWidth: 520, marginTop: 10, lineHeight: 1.4
            }}>
              White bass are mid-spawn at Beaver. Crappie staging. Trout active in the
              tailwater. <span style={{ color: "var(--pfg-spawn)" }}>4 species</span> at peak right now.
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button style={ctaPrimary}>Open today's plan →</button>
              <button style={ctaSecondary}>See the math</button>
            </div>
          </div>

          {/* mini stat strip */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Stat label="WATER TEMP" value="54.5°" sub="↑ 1.2° vs 7d avg" tone="var(--pfg-accent)"/>
            <Stat label="FLOW" value="312 cfs" sub="below normal · clear" tone="#fff"/>
            <Stat label="MOON" value="Waxing" sub="68% · lunar +2" tone="var(--pfg-lunar)"/>
            <Stat label="BARO" value="30.18" sub="rising · stable" tone="var(--pfg-go)"/>
          </div>
        </div>
        <div style={{ marginTop: 22 }}>
          <NextWindowStrip user={user}/>
        </div>
      </section>
    );
  }

  function Stat({ label, value, sub, tone }) {
    return (
      <div style={{
        background: "rgba(0,0,0,0.32)", borderRadius: 10,
        padding: "14px 16px",
        border: "1px solid rgba(255,255,255,0.06)"
      }}>
        <div style={{ fontSize: 9, letterSpacing: 1.4, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>
          {label}
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: tone, fontFamily: "ui-monospace,monospace", marginTop: 4, lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: 10.5, color: "var(--pfg-fg-muted)", marginTop: 4 }}>{sub}</div>
      </div>
    );
  }

  /* ---------- VARIANT B · Card-of-the-day ----------------- */
  function HeroCard({ signal, user }) {
    return (
      <section style={{
        position: "relative",
        background: "linear-gradient(135deg, #0d2137 0%, #0a3d5c 70%)",
        borderRadius: 16, overflow: "hidden",
        padding: 32,
        border: "1px solid rgba(255,255,255,0.06)"
      }}>
        <Greeting user={user}/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 36, alignItems: "center" }}>
          <div>
            <div style={{
              fontSize: 10, letterSpacing: 2, fontWeight: 700,
              color: "var(--pfg-spawn)", marginBottom: 10
            }}>
              ● TODAY'S SPAWN CARD · APR 28
            </div>
            <h1 style={{
              fontSize: 56, lineHeight: 1, letterSpacing: -2,
              fontWeight: 800, color: "#fff", margin: 0
            }}>
              White Bass<br/>
              <span style={{ color: "var(--pfg-spawn)" }}>are running.</span>
            </h1>
            <p style={{
              fontSize: 16, color: "#cfd8dc", lineHeight: 1.5,
              maxWidth: 520, marginTop: 18
            }}>
              Peak spawning window opened yesterday at the Beaver Lake tributaries.
              Three days of GO FISH conditions ahead. The card below is yours to play —
              the same data the app's signal engine is using.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button style={ctaPrimary}>Open the card →</button>
              <button style={ctaSecondary}>See all 30 species</button>
            </div>
          </div>
          {/* Mini species card — real artwork, live data, actionable */}
          <SpeciesCardMini speciesId="white_bass" verdict="GO" temp="54.5°F" peakWindow={{ from: "05:42", to: "08:15" }}/>
        </div>
      </section>
    );
  }

  /* ============================================================
     SpeciesCardMini — LIVE card-of-the-day.
     Pulls real artwork + facts from window.SPECIES, runs a countdown
     to the bite window close, animates the water shimmer + bite bar,
     and surfaces a primary action so the card asks for a tap.
     ============================================================ */
  function SpeciesCardMini({ speciesId, verdict, temp, peakWindow }) {
    const sp = (window.SPECIES || []).find(s => s.id === speciesId) || {};
    const [hover, setHover] = React.useState(false);
    const [now, setNow] = React.useState(() => new Date());
    React.useEffect(() => {
      const id = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(id);
    }, []);

    // Build a synthetic "close" time today from peakWindow.to (HH:MM)
    const close = React.useMemo(() => {
      const d = new Date(now);
      const [h, m] = (peakWindow?.to || "08:15").split(":").map(Number);
      d.setHours(h, m, 0, 0);
      if (d <= now) d.setDate(d.getDate() + 1); // tomorrow's window if past
      return d;
    }, [peakWindow, now]);
    const msLeft = Math.max(0, close - now);
    const hh = Math.floor(msLeft / 3600000);
    const mm = Math.floor((msLeft % 3600000) / 60000);
    const ss = Math.floor((msLeft % 60000) / 1000);
    const countdown = `${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")}:${String(ss).padStart(2,"0")}`;

    // Bite-window bar: assume window opened at peakWindow.from (HH:MM) today.
    const open = React.useMemo(() => {
      const d = new Date(now);
      const [h, m] = (peakWindow?.from || "05:42").split(":").map(Number);
      d.setHours(h, m, 0, 0);
      return d;
    }, [peakWindow, now]);
    const total = Math.max(1, close - open);
    const elapsed = Math.min(total, Math.max(0, now - open));
    const pct = Math.round((elapsed / total) * 100);

    const r = sp.rarity || "Common";
    const bait = sp.baits?.[0] || "Spoon";

    return (
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          aspectRatio: "0.72",
          background: "linear-gradient(180deg, #1b2838 0%, #0d1b2a 100%)",
          borderRadius: 14,
          border: "2px solid var(--pfg-spawn)",
          boxShadow: hover
            ? "0 18px 60px rgba(255,107,53,0.45), 0 0 90px rgba(255,107,53,0.22)"
            : "0 12px 40px rgba(255,107,53,0.28), 0 0 60px rgba(255,107,53,0.14)",
          padding: 14, display: "flex", flexDirection: "column",
          position: "relative", overflow: "hidden",
          transform: hover ? "translateY(-3px) rotate(-0.4deg)" : "rotate(-1deg)",
          transition: "transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms"
        }}>
        {/* live shimmer water surface behind the fish */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(120deg, transparent 0%, rgba(0,188,212,0.10) 35%, rgba(255,107,53,0.10) 50%, rgba(0,188,212,0.10) 65%, transparent 100%)",
          backgroundSize: "260% 100%",
          animation: "pfgShimmer 6s linear infinite",
          pointerEvents: "none"
        }}/>
        <style>{`
          @keyframes pfgShimmer { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
          @keyframes pfgPulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.55; transform: scale(1.35); } }
          @keyframes pfgFishBob { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-3px) rotate(1deg); } }
        `}</style>

        {/* OPEN NOW badge with pulsing dot */}
        <div style={{
          position: "absolute", top: 10, right: 10, zIndex: 2,
          display: "flex", alignItems: "center", gap: 5,
          padding: "3px 8px", borderRadius: 4,
          background: "var(--pfg-go)", color: "#0d1b2a",
          fontSize: 10, fontWeight: 800, letterSpacing: 0.5
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#0d1b2a",
            animation: "pfgPulse 1.4s ease-in-out infinite"
          }}/>
          {verdict || "GO"} · OPEN
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 8, letterSpacing: 1.2, fontWeight: 800, color: "var(--pfg-spawn)" }}>
            ⚡ TODAY'S CARD · {r.toUpperCase()}
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginTop: 4, letterSpacing: -0.4 }}>
            {sp.name || "White Bass"}
          </div>
          <div style={{ fontSize: 9, fontStyle: "italic", color: "var(--pfg-fg-muted)" }}>
            {sp.latin || "Morone chrysops"}
          </div>
        </div>

        {/* REAL species art — bobbing gently above the water shimmer */}
        <div style={{
          flex: 1, display: "grid", placeItems: "center", margin: "8px 0",
          position: "relative", zIndex: 1,
          background: "radial-gradient(ellipse at center, rgba(255,107,53,0.22) 0%, transparent 60%)"
        }}>
          {sp.art ? (
            <img src={sp.art} alt={sp.name}
                 style={{
                   maxWidth: "94%", maxHeight: "100%", objectFit: "contain",
                   filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.45))",
                   animation: "pfgFishBob 4.5s ease-in-out infinite"
                 }}
                 onError={(e)=>{ e.currentTarget.style.display="none"; }}/>
          ) : (
            <svg width="160" height="80" viewBox="0 0 160 80" fill="none">
              <path d="M10 40c20-22 50-26 80-22 25 3 50 14 65 22-15 8-40 19-65 22-30 4-60 0-80-22z"
                    fill="#cfd8dc" opacity="0.18"/>
            </svg>
          )}
        </div>

        {/* Live bite-window bar with countdown */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, letterSpacing: 1, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>
            <span>BITE WINDOW</span>
            <span style={{ color: "var(--pfg-spawn)", fontFamily: "ui-monospace,monospace" }}>−{countdown}</span>
          </div>
          <div style={{ marginTop: 4, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <div style={{
              width: pct + "%", height: "100%",
              background: "linear-gradient(90deg, var(--pfg-go) 0%, var(--pfg-spawn) 100%)",
              transition: "width 1s linear"
            }}/>
          </div>
        </div>

        <div style={{
          position: "relative", zIndex: 1,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4,
          fontSize: 10, color: "#cfd8dc", marginBottom: 8
        }}>
          <div><span style={{ color: "var(--pfg-fg-muted)" }}>TEMP </span>{temp}</div>
          <div><span style={{ color: "var(--pfg-fg-muted)" }}>BAIT </span>{bait}</div>
          <div><span style={{ color: "var(--pfg-fg-muted)" }}>WHEN </span>Dawn</div>
          <div><span style={{ color: "var(--pfg-fg-muted)" }}>WHERE </span>Trib mouth</div>
        </div>

        {/* Primary action — the card asks for a tap */}
        <button style={{
          position: "relative", zIndex: 1,
          padding: "9px 12px", borderRadius: 8,
          background: "#fff", color: "#0d1b2a",
          fontSize: 11, fontWeight: 800, letterSpacing: 0.4,
          border: "none", cursor: "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6
        }}>
          Play this card →
        </button>
      </div>
    );
  }

  /* ---------- VARIANT C · Live Conditions Dashboard ------- */
  function HeroDashboard({ signal, user }) {
    return (
      <section style={{
        position: "relative",
        background: "#0d1b2a", borderRadius: 16, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)"
      }}>
        {/* top header strip */}
        <div style={{
          padding: "20px 28px 16px",
          background: "linear-gradient(180deg, rgba(0,188,212,0.08), transparent)",
          borderBottom: "1px solid rgba(255,255,255,0.05)"
        }}>
          <Greeting user={user}/>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, fontWeight: 700, color: "var(--pfg-accent)" }}>
                ● LIVE CONDITIONS · NORFORK TAILWATER · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: -1, marginTop: 4 }}>
                Three species at peak — fish them now.
              </div>
            </div>
            <div data-verdict-pill style={{
              padding: "6px 12px", borderRadius: 6,
              background: "var(--pfg-go)", color: "#0d1b2a",
              fontSize: 12, fontWeight: 800, letterSpacing: 0.6
            }}>● GO FISH</div>
          </div>
        </div>

        {/* metrics grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
          padding: "20px 28px",
          borderBottom: "1px solid rgba(255,255,255,0.05)"
        }}>
          <Metric icon={<I.Thermometer size={16}/>} label="WATER" value="54.5°F" tone="var(--pfg-accent)" delta="+1.2°"/>
          <Metric icon={<I.Wave size={16}/>} label="FLOW" value="312 cfs" tone="#fff" delta="−8%"/>
          <Metric label="BARO" value="30.18" tone="var(--pfg-go)" delta="rising"/>
          <Metric icon={<I.Moon size={16}/>} label="LUNAR" value="68%" tone="var(--pfg-lunar)" delta="+2 dial"/>
          <Metric icon={<I.Sun size={16}/>} label="WIND" value="6 mph" tone="#fff" delta="SW"/>
          <Metric label="VIZ" value="3.2 ft" tone="var(--pfg-accent)" delta="clear"/>
        </div>

        {/* spawn track */}
        <div style={{ padding: "20px 28px" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10
          }}>
            <div style={{ fontSize: 11, letterSpacing: 1.4, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>
              SPAWN TRACK · 12 SPECIES THIS WEEK
            </div>
            <div style={{ fontSize: 11, color: "var(--pfg-spawn)", fontWeight: 700 }}>
              ● 4 IN PEAK WINDOW
            </div>
          </div>
          <SpawnRow species="White Bass"      stage="peak"   day={4}/>
          <SpawnRow species="Crappie"         stage="peak"   day={3}/>
          <SpawnRow species="Walleye"         stage="post"   day={2}/>
          <SpawnRow species="Largemouth"      stage="pre"    day={1}/>
        </div>
      </section>
    );
  }

  function Metric({ icon, label, value, tone, delta }) {
    return (
      <div style={{ padding: "0 12px", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5,
                      fontSize: 9, letterSpacing: 1.4, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>
          {icon}{label}
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: tone, fontFamily: "ui-monospace,monospace", marginTop: 4 }}>
          {value}
        </div>
        <div style={{ fontSize: 10, color: "var(--pfg-fg-muted)" }}>{delta}</div>
      </div>
    );
  }

  function SpawnRow({ species, stage, day }) {
    const stageColors = {
      pre:  { fill: "var(--pfg-hold)",  label: "PRE-SPAWN" },
      peak: { fill: "var(--pfg-spawn)", label: "PEAK SPAWN" },
      post: { fill: "var(--pfg-scout)", label: "POST-SPAWN" }
    };
    const sc = stageColors[stage];
    return (
      <div style={{
        display: "grid", gridTemplateColumns: "140px 1fr 90px 60px",
        alignItems: "center", gap: 14, padding: "8px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)"
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{species}</div>
        <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", position: "relative" }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0,
            left: stage === "pre" ? "10%" : stage === "peak" ? "35%" : "70%",
            width: stage === "peak" ? "35%" : "20%",
            background: sc.fill, borderRadius: 3,
            boxShadow: stage === "peak" ? `0 0 10px ${sc.fill}` : "none"
          }}/>
        </div>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, color: sc.fill }}>{sc.label}</div>
        <div style={{ fontSize: 11, color: "var(--pfg-fg-muted)", textAlign: "right" }}>day {day}/7</div>
      </div>
    );
  }

  /* ---------- shared CTA styles ---------- */
  const ctaPrimary = {
    padding: "12px 18px", borderRadius: 8,
    background: "var(--pfg-accent)", color: "#0d1b2a",
    fontSize: 13, fontWeight: 800, letterSpacing: 0.3,
    border: "none", cursor: "pointer", fontFamily: "inherit"
  };
  const ctaSecondary = {
    padding: "12px 18px", borderRadius: 8,
    background: "transparent", color: "#cfd8dc",
    fontSize: 13, fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.14)", cursor: "pointer", fontFamily: "inherit"
  };

  Object.assign(window, {
    PfgHeroVerdict: HeroVerdict,
    PfgHeroCard: HeroCard,
    PfgHeroDashboard: HeroDashboard,
    PfgSpeciesCardMini: SpeciesCardMini
  });
})();
