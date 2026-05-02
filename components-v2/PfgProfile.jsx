/* ============================================================
   PfgProfile — My Profile screen.
   Syncs with window.SPECIES so every PR card uses the real
   artwork, latin name, family, and rarity from the field guide.
   Adds a hero stat strip, a weight-leaderboard chart, recent
   catch ticker, and angler-group breakdown — to replace the
   plain "list of PRs" with a living trophy room.
   ============================================================ */

(function(){
  const I = window.PfgIcons;

  // Same angler groups used in the Species screen — keep them in sync.
  const ANGLER_GROUPS = [
    { id: "bass",        label: "Bass",                ids: ["largemouth_bass","smallmouth_bass","kentucky_bass","striped_bass","hybrid_striped_bass","white_bass","yellow_bass"] },
    { id: "panfish",     label: "Panfish & Crappie",   ids: ["black_crappie","white_crappie","bluegill","redear_sunfish","longear_sunfish","green_sunfish","warmouth","rock_bass"] },
    { id: "catfish",     label: "Catfish",             ids: ["channel_catfish","blue_catfish","flathead_catfish","bullhead_catfish"] },
    { id: "trout",       label: "Trout",               ids: ["rainbow_trout","brown_trout","brook_trout","cutthroat_trout"] },
    { id: "walleye",     label: "Walleye & Sauger",    ids: ["walleye","sauger","saugeye","yellow_perch"] },
    { id: "pickerel",    label: "Pickerel & Pike",     ids: ["chain_pickerel","grass_pickerel","redfin_pickerel","northern_pike","muskellunge"] },
    { id: "gar_bowfin",  label: "Gar & Bowfin",        ids: ["alligator_gar","longnose_gar","spotted_gar","shortnose_gar","bowfin"] },
    { id: "big_river",   label: "Big River & Rough",   ids: ["freshwater_drum","paddlefish","buffalo","carp","sturgeon","sucker"] }
  ];
  const groupOf = (id) => (ANGLER_GROUPS.find(g => g.ids.includes(id)) || { id: "other", label: "Other" });

  const RARITY = {
    common:    { color: "#9fb5c7", label: "COMMON" },
    uncommon:  { color: "#4dd0e1", label: "UNCOMMON" },
    rare:      { color: "#ab47bc", label: "RARE" },
    legendary: { color: "#ff6b35", label: "LEGENDARY" }
  };
  const rarityOf = (sp) => RARITY[(sp?.rarity || "").toLowerCase()] || RARITY.common;

  // Real PR log — keyed off species id so we resolve every detail (art, latin,
  // rarity, family) from window.SPECIES. Add/remove rows here only.
  const PR_LOG = [
    { spId: "alligator_gar",   weight: 38.0, lenIn: 56, date: "Feb 11 '26", lake: "Lower White River",   trophy: true },
    { spId: "brown_trout",     weight: 11.4, lenIn: 28, date: "Mar 12 '26", lake: "Bull Shoals Tailwater", trophy: true },
    { spId: "channel_catfish", weight: 6.80, lenIn: 24, date: "Feb 19 '26", lake: "Lake Conway" },
    { spId: "largemouth_bass", weight: 5.85, lenIn: 21, date: "Mar 22 '26", lake: "Lake Conway" },
    { spId: "walleye",         weight: 5.20, lenIn: 22, date: "Feb 28 '26", lake: "Greers Ferry" },
    { spId: "smallmouth_bass", weight: 4.10, lenIn: 19, date: "Mar 09 '26", lake: "Crooked Creek" },
    { spId: "white_bass",      weight: 2.80, lenIn: 16, date: "Feb 24 '26", lake: "Beaver Lake" },
    { spId: "rainbow_trout",   weight: 2.10, lenIn: 15, date: "Apr 02 '26", lake: "Norfork Tailwater" }
  ];

  const HOME_WATERS = [
    { name: "Norfork Tailwater", days: 42, primary: true },
    { name: "Crooked Creek", days: 18 },
    { name: "Bull Shoals", days: 14 },
    { name: "Beaver Lake", days: 9 }
  ];

  const RECENT = [
    { spId: "rainbow_trout",   weight: 1.85, when: "2h ago",  lake: "Norfork Tailwater" },
    { spId: "smallmouth_bass", weight: 3.20, when: "Yesterday", lake: "Crooked Creek" },
    { spId: "bluegill",        weight: 0.55, when: "Sun",     lake: "Lake Conway" },
    { spId: "white_bass",      weight: 2.10, when: "Sat",     lake: "Beaver Lake" }
  ];

  // Resolve a PR row → full species object + rarity + group, lazily so we
  // tolerate window.SPECIES being absent (defaults).
  function resolve(row) {
    const sp = (window.SPECIES || []).find(s => s.id === row.spId) || { id: row.spId, name: row.spId };
    return { ...row, sp, rarity: rarityOf(sp), group: groupOf(row.spId), name: sp.name };
  }

  function ProfileScreen({ user, onSignOut }) {
    const prs = React.useMemo(() => PR_LOG.map(resolve), []);
    const recents = React.useMemo(() => RECENT.map(resolve), []);
    const [sortKey, setSortKey] = React.useState("weight");

    const sorted = React.useMemo(() => {
      const a = [...prs];
      if (sortKey === "weight") a.sort((x,y) => y.weight - x.weight);
      if (sortKey === "length") a.sort((x,y) => y.lenIn - x.lenIn);
      if (sortKey === "recent") a.sort((x,y) => new Date(y.date) - new Date(x.date));
      return a;
    }, [prs, sortKey]);

    const trophyFish = prs.find(p => p.trophy) || prs[0];
    const totalLb = prs.reduce((s, p) => s + p.weight, 0);

    // Group breakdown counts by angler group.
    const groupCounts = React.useMemo(() => {
      const map = {};
      prs.forEach(p => { map[p.group.id] = (map[p.group.id] || 0) + 1; });
      return ANGLER_GROUPS.filter(g => map[g.id]).map(g => ({ ...g, n: map[g.id] }));
    }, [prs]);

    return (
      <div>
        {/* HERO STAT STRIP — animated, makes the page open with a punch */}
        <HeroStrip user={user} totalLb={totalLb} prs={prs} trophyFish={trophyFish}/>

        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1.4fr", gap: 24, marginTop: 24 }}>
          {/* LEFT — angler card showcasing the trophy fish art */}
          <div>
            <div style={hdr}>PUBLIC ANGLER CARD · SHAREABLE</div>
            <AnglerCard user={user} trophyFish={trophyFish} prs={prs}/>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button style={pillBtn}><I.Heart size={14}/> Share card</button>
              <button style={pillBtn}>Edit</button>
              <button style={pillBtn}>QR</button>
            </div>

            <div style={{ marginTop: 26 }}>
              <div style={hdr}>HOME WATERS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {HOME_WATERS.map(w => (
                  <div key={w.name} style={waterRow}>
                    <I.Pin size={16}/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{w.name}</div>
                      <div style={{ fontSize: 10.5, color: "var(--pfg-fg-muted)" }}>{w.days} days fished · last 12 mo</div>
                    </div>
                    {w.primary && <span style={pinBadge}>HOME</span>}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 22 }}>
              <div style={hdr}>SPECIES BY GROUP</div>
              <GroupBars groups={groupCounts} total={prs.length}/>
            </div>
          </div>

          {/* RIGHT — the trophy room */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={hdr}>PERSONAL RECORDS · {prs.length} SPECIES</div>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => setSortKey("weight")} style={tinyTab(sortKey==="weight")}>Weight</button>
                <button onClick={() => setSortKey("length")} style={tinyTab(sortKey==="length")}>Length</button>
                <button onClick={() => setSortKey("recent")} style={tinyTab(sortKey==="recent")}>Recent</button>
              </div>
            </div>

            {/* WEIGHT LEADERBOARD — animated horizontal bars per PR */}
            <Leaderboard prs={sorted}/>

            {/* RECENT CATCHES TICKER */}
            <div style={{ marginTop: 22 }}>
              <div style={hdr}>RECENT CATCHES</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                {recents.map((r, i) => <RecentChip key={i} r={r}/>)}
              </div>
            </div>

            {/* LIFETIME STATS */}
            <div style={{ marginTop: 22 }}>
              <div style={hdr}>LIFETIME STATS</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                <BigStat label="FISH" value="412" sub="last 12 mo"/>
                <BigStat label="SPECIES" value={`${prs.length} / ${(window.SPECIES||[]).length||30}`} sub="binder"/>
                <BigStat label="LAKES" value="14" sub="visited"/>
                <BigStat label="HRS" value="187" sub="on water"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
     HERO — animated stat ribbon.
     Pulls the heaviest PR from window.SPECIES so the headline
     fish always matches the field guide's data.
     ============================================================ */
  function HeroStrip({ user, totalLb, prs, trophyFish }) {
    const [tick, setTick] = React.useState(0);
    React.useEffect(() => {
      let raf, start = performance.now();
      const loop = (t) => { setTick((t-start)/1000); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }, []);
    const wave = Math.sin(tick * 0.6) * 8;

    return (
      <div style={{
        position: "relative",
        background: "linear-gradient(135deg, #0d2137 0%, #0a3d5c 70%)",
        borderRadius: 16, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "26px 28px"
      }}>
        {/* faint waterline behind the trophy fish */}
        <svg viewBox="0 0 800 120" preserveAspectRatio="none" aria-hidden="true"
             style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}>
          <path d={`M0 ${70+wave} Q 200 ${50+wave} 400 ${70+wave} T 800 ${70+wave} L 800 120 L 0 120 Z`}
                fill="var(--pfg-accent)"/>
          <path d={`M0 ${85-wave} Q 200 ${65-wave} 400 ${85-wave} T 800 ${85-wave} L 800 120 L 0 120 Z`}
                fill="var(--pfg-spawn)" opacity="0.6"/>
        </svg>

        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr auto", gap: 20, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 2, fontWeight: 700, color: "var(--pfg-spawn)" }}>
              ● ANGLER PROFILE · {(user.handle || "@you").toUpperCase()}
            </div>
            <h1 style={{ fontSize: 38, fontWeight: 800, color: "#fff", letterSpacing: -1, margin: "6px 0 4px" }}>
              {user.name}
            </h1>
            <div style={{ fontSize: 13, color: "#cfd8dc" }}>
              {user.homeWater || "Norfork Tailwater"} · Member since {user.joined || 2023}
            </div>

            <div style={{ display: "flex", gap: 22, marginTop: 18 }}>
              <Headline label="LIFETIME PR" value={`${trophyFish?.weight.toFixed(1) || "0.0"} lb`} sub={trophyFish?.name}/>
              <Headline label="SPECIES"     value={`${prs.length} / 30`}                              sub={`${prs.filter(p=>p.trophy).length} ★ trophy`}/>
              <Headline label="TOTAL LB"    value={totalLb.toFixed(1)}                               sub="recorded PRs"/>
              <Headline label="STREAK"      value="11"                                               sub="weeks on the water"/>
            </div>
          </div>

          {/* Trophy fish art — pulled from window.SPECIES */}
          {trophyFish?.sp?.art && (
            <div style={{
              width: 220, aspectRatio: "16 / 10",
              background: `radial-gradient(ellipse at center, ${trophyFish.rarity.color}33 0%, transparent 65%)`,
              borderRadius: 12, display: "grid", placeItems: "center",
              border: `1px solid ${trophyFish.rarity.color}55`
            }}>
              <img src={trophyFish.sp.art} alt={trophyFish.name}
                   style={{ width: "92%", height: "92%", objectFit: "contain",
                            filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.45))",
                            transform: `translateY(${Math.sin(tick*1.4)*3}px)` }}
                   onError={(e)=>{ e.currentTarget.style.display="none"; }}/>
            </div>
          )}
        </div>
      </div>
    );
  }

  function Headline({ label, value, sub }) {
    return (
      <div>
        <div style={{ fontSize: 9, letterSpacing: 1.4, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", fontFamily: "ui-monospace,monospace", lineHeight: 1, marginTop: 4 }}>{value}</div>
        {sub && <div style={{ fontSize: 10, color: "var(--pfg-spawn)", marginTop: 2, fontWeight: 600 }}>{sub}</div>}
      </div>
    );
  }

  /* ============================================================
     ANGLER CARD — collectible-style. Showcases the trophy fish
     artwork and a small species filmstrip of the user's binder.
     ============================================================ */
  function AnglerCard({ user, trophyFish, prs }) {
    const r = trophyFish?.rarity || RARITY.legendary;
    return (
      <div style={{
        aspectRatio: "0.78",
        background: "linear-gradient(180deg, #1b2838 0%, #0d2137 100%)",
        borderRadius: 16, overflow: "hidden", position: "relative",
        border: `2px solid ${r.color}`,
        boxShadow: `0 12px 40px ${r.color}22`
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--pfg-grad-spawn-bar)" }}/>
        <div style={{ padding: 22, display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ fontSize: 9, letterSpacing: 2, fontWeight: 700, color: "var(--pfg-accent)", opacity: 0.85 }}>
              POCKET FISHING GUIDE · ANGLER
            </div>
            <div style={{
              padding: "3px 7px", borderRadius: 4,
              background: `${r.color}22`, color: r.color,
              fontSize: 9, fontWeight: 800, letterSpacing: 1
            }}>{r.label}</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14 }}>
            <window.PfgAvatar user={user} size={64} ring={`${r.color}55`}/>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: -0.4 }}>{user.name}</div>
              <div style={{ fontSize: 12, color: "var(--pfg-accent)", fontWeight: 600 }}>{user.handle}</div>
              <div style={{ fontSize: 11, color: "var(--pfg-fg-muted)", marginTop: 3 }}>
                Member since {user.joined || 2023}
              </div>
            </div>
          </div>

          {/* Trophy fish hero from window.SPECIES */}
          {trophyFish?.sp?.art && (
            <div style={{
              marginTop: 14, aspectRatio: "16 / 9",
              borderRadius: 8, position: "relative", overflow: "hidden",
              background: `radial-gradient(ellipse at center, ${r.color}33 0%, transparent 65%)`,
              border: `1px solid ${r.color}33`,
              display: "grid", placeItems: "center", padding: 6
            }}>
              <img src={trophyFish.sp.art} alt={trophyFish.name}
                   style={{ width: "100%", height: "100%", objectFit: "contain",
                            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.45))" }}/>
              <div style={{ position: "absolute", left: 8, bottom: 6 }}>
                <div style={{ fontSize: 9, letterSpacing: 1.4, fontWeight: 800, color: r.color }}>★ TROPHY</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>
                  {trophyFish.name} <span style={{ color: "var(--pfg-fg-muted)", fontWeight: 500 }}>· {trophyFish.weight.toFixed(1)} lb</span>
                </div>
              </div>
            </div>
          )}

          {/* Mini binder filmstrip — first 6 PRs */}
          <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
            {prs.slice(0, 6).map(p => (
              <div key={p.spId} style={{
                flex: 1, aspectRatio: "1", borderRadius: 4,
                background: "rgba(0,0,0,0.3)", border: `1px solid ${p.rarity.color}55`,
                display: "grid", placeItems: "center", padding: 3, overflow: "hidden"
              }}>
                {p.sp?.art && <img src={p.sp.art} alt={p.name}
                     style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}/>}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 10 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 1.4, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>HOME</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{user.homeWater}</div>
            </div>
            <div style={{
              width: 48, height: 48, borderRadius: 4,
              background: "linear-gradient(135deg, #fff 0%, #cfd8dc 100%)",
              display: "grid", placeItems: "center", fontSize: 8, color: "#0d1b2a", fontWeight: 700
            }}>QR</div>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
     LEADERBOARD — horizontal bars per species PR, art on the
     left, animated bar to peak weight, rarity-coloured.
     ============================================================ */
  function Leaderboard({ prs }) {
    const peak = Math.max(1, ...prs.map(p => p.weight));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {prs.map((p, i) => (
          <div key={p.spId} style={prRow}>
            {/* art thumbnail */}
            <div style={{
              width: 52, height: 36, flexShrink: 0,
              borderRadius: 6, padding: 3,
              background: `${p.rarity.color}18`,
              border: `1px solid ${p.rarity.color}33`,
              display: "grid", placeItems: "center", overflow: "hidden"
            }}>
              {p.sp?.art
                ? <img src={p.sp.art} alt={p.name}
                       style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                       onError={(e)=>{ e.currentTarget.style.display="none"; }}/>
                : <span style={{ fontSize: 16 }}>🐟</span>}
            </div>

            {/* name + bar */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: -0.2,
                                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 9, letterSpacing: 0.8, fontWeight: 700, color: p.rarity.color }}>
                    {p.rarity.label}
                  </div>
                  {p.trophy && <span style={{ fontSize: 10, color: "var(--pfg-spawn)" }}>★</span>}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "ui-monospace,monospace", whiteSpace: "nowrap" }}>
                  {p.weight.toFixed(2)} <span style={{ fontSize: 9, color: "var(--pfg-fg-muted)" }}>LB · {p.lenIn}"</span>
                </div>
              </div>
              <div style={{ marginTop: 3, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                <div style={{
                  width: `${(p.weight / peak) * 100}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${p.rarity.color}, var(--pfg-spawn))`,
                  transition: "width 700ms cubic-bezier(.2,.8,.2,1)",
                  transitionDelay: `${i * 60}ms`
                }}/>
              </div>
              <div style={{ fontSize: 10, color: "var(--pfg-fg-muted)", marginTop: 2 }}>
                {p.lake} · {p.date} · {p.group.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function RecentChip({ r }) {
    return (
      <div style={prRow}>
        <div style={{
          width: 40, height: 28, flexShrink: 0,
          borderRadius: 5, padding: 2,
          background: `${r.rarity.color}18`,
          border: `1px solid ${r.rarity.color}33`,
          display: "grid", placeItems: "center", overflow: "hidden"
        }}>
          {r.sp?.art && <img src={r.sp.art} alt={r.name}
               style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
               onError={(e)=>{ e.currentTarget.style.display="none"; }}/>}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "#fff" }}>{r.name}</div>
          <div style={{ fontSize: 10, color: "var(--pfg-fg-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {r.lake}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", fontFamily: "ui-monospace,monospace" }}>{r.weight.toFixed(2)}</div>
          <div style={{ fontSize: 9, color: "var(--pfg-fg-muted)" }}>{r.when}</div>
        </div>
      </div>
    );
  }

  /* ============================================================
     GROUP BARS — angler-group breakdown of caught species.
     ============================================================ */
  function GroupBars({ groups, total }) {
    const max = Math.max(1, ...groups.map(g => g.n));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {groups.map(g => (
          <div key={g.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "8px 10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{g.label}</div>
              <div style={{ fontSize: 11, color: "var(--pfg-fg-muted)", fontFamily: "ui-monospace,monospace" }}>
                {g.n} <span style={{ fontSize: 9 }}>PRs</span>
              </div>
            </div>
            <div style={{ marginTop: 4, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
              <div style={{ width: `${(g.n/max)*100}%`, height: "100%", background: "var(--pfg-spawn)" }}/>
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* helpers */
  const hdr = { fontSize: 9, letterSpacing: 1.6, fontWeight: 800, color: "var(--pfg-fg-muted)", marginBottom: 10 };
  const pillBtn = {
    display: "flex", alignItems: "center", gap: 6,
    padding: "8px 14px", borderRadius: 999,
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    color: "#cfd8dc", fontSize: 11, fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit"
  };
  const tinyTab = (on) => ({
    padding: "5px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700,
    background: on ? "rgba(0,188,212,0.14)" : "transparent",
    color: on ? "var(--pfg-accent)" : "var(--pfg-fg-muted)",
    border: "none", cursor: "pointer", fontFamily: "inherit"
  });
  const waterRow = {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 12px", borderRadius: 8,
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
    color: "var(--pfg-accent)"
  };
  const pinBadge = {
    fontSize: 9, fontWeight: 800, letterSpacing: 0.8,
    padding: "3px 6px", borderRadius: 3,
    background: "rgba(0,188,212,0.14)", color: "var(--pfg-accent)"
  };
  const prRow = {
    display: "flex", alignItems: "center", gap: 10,
    padding: "8px 10px", borderRadius: 8,
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)"
  };
  const BigStat = ({ label, value, sub }) => (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ fontSize: 9, letterSpacing: 1.4, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "ui-monospace,monospace", marginTop: 2 }}>{value}</div>
      {sub && <div style={{ fontSize: 9, color: "var(--pfg-fg-muted)", marginTop: 2 }}>{sub}</div>}
    </div>
  );

  Object.assign(window, { PfgProfileScreen: ProfileScreen });
})();
