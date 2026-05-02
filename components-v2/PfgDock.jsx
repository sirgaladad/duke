/* ============================================================
   PfgDock V1.5 — "The Dock" as a Live Moment, not a profile feed.
   - Stories rail (Snapchat-layer)
   - Near You / Hot Right Now strip
   - Live Moment Card (conditions-led)
   - 3-strong-matches Compare gate + Compare view
   - Right rail: Trips · Active Matches · Live Dock Feed
   - Match toast: "Trip Potential"
   ============================================================ */

(function(){
  const I = window.PfgIcons;

  const CARDS = [
    { id:1, type:"guide", name:"Capt. Jay Linden", handle:"@redneck_jay", rate:"$285/day",
      lake:"Bull Shoals", style:"Live shad trolling · Striper focus",
      tagline: "Striper bite is ON",
      conditions: { flow: "Ideal ↑", pressure: "Stable", verdict: "HOT" },
      launch: "6:00 AM · Beaver Ramp",
      cred: ["⭐ Top 5% Guide", "12 yrs experience", "22' Triton"],
      slots: "2 slots left this week",
      distance: 4.2, window: "2 hr peak window",
      color:"#4caf50", color2:"#2e7d32",
      days:"Most weekdays", boat:"22' Triton" },
    { id:2, type:"angler", name:"Kate Reyes", handle:"@bayou_kate", age:31,
      lake:"Lake Conway",
      tagline: "Catfish bite peaks at 11pm",
      conditions: { flow: "Steady", pressure: "Falling", verdict: "NIGHT" },
      launch: "10:30 PM · Conway Pier",
      style:"Trotlines · cut shad · circle hooks",
      cred: ["7.4 lb blue cat PR", "5 yrs night fishing"],
      slots: "Looking for partner this Friday",
      distance: 12.6, window: "4 hr night bite",
      color:"#ff6b35", color2:"#f44336",
      days:"Fri/Sat nights", boat:"18' jon boat" },
    { id:3, type:"angler", name:"Riley T.", handle:"@tailwater_tom", age:42,
      lake:"Norfork Tailwater",
      tagline: "Tailwater rising · walleye stacked",
      conditions: { flow: "Rising ↑", pressure: "Stable", verdict: "WINDOW" },
      launch: "5:30 AM · SWL ramp",
      style:"Jigging structure · BFL series",
      cred: ["4.95 lb walleye PR", "BFL tournament partner"],
      slots: "Tournament weekends only",
      distance: 22.0, window: "Generation drops 9am",
      color:"#ffd54f", color2:"#fbc02d",
      days:"Tournament weekends", boat:"19' Ranger" },
    { id:4, type:"charter", name:"Spoonbill Adventures", handle:"@spoonbillco", rate:"$520/trip",
      lake:"Lower White River",
      tagline: "Paddlefish run starting",
      conditions: { flow: "High", pressure: "Rising", verdict: "SEASON" },
      launch: "Daily 7AM",
      style:"Paddlefish snagging · Nov–Apr only",
      cred: ["Group of 2–4", "6hr trips", "Snag licenses on board"],
      slots: "Booking for Sat / Sun",
      distance: 38.5, window: "Season ends April 30",
      color:"#ab47bc", color2:"#7b1fa2",
      days:"Nov–Apr", boat:"24' aluminum" }
  ];

  const STORIES = [
    { id:"cj", initials:"CJ", name:"Jay", color:"#4caf50", color2:"#2e7d32",
      caption:"Bull Shoals this morning. Shad working. Bite picking up.", live:true },
    { id:"kr", initials:"KR", name:"Kate", color:"#ff6b35", color2:"#f44336",
      caption:"Conway tailrace, 11pm last night. Numbers night.", live:false },
    { id:"rt", initials:"RT", name:"Riley", color:"#ffd54f", color2:"#fbc02d",
      caption:"Generation off. Walleye stacked behind the rocks.", live:true },
    { id:"sa", initials:"SA", name:"Spoonbill", color:"#ab47bc", color2:"#7b1fa2",
      caption:"Lower White, snag day. Two over 60lb.", live:false },
    { id:"so", initials:"SO", name:"Sam", color:"#00bcd4", color2:"#0097a7",
      caption:"Hike-in spot. Wading streamer water.", live:false }
  ];

  const FEED = [
    { icon:"💧", text:"Water dropped 2ft overnight", when:"12m ago" },
    { icon:"🐟", text:"White bass running upstream", when:"34m ago" },
    { icon:"🌬", text:"Wind picking up after 2pm", when:"1h ago" },
    { icon:"🌡", text:"Surface temp 54.5° at Beaver", when:"2h ago" }
  ];

  const TYPE_META = {
    angler:  { label: "ANGLER",   color: "var(--pfg-accent)" },
    guide:   { label: "GUIDE",    color: "var(--pfg-go)" },
    charter: { label: "CHARTER",  color: "var(--pfg-lunar)" }
  };

  function DockScreen() {
    const [idx, setIdx] = React.useState(0);
    const [matches, setMatches] = React.useState([CARDS[0]]);
    const [filter, setFilter] = React.useState("all");
    const [story, setStory] = React.useState(null);
    const [toast, setToast] = React.useState(null); // "Trip Potential"
    const [compareOpen, setCompareOpen] = React.useState(false);
    const [compareGate, setCompareGate] = React.useState(false);
    const [ripple, setRipple] = React.useState(0); // increments to retrigger

    const filteredCards = React.useMemo(
      () => filter === "all" ? CARDS : CARDS.filter(c => c.type === filter),
      [filter]
    );

    // Reset deck index whenever the active filter changes
    React.useEffect(() => { setIdx(0); }, [filter]);

    const card = filteredCards.length > 0 ? filteredCards[idx % filteredCards.length] : null;

    const swipe = (dir) => {
      if (!card) return;
      if (dir === "right") {
        const next = [card, ...matches.filter(m => m.id !== card.id)].slice(0, 6);
        setMatches(next);
        setToast({ name: card.name, kind: "Trip Potential" });
        setTimeout(() => setToast(null), 2200);
        if (next.length === 3 && !compareGate) setCompareGate(true);
      }
      setRipple(r => r + 1);
      setIdx(i => i + 1);
    };

    return (
      <div style={{ position: "relative" }}>
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 1.6, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>
              ACT ON THE MOMENT
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: -0.6, margin: "4px 0 0" }}>
              The Dock <span style={{ fontSize: 14, fontWeight: 600, color: "var(--pfg-fg-muted)" }}>· {matches.length} active</span>
            </h1>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {[
              { id: "all",     label: "All" },
              { id: "guide",   label: "Guides" },
              { id: "angler",  label: "Anglers" },
              { id: "charter", label: "Charters" }
            ].map(t => {
              const on = filter === t.id;
              return (
                <button key={t.id} onClick={() => setFilter(t.id)} style={{
                  padding: "8px 14px", borderRadius: 8,
                  background: on ? "rgba(0,188,212,0.14)" : "rgba(255,255,255,0.04)",
                  color: on ? "var(--pfg-accent)" : "#cfd8dc",
                  border: `1px solid ${on ? "var(--pfg-accent)" : "rgba(255,255,255,0.06)"}`,
                  fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
                }}>{t.label}</button>
              );
            })}
          </div>
        </div>

        {/* STORIES RAIL */}
        <StoriesRail stories={STORIES} onOpen={setStory}/>

        {/* NEAR YOU CALLOUT */}
        <NearYou card={CARDS[0]} onJump={() => setIdx(0)}/>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, marginTop: 18 }}>
          {/* SWIPE DECK */}
          <div>
            {card ? (
              <>
                <div style={{
                  position: "relative", aspectRatio: "0.78",
                  maxWidth: 480, margin: "0 auto"
                }}>
                  {/* card stack ghosts */}
                  <div style={{
                    position: "absolute", inset: "12px 24px -12px 24px",
                    background: "rgba(255,255,255,0.03)", borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.04)"
                  }}/>
                  <div style={{
                    position: "absolute", inset: "6px 12px -6px 12px",
                    background: "rgba(255,255,255,0.05)", borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.06)"
                  }}/>
                  <LiveMomentCard card={card} key={card.id + "-" + idx}/>
                  <Ripple key={"r-" + ripple}/>
                </div>

                {/* actions */}
                <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 18 }}>
                  <ActionBtn icon={<I.X size={22}/>} onClick={() => swipe("left")}
                    tone="#f44336" label="Pass"/>
                  <ActionBtn icon={<I.Star size={20}/>} onClick={() => swipe("right")}
                    tone="var(--pfg-accent)" label="Save" small/>
                  <ActionBtn icon={<I.Heart size={22}/>} onClick={() => swipe("right")}
                    tone="var(--pfg-spawn)" label="Match"/>
                </div>
              </>
            ) : (
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                aspectRatio: "0.78", maxWidth: 480, margin: "0 auto",
                background: "rgba(255,255,255,0.03)", borderRadius: 16,
                border: "1px dashed rgba(255,255,255,0.1)",
                color: "var(--pfg-fg-muted)", fontSize: 13, gap: 8, textAlign: "center", padding: 24
              }}>
                <span style={{ fontSize: 28 }}>🎣</span>
                <div style={{ fontWeight: 700 }}>No cards match this filter</div>
                <div style={{ fontSize: 11 }}>Try All or a different category</div>
              </div>
            )}
          </div>

          {/* COMMAND CENTER (right rail) */}
          <CommandCenter matches={matches} onCompare={() => setCompareOpen(true)} feed={FEED}/>
        </div>

        {/* COMPARE GATE TOAST */}
        {compareGate && !compareOpen && (
          <CompareGate
            onCompare={() => { setCompareOpen(true); setCompareGate(false); }}
            onDismiss={() => setCompareGate(false)}/>
        )}

        {/* MATCH TOAST */}
        {toast && <MatchToast {...toast}/>}

        {/* STORY VIEWER */}
        {story && <StoryViewer story={story} onClose={() => setStory(null)}/>}

        {/* COMPARE OVERLAY */}
        {compareOpen && (
          <CompareOverlay matches={matches.slice(0,3)} onClose={() => setCompareOpen(false)}/>
        )}
      </div>
    );
  }

  /* ---------- Stories rail (Snapchat layer) ---------- */
  function StoriesRail({ stories, onOpen }) {
    return (
      <div style={{
        display: "flex", gap: 14, overflowX: "auto",
        padding: "10px 2px 14px", marginBottom: 8,
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        {stories.map(s => (
          <button key={s.id} onClick={() => onOpen(s)} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            background: "transparent", border: "none", cursor: "pointer",
            fontFamily: "inherit", flexShrink: 0, padding: 0
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: "50%",
              padding: 2.5,
              background: s.live
                ? `conic-gradient(from 90deg, ${s.color}, ${s.color2}, ${s.color})`
                : "rgba(255,255,255,0.18)"
            }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                background: `linear-gradient(135deg, ${s.color}, ${s.color2})`,
                display: "grid", placeItems: "center",
                fontSize: 18, fontWeight: 800, color: "#0d1b2a",
                border: "2px solid #0d1b2a"
              }}>{s.initials}</div>
            </div>
            <div style={{ fontSize: 10, color: s.live ? "#fff" : "var(--pfg-fg-muted)", fontWeight: s.live ? 800 : 600 }}>
              {s.name}{s.live && " · LIVE"}
            </div>
          </button>
        ))}
      </div>
    );
  }

  /* ---------- Near You callout ---------- */
  function NearYou({ card, onJump }) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "12px 16px", borderRadius: 12, marginBottom: 4,
        background: "linear-gradient(90deg, rgba(255,107,53,0.10), rgba(76,175,80,0.06))",
        border: "1px solid rgba(255,107,53,0.28)"
      }}>
        <div style={{ fontSize: 18 }}>📍</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, letterSpacing: 1.4, fontWeight: 800, color: "var(--pfg-spawn)" }}>
            NEAR YOU · HOT RIGHT NOW
          </div>
          <div style={{ fontSize: 12.5, color: "#fff", fontWeight: 700, marginTop: 2 }}>
            <b>{card.name}</b> · {card.distance} mi · "{card.window}"
          </div>
        </div>
        <button onClick={onJump} style={{
          padding: "8px 14px", borderRadius: 8,
          background: "var(--pfg-spawn)", color: "#0d1b2a",
          fontSize: 11, fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit"
        }}>Jump to card →</button>
      </div>
    );
  }

  /* ---------- Live Moment Card ---------- */
  function LiveMomentCard({ card }) {
    const meta = TYPE_META[card.type];
    return (
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, ${card.color}33 0%, #0d1b2a 55%, #0d1b2a 100%)`,
        borderRadius: 16, overflow: "hidden",
        border: `2px solid ${card.color}66`,
        boxShadow: `0 12px 40px ${card.color}22`,
        display: "flex", flexDirection: "column",
        animation: "moment-in 320ms ease-out"
      }}>
        {/* LIVE banner */}
        <div style={{
          padding: "10px 16px", display: "flex", alignItems: "center", gap: 10,
          background: "rgba(0,0,0,0.35)",
          borderBottom: `1px solid ${card.color}44`
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontSize: 10, fontWeight: 800, letterSpacing: 1, color: "#ff3d57"
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: "#ff3d57",
              boxShadow: "0 0 8px #ff3d57", animation: "live-pulse 1.4s ease-in-out infinite"
            }}/>
            LIVE CONDITIONS MATCH
          </span>
          <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--pfg-fg-muted)", fontWeight: 700, letterSpacing: 0.6 }}>
            {card.window}
          </span>
        </div>

        {/* Tagline + launch */}
        <div style={{ padding: "16px 20px 10px" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: -0.5, lineHeight: 1.15 }}>
            "{card.tagline}"
          </div>
          <div style={{ fontSize: 12, color: card.color, fontWeight: 700, marginTop: 6 }}>
            {card.lake} · {card.launch}
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
            <Cond k="Flow" v={card.conditions.flow}/>
            <Cond k="Pressure" v={card.conditions.pressure}/>
            <span style={{
              padding: "3px 8px", borderRadius: 4,
              background: card.color, color: "#0d1b2a",
              fontSize: 10, fontWeight: 800, letterSpacing: 0.8, alignSelf: "center"
            }}>{card.conditions.verdict}</span>
          </div>
        </div>

        {/* Auto-loop video placeholder */}
        <div style={{
          margin: "8px 14px", borderRadius: 10, height: 90,
          background: `radial-gradient(ellipse at 30% 40%, ${card.color}55, transparent 65%), #061826`,
          border: `1px solid ${card.color}33`,
          position: "relative", overflow: "hidden"
        }}>
          {/* "video" — shimmering water */}
          <svg width="100%" height="100%" viewBox="0 0 200 90" preserveAspectRatio="none">
            <defs>
              <linearGradient id={"wave-"+card.id} x1="0" x2="1">
                <stop offset="0" stopColor={card.color} stopOpacity="0.45"/>
                <stop offset="1" stopColor={card.color2} stopOpacity="0.2"/>
              </linearGradient>
            </defs>
            <path d="M0 60 Q 25 50 50 60 T 100 60 T 150 60 T 200 60 V90 H0Z" fill={"url(#wave-"+card.id+")"}>
              <animate attributeName="d"
                dur="3s" repeatCount="indefinite"
                values="M0 60 Q 25 50 50 60 T 100 60 T 150 60 T 200 60 V90 H0Z;
                        M0 60 Q 25 70 50 60 T 100 60 T 150 60 T 200 60 V90 H0Z;
                        M0 60 Q 25 50 50 60 T 100 60 T 150 60 T 200 60 V90 H0Z"/>
            </path>
          </svg>
          <div style={{
            position: "absolute", left: 10, bottom: 8,
            padding: "2px 6px", borderRadius: 3,
            background: "rgba(0,0,0,0.55)",
            fontSize: 9, color: "#fff", fontWeight: 700, letterSpacing: 0.6
          }}>● LOOP · 0:08</div>
        </div>

        {/* Identity */}
        <div style={{ padding: "4px 20px 8px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: `linear-gradient(135deg, ${card.color}, ${card.color2})`,
            display: "grid", placeItems: "center", flexShrink: 0,
            fontSize: 16, fontWeight: 800, color: "#0d1b2a",
            boxShadow: `0 4px 14px ${card.color}55`
          }}>{card.name.split(" ").map(s => s[0]).slice(0,2).join("")}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>
              {card.name}{card.age ? `, ${card.age}` : ""}
            </div>
            <div style={{ fontSize: 11, color: card.color, fontWeight: 600 }}>{card.handle}</div>
          </div>
          <span style={{
            padding: "3px 8px", borderRadius: 4,
            background: `${meta.color}22`, color: meta.color,
            fontSize: 9, fontWeight: 800, letterSpacing: 1
          }}>{meta.label}</span>
        </div>

        {/* Cred chips */}
        <div style={{ padding: "0 20px 10px", display: "flex", flexWrap: "wrap", gap: 6 }}>
          {card.cred.map(c => (
            <span key={c} style={{
              padding: "3px 8px", borderRadius: 4,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 10, color: "#cfd8dc", fontWeight: 600
            }}>{c}</span>
          ))}
        </div>

        {/* Style */}
        <div style={{ margin: "0 16px 10px", padding: "8px 12px", borderRadius: 8,
                      background: "rgba(0,0,0,0.3)", border: `1px solid ${card.color}44` }}>
          <div style={{ fontSize: 9, letterSpacing: 1.4, fontWeight: 800, color: card.color }}>STYLE</div>
          <div style={{ fontSize: 12, color: "#fff", marginTop: 2 }}>{card.style}</div>
        </div>

        {/* Money + slots */}
        <div style={{ marginTop: "auto", padding: "12px 18px",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            {card.rate && (
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>
                💰 {card.rate}
              </div>
            )}
            <div style={{ fontSize: 11, color: "var(--pfg-spawn)", fontWeight: 700, marginTop: 2 }}>
              ⚡ {card.slots}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const Cond = ({ k, v }) => (
    <span style={{ fontSize: 11, color: "#cfd8dc" }}>
      <span style={{ color: "var(--pfg-fg-muted)", fontWeight: 700, letterSpacing: 0.6 }}>{k}:</span>{" "}
      <b style={{ color: "#fff" }}>{v}</b>
    </span>
  );

  /* ---------- Ripple on swipe ---------- */
  function Ripple() {
    return (
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        borderRadius: 16, overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 50% 60%, rgba(0,188,212,0.32) 0%, transparent 55%)",
          animation: "ripple 600ms ease-out forwards", opacity: 0
        }}/>
      </div>
    );
  }

  /* ---------- Command Center (right rail) ---------- */
  function CommandCenter({ matches, onCompare, feed }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Confirmed trip */}
        <Section title="YOUR TRIPS" tone="var(--pfg-go)">
          <div style={{ padding: "10px 12px", borderRadius: 10,
                        background: "rgba(76,175,80,0.10)", border: "1px solid rgba(76,175,80,0.32)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "var(--pfg-go)" }}>
              ✔ Saturday Confirmed
            </div>
            <div style={{ fontSize: 12, color: "#fff", marginTop: 2 }}>
              Capt. Jay Linden · 6:00 AM
            </div>
            <div style={{ fontSize: 11, color: "#cfd8dc" }}>Striper trolling · live shad on the boat</div>
          </div>
        </Section>

        {/* Active matches */}
        <Section title="ACTIVE MATCHES" tone="var(--pfg-accent)" right={
          matches.length >= 3 && (
            <button onClick={onCompare} style={{
              padding: "4px 9px", borderRadius: 6,
              background: "var(--pfg-accent)", color: "#0d1b2a",
              fontSize: 10, fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit"
            }}>Compare {Math.min(3, matches.length)}</button>
          )
        }>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {matches.length === 0 && (
              <div style={{ fontSize: 11, color: "var(--pfg-fg-muted)", padding: "6px 0" }}>
                Swipe right to start matching →
              </div>
            )}
            {matches.map(m => (
              <div key={m.id} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 10px", borderRadius: 8,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)"
              }}>
                <span style={{ fontSize: 14 }}>
                  {m.conditions?.verdict === "HOT" ? "🔥"
                   : m.conditions?.verdict === "NIGHT" ? "⚡"
                   : m.conditions?.verdict === "WINDOW" ? "🌊" : "✨"}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{m.name}</div>
                  <div style={{ fontSize: 10, color: "var(--pfg-fg-muted)" }}>
                    {m.tagline}
                  </div>
                </div>
                <button style={{
                  padding: "5px 9px", borderRadius: 5,
                  background: "var(--pfg-accent)", color: "#0d1b2a",
                  fontSize: 10, fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit"
                }}>Message</button>
              </div>
            ))}
          </div>
        </Section>

        {/* Live dock feed */}
        <Section title="LIVE DOCK FEED" tone="var(--pfg-spawn)">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {feed.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "baseline", gap: 8,
                padding: "6px 10px", borderRadius: 6,
                background: "rgba(255,255,255,0.02)"
              }}>
                <span style={{ fontSize: 12 }}>{f.icon}</span>
                <span style={{ fontSize: 11.5, color: "#cfd8dc", flex: 1 }}>{f.text}</span>
                <span style={{ fontSize: 9, color: "var(--pfg-fg-muted)" }}>{f.when}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    );
  }

  function Section({ title, tone, right, children }) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ fontSize: 9, letterSpacing: 1.6, fontWeight: 800, color: tone }}>
            {title}
          </div>
          {right}
        </div>
        {children}
      </div>
    );
  }

  /* ---------- Compare gate (after 3 matches) ---------- */
  function CompareGate({ onCompare, onDismiss }) {
    return (
      <div style={{
        position: "fixed", left: "50%", bottom: 28, transform: "translateX(-50%)",
        zIndex: 80, padding: "12px 18px", borderRadius: 12,
        background: "rgba(13,27,42,0.92)", backdropFilter: "blur(10px)",
        border: "1px solid var(--pfg-accent)",
        boxShadow: "0 16px 48px rgba(0,188,212,0.35)",
        display: "flex", alignItems: "center", gap: 14,
        animation: "moment-in 280ms ease-out"
      }}>
        <span style={{ fontSize: 13, color: "#fff", fontWeight: 700 }}>
          You've found <b style={{ color: "var(--pfg-accent)" }}>3 strong matches</b>.
        </span>
        <button onClick={onCompare} style={{
          padding: "8px 14px", borderRadius: 8,
          background: "var(--pfg-accent)", color: "#0d1b2a",
          fontSize: 11, fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit"
        }}>Compare Trips</button>
        <button onClick={onDismiss} style={{
          padding: "8px 14px", borderRadius: 8,
          background: "transparent", color: "#cfd8dc",
          fontSize: 11, fontWeight: 700,
          border: "1px solid rgba(255,255,255,0.14)", cursor: "pointer", fontFamily: "inherit"
        }}>Keep Browsing</button>
      </div>
    );
  }

  /* ---------- Compare overlay ---------- */
  function CompareOverlay({ matches, onClose }) {
    return (
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(5,12,20,0.85)", backdropFilter: "blur(8px)",
        display: "grid", placeItems: "center", padding: 24
      }}>
        <div onClick={e => e.stopPropagation()} style={{
          width: "min(940px, 100%)",
          background: "linear-gradient(180deg, #0d2137 0%, #0a1d2e 100%)",
          borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)",
          padding: 24
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 1.6, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>SIDE BY SIDE</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: -0.5, margin: "4px 0 0" }}>
                Compare your trips
              </h2>
            </div>
            <button onClick={onClose} style={{
              padding: "8px 12px", borderRadius: 8,
              background: "rgba(255,255,255,0.04)", color: "#cfd8dc",
              fontSize: 11, fontWeight: 700,
              border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", fontFamily: "inherit"
            }}>✕ Close</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: `repeat(${matches.length}, 1fr)`, gap: 12 }}>
            {matches.map(m => (
              <div key={m.id} style={{
                padding: 16, borderRadius: 12,
                background: `linear-gradient(180deg, ${m.color}22 0%, transparent 60%)`,
                border: `1.5px solid ${m.color}66`
              }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{m.name}</div>
                <div style={{ fontSize: 11, color: m.color, fontWeight: 600, marginBottom: 14 }}>{m.handle}</div>

                <Row k="$" v={m.rate || "—"}/>
                <Row k="Target" v={m.style.split("·")[0].trim()}/>
                <Row k="Today" v={m.conditions.verdict} tone={m.color}/>
                <Row k="Window" v={m.window}/>
                <Row k="Distance" v={m.distance + " mi"}/>
                <Row k="Slots" v={m.slots}/>

                <button style={{
                  marginTop: 14, width: "100%",
                  padding: "10px 14px", borderRadius: 8,
                  background: m.color, color: "#0d1b2a",
                  fontSize: 12, fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit"
                }}>Select Trip to Plan →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const Row = ({ k, v, tone }) => (
    <div style={{ display: "flex", justifyContent: "space-between",
                  padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <span style={{ fontSize: 10, color: "var(--pfg-fg-muted)", letterSpacing: 0.8, fontWeight: 700, textTransform: "uppercase" }}>{k}</span>
      <span style={{ fontSize: 11.5, color: tone || "#fff", fontWeight: 700, textAlign: "right", maxWidth: "60%" }}>{v}</span>
    </div>
  );

  /* ---------- Match toast ("Trip Potential") ---------- */
  function MatchToast({ name, kind }) {
    return (
      <div style={{
        position: "fixed", left: "50%", top: 80, transform: "translateX(-50%)",
        zIndex: 90, padding: "14px 22px", borderRadius: 999,
        background: "linear-gradient(90deg, var(--pfg-spawn), var(--pfg-accent))",
        color: "#0d1b2a", fontWeight: 800, letterSpacing: 0.4,
        boxShadow: "0 12px 40px rgba(255,107,53,0.35)",
        animation: "toast-in 260ms ease-out"
      }}>
        <span style={{ fontSize: 11, opacity: 0.7, marginRight: 8 }}>● {kind.toUpperCase()}</span>
        <span style={{ fontSize: 13 }}>You + {name}</span>
      </div>
    );
  }

  /* ---------- Story viewer ---------- */
  function StoryViewer({ story, onClose }) {
    return (
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.92)",
        display: "grid", placeItems: "center", padding: 24
      }}>
        <div onClick={e => e.stopPropagation()} style={{
          width: 360, aspectRatio: "9/16",
          background: `linear-gradient(180deg, ${story.color}55 0%, #0a1620 60%)`,
          borderRadius: 16, overflow: "hidden",
          border: `1.5px solid ${story.color}`,
          display: "flex", flexDirection: "column",
          position: "relative"
        }}>
          {/* progress bar */}
          <div style={{ height: 3, background: "rgba(255,255,255,0.15)", margin: 10, borderRadius: 2 }}>
            <div style={{ height: "100%", width: "40%", background: "#fff", borderRadius: 2,
                          animation: "story-progress 6s linear forwards" }}/>
          </div>
          {/* header */}
          <div style={{ padding: "0 14px 10px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: `linear-gradient(135deg, ${story.color}, ${story.color2})`,
              display: "grid", placeItems: "center",
              fontSize: 13, fontWeight: 800, color: "#0d1b2a"
            }}>{story.initials}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{story.name}</div>
            {story.live && <span style={{
              padding: "2px 6px", borderRadius: 3,
              background: "#ff3d57", color: "#fff", fontSize: 9, fontWeight: 800, letterSpacing: 0.6
            }}>● LIVE</span>}
            <button onClick={onClose} style={{
              marginLeft: "auto", background: "transparent", border: "none",
              color: "#fff", fontSize: 18, cursor: "pointer"
            }}>✕</button>
          </div>
          {/* video placeholder */}
          <div style={{ flex: 1, margin: "0 14px", borderRadius: 10, overflow: "hidden",
                        background: `radial-gradient(ellipse at center, ${story.color}33, transparent 70%), #061826`,
                        display: "grid", placeItems: "center", fontSize: 11, color: "var(--pfg-fg-muted)" }}>
            ● 0:08 LOOP
          </div>
          {/* caption */}
          <div style={{ padding: 14, fontSize: 13, color: "#fff", fontWeight: 600, lineHeight: 1.4 }}>
            "{story.caption}"
          </div>
          <button style={{
            margin: "0 14px 14px", padding: "12px 18px", borderRadius: 10,
            background: story.color, color: "#0d1b2a",
            fontSize: 13, fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit"
          }}>Book with {story.name} →</button>
        </div>
      </div>
    );
  }

  function ActionBtn({ icon, label, tone, onClick, small }) {
    return (
      <button onClick={onClick} title={label} style={{
        width: small ? 48 : 58, height: small ? 48 : 58, borderRadius: "50%",
        background: "rgba(255,255,255,0.04)",
        border: `2px solid ${tone}`, color: tone,
        display: "grid", placeItems: "center",
        cursor: "pointer", fontFamily: "inherit",
        boxShadow: `0 4px 14px ${tone}33`
      }}>{icon}</button>
    );
  }

  // Inject animations once
  if (!document.getElementById("pfg-dock-anims")) {
    const s = document.createElement("style");
    s.id = "pfg-dock-anims";
    s.textContent = `
      @keyframes moment-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      @keyframes live-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
      @keyframes ripple {
        0% { opacity: 0; transform: scale(0.6); }
        40% { opacity: 1; }
        100% { opacity: 0; transform: scale(1.4); }
      }
      @keyframes toast-in { from { opacity: 0; transform: translateX(-50%) translateY(-12px); } to { opacity: 1; transform: translateX(-50%); } }
      @keyframes story-progress { from { width: 0; } to { width: 100%; } }
    `;
    document.head.appendChild(s);
  }

  Object.assign(window, { PfgDockScreen: DockScreen });
})();
