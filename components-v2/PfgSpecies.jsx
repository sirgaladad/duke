/* ============================================================
   PfgSpecies — Arkansas Field Guide
   Reads from window.SPECIES (data/species.js): real artwork,
   latin names, habitat, spawn windows, diet, baits, tackle,
   ID marks, tips, fun facts, conservation status, home lake,
   and gameplay stats (bite / fight / stealth).
   ============================================================ */
(function(){
  // Local catch overlay — what the user has logged. The full dataset
  // lives in window.SPECIES; we layer caught/PR on top so the field guide
  // shows both the natural-history facts AND the user's own log.
  const CAUGHT = {
    largemouth_bass:    { pr: 5.85, when: "Apr 12, 2026", where: "Lake Ouachita" },
    smallmouth_bass:    { pr: 4.10, when: "May 02, 2025", where: "Crooked Creek" },
    white_bass:         { pr: 2.80, when: "Mar 28, 2026", where: "Lake Maumelle" },
    hybrid_striped_bass:{ pr: 6.20, when: "Jun 18, 2025", where: "Beaver Lake" },
    black_crappie:      { pr: 1.70, when: "Apr 04, 2025", where: "Lake Greeson" },
    white_crappie:      { pr: 1.50, when: "Apr 06, 2025", where: "Lake Conway" },
    bluegill:           { pr: 0.85, when: "May 30, 2024", where: "Lake Hamilton" },
    green_sunfish:      { pr: 0.55, when: "Jun 15, 2024", where: "Bayou Bartholomew" },
    redear_sunfish:     { pr: 1.05, when: "May 22, 2025", where: "Lake Chicot" },
    rock_bass:          { pr: 0.95, when: "Jul 04, 2025", where: "Buffalo River" },
    channel_catfish:    { pr: 6.80, when: "Aug 11, 2024", where: "Arkansas River" },
    walleye:            { pr: 5.20, when: "Mar 14, 2026", where: "Greers Ferry" },
    rainbow_trout:      { pr: 2.10, when: "Feb 02, 2026", where: "Norfork tailwater" },
    brown_trout:        { pr: 11.4, when: "Nov 19, 2025", where: "Norfork tailwater", trophy: true },
    alligator_gar:      { pr: 38.0, when: "Jul 22, 2024", where: "Arkansas River backwater", trophy: true },
    longnose_gar:       { pr: 7.20, when: "Jun 02, 2025", where: "Lake Conway" },
    freshwater_drum:    { pr: 4.40, when: "May 17, 2025", where: "Arkansas River" },
    chain_pickerel:     { pr: 3.10, when: "Jan 28, 2026", where: "Lake Erling" }
  };

  /* Angler-friendly groupings — how a fisherman actually thinks about
     "what am I targeting today?", not taxonomic family names. */
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
  function groupOf(speciesId) {
    for (const g of ANGLER_GROUPS) if (g.ids.includes(speciesId)) return g.id;
    return "other";
  }

  const RARITY_KEY = (r) => (r || "").toLowerCase();
  const RARITY = {
    common:    { color: "#9fb5c7", label: "COMMON" },
    uncommon:  { color: "#4dd0e1", label: "UNCOMMON" },
    rare:      { color: "#ab47bc", label: "RARE" },
    legendary: { color: "#ff6b35", label: "LEGENDARY" }
  };
  const rarityOf = (sp) => RARITY[RARITY_KEY(sp.rarity)] || RARITY.common;

  function buildDeck() {
    const data = window.SPECIES || [];
    return data.map(sp => {
      const c = CAUGHT[sp.id];
      return { ...sp, caught: !!c, pr: c?.pr, prDate: c?.when, prLake: c?.where, trophy: !!(c && c.trophy) };
    });
  }

  function SpeciesScreen() {
    const deck = React.useMemo(buildDeck, []);
    const [filter, setFilter] = React.useState("all");
    const [groupFilter, setGroupFilter] = React.useState("all");
    const [activeId, setActiveId] = React.useState(deck.find(d => d.caught && d.trophy)?.id || deck[0]?.id);

    // Only show groups that contain at least one species in the loaded deck.
    const groups = React.useMemo(() => {
      return ANGLER_GROUPS
        .map(g => ({ ...g, count: deck.filter(d => g.ids.includes(d.id)).length }))
        .filter(g => g.count > 0);
    }, [deck]);

    const filtered = deck.filter(d => {
      if (groupFilter !== "all" && groupOf(d.id) !== groupFilter) return false;
      if (filter === "caught") return d.caught;
      if (filter === "locked") return !d.caught;
      if (filter === "trophy") return d.trophy;
      return true;
    });
    const active = deck.find(d => d.id === activeId) || deck[0];
    const caughtCount = deck.filter(d => d.caught).length;
    const trophyCount = deck.filter(d => d.trophy).length;

    if (!deck.length) {
      return <div style={{ padding: 40, color: "#cfd8dc" }}>Loading species deck…</div>;
    }

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18, gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 1.6, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>
              FIELD GUIDE · ARKANSAS DECK · 30 SPECIES
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: -0.6, margin: "4px 0 0" }}>
              Species <span style={{ color: "var(--pfg-accent)" }}>{caughtCount} / {deck.length}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--pfg-spawn)", marginLeft: 12 }}>★ {trophyCount} trophy</span>
            </h1>
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All", count: deck.length },
              { id: "caught", label: "Caught", count: caughtCount },
              { id: "locked", label: "Locked", count: deck.length - caughtCount },
              { id: "trophy", label: "★ Trophy", count: trophyCount }
            ].map(t => {
              const on = filter === t.id;
              return (
                <button key={t.id} onClick={() => setFilter(t.id)} style={{
                  padding: "8px 14px", borderRadius: 8,
                  background: on ? "rgba(0,188,212,0.14)" : "rgba(255,255,255,0.04)",
                  color: on ? "var(--pfg-accent)" : "#cfd8dc",
                  border: `1px solid ${on ? "var(--pfg-accent)" : "rgba(255,255,255,0.06)"}`,
                  fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: 6
                }}>{t.label} <span style={{ opacity: 0.6 }}>{t.count}</span></button>
              );
            })}
          </div>
        </div>

        {/* Angler group chips — how fishermen actually pick a target */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14, marginBottom: 14 }}>
          <button onClick={() => setGroupFilter("all")} style={{
            padding: "5px 11px", borderRadius: 999,
            background: groupFilter === "all" ? "rgba(255,107,53,0.16)" : "rgba(255,255,255,0.03)",
            color: groupFilter === "all" ? "var(--pfg-spawn)" : "var(--pfg-fg-muted)",
            border: `1px solid ${groupFilter === "all" ? "var(--pfg-spawn)" : "rgba(255,255,255,0.06)"}`,
            fontSize: 10, fontWeight: 700, letterSpacing: 0.4,
            cursor: "pointer", fontFamily: "inherit"
          }}>All species <span style={{ opacity: 0.6 }}>{deck.length}</span></button>
          {groups.map(g => {
            const on = groupFilter === g.id;
            return (
              <button key={g.id} onClick={() => setGroupFilter(g.id)} style={{
                padding: "5px 11px", borderRadius: 999,
                background: on ? "rgba(255,107,53,0.16)" : "rgba(255,255,255,0.03)",
                color: on ? "var(--pfg-spawn)" : "var(--pfg-fg-muted)",
                border: `1px solid ${on ? "var(--pfg-spawn)" : "rgba(255,255,255,0.06)"}`,
                fontSize: 10, fontWeight: 700, letterSpacing: 0.4,
                cursor: "pointer", fontFamily: "inherit",
                display: "inline-flex", alignItems: "center", gap: 5
              }}>{g.label} <span style={{ opacity: 0.6 }}>{g.count}</span></button>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 8,
            padding: 14,
            background: "rgba(0,0,0,0.25)", borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.06)",
            alignContent: "start"
          }}>
            {filtered.map(s => (
              <BinderCard key={s.id} sp={s} active={active?.id === s.id} onClick={() => setActiveId(s.id)}/>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1 / -1", padding: 30, textAlign: "center", color: "var(--pfg-fg-muted)", fontSize: 12 }}>
                No species match this filter.
              </div>
            )}
          </div>

          <FieldGuideDetail sp={active}/>
        </div>
      </div>
    );
  }

  function BinderCard({ sp, active, onClick }) {
    const r = rarityOf(sp);
    return (
      <button onClick={onClick} style={{
        aspectRatio: "0.72",
        background: sp.caught
          ? "linear-gradient(180deg, #1b2838 0%, #0d1b2a 100%)"
          : "rgba(0,0,0,0.4)",
        border: `2px solid ${active ? "var(--pfg-accent)" : sp.caught ? r.color + "88" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 8, padding: 8, cursor: "pointer",
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
        opacity: sp.caught ? 1 : 0.5,
        boxShadow: active ? "0 0 0 3px rgba(0,188,212,0.2)" : "none",
        fontFamily: "inherit", textAlign: "left"
      }}>
        {sp.trophy && (
          <div data-verdict-pill style={{
            position: "absolute", top: 4, right: 4,
            fontSize: 10, color: "var(--pfg-spawn)", fontWeight: 800
          }}>★</div>
        )}
        <div style={{ fontSize: 7, letterSpacing: 1, fontWeight: 800, color: r.color }}>
          {sp.caught ? r.label : "LOCKED"}
        </div>
        <div style={{
          flex: 1, display: "grid", placeItems: "center", margin: "4px 0",
          filter: sp.caught ? "none" : "grayscale(1) brightness(0.4)"
        }}>
          <img src={sp.art} alt={sp.name}
               style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain",
                        opacity: sp.caught ? 1 : 0.55 }}
               onError={(e)=>{ e.currentTarget.style.display="none"; }}/>
        </div>
        <div style={{ fontSize: 9, fontWeight: 800, color: sp.caught ? "#fff" : "var(--pfg-fg-muted)", lineHeight: 1.15, textAlign: "left" }}>
          {sp.caught ? sp.name : "???"}
        </div>
        {sp.caught && sp.pr && (
          <div style={{ fontSize: 8, color: "var(--pfg-fg-muted)", marginTop: 1, fontFamily: "ui-monospace,monospace" }}>
            PR {sp.pr.toFixed(2)} lb
          </div>
        )}
      </button>
    );
  }

  function FieldGuideDetail({ sp }) {
    if (!sp) return null;
    const r = rarityOf(sp);
    const groupId = groupOf(sp.id);
    const groupLabel = ANGLER_GROUPS.find(g => g.id === groupId)?.label;
    return (
      <div style={{
        padding: 18, borderRadius: 12,
        background: "linear-gradient(180deg, #1b2838 0%, #0d1b2a 100%)",
        border: `1px solid ${r.color}66`,
        position: "sticky", top: 90, alignSelf: "start", maxHeight: "calc(100vh - 110px)",
        overflowY: "auto"
      }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{
            padding: "3px 7px", borderRadius: 4, display: "inline-block",
            background: `${r.color}22`, color: r.color,
            fontSize: 9, fontWeight: 800, letterSpacing: 1
          }}>{r.label}{sp.trophy ? " · ★ TROPHY" : ""}</div>
          <div style={{
            padding: "3px 7px", borderRadius: 4,
            background: "rgba(255,255,255,0.04)", color: "var(--pfg-fg-muted)",
            fontSize: 9, fontWeight: 700, letterSpacing: 0.6
          }}>{(sp.native || "Native").toUpperCase()}</div>
          <div style={{
            padding: "3px 7px", borderRadius: 4,
            background: "rgba(76,175,80,0.12)", color: "var(--pfg-go)",
            fontSize: 9, fontWeight: 700, letterSpacing: 0.6
          }}>{(sp.conservation || "Secure").toUpperCase()}</div>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: -0.5, margin: "10px 0 0" }}>
          {sp.name}
        </h2>
        <div style={{ fontSize: 11, fontStyle: "italic", color: "var(--pfg-fg-muted)" }}>
          {sp.latin} · {groupLabel ? `${groupLabel} — ${sp.family}` : sp.family}
        </div>
        {sp.tagline && (
          <div style={{ fontSize: 12, color: "#cfd8dc", marginTop: 8, lineHeight: 1.45,
                        borderLeft: `2px solid ${r.color}`, paddingLeft: 10 }}>
            {sp.tagline}
          </div>
        )}

        {/* hero illustration block — REAL ART (full-width, never truncated) */}
        <div style={{
          marginTop: 14, aspectRatio: "16 / 9",
          width: "100%", borderRadius: 8,
          background: `radial-gradient(ellipse at center, ${r.color}33 0%, transparent 65%)`,
          display: "grid", placeItems: "center", overflow: "hidden",
          padding: 8
        }}>
          <img src={sp.art} alt={sp.name}
               style={{
                 width: "100%", height: "100%",
                 objectFit: "contain",
                 filter: sp.caught
                   ? "drop-shadow(0 4px 10px rgba(0,0,0,0.4))"
                   : "grayscale(0.7) brightness(0.55) drop-shadow(0 4px 10px rgba(0,0,0,0.4))"
               }}
               onError={(e)=>{ e.currentTarget.style.display="none"; }}/>
        </div>

        {/* Game stats: bite / fight / stealth */}
        {sp.stats && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 14 }}>
            <StatBar k="BITE"    v={sp.stats.bite}    color="var(--pfg-go)"/>
            <StatBar k="FIGHT"   v={sp.stats.fight}   color="var(--pfg-spawn)"/>
            <StatBar k="STEALTH" v={sp.stats.stealth} color="var(--pfg-lunar)"/>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
          <Stat k="SIZE"     v={sp.size?.common || "—"}/>
          <Stat k="MAX"      v={sp.size?.weight || "—"}/>
          <Stat k="SPAWN F°" v={sp.spawnF ? `${sp.spawnF.low}–${sp.spawnF.high}° (peak ${sp.spawnF.peak}°)` : "—"}/>
          <Stat k="SEASON"   v={sp.bestSeason || "—"}/>
          <Stat k="HABITAT"  v={sp.waterType?.join(" · ") || "—"} span={2}/>
          <Stat k="HOME"     v={sp.homeLake || "—"} span={2}/>
        </div>

        <Section title="DIET">{sp.diet}</Section>
        <Section title="HABITAT">{sp.habitat}</Section>

        {sp.baits && (
          <Section title="BAITS">
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}>
              {sp.baits.map(b => (
                <span key={b} style={{
                  padding: "3px 8px", borderRadius: 999,
                  background: "rgba(0,188,212,0.10)", color: "var(--pfg-accent)",
                  fontSize: 10, fontWeight: 700,
                  border: "1px solid rgba(0,188,212,0.3)"
                }}>{b}</span>
              ))}
            </div>
            {sp.tackle && (
              <div style={{ marginTop: 8, fontSize: 11, color: "var(--pfg-fg-muted)" }}>
                <b style={{ color: "#cfd8dc" }}>Tackle:</b> {sp.tackle}
              </div>
            )}
          </Section>
        )}

        {sp.idMarks && (
          <Section title="ID MARKS">
            <ul style={{ margin: "4px 0 0", paddingLeft: 16, color: "#cfd8dc", fontSize: 11, lineHeight: 1.55 }}>
              {sp.idMarks.map((m,i) => <li key={i}>{m}</li>)}
            </ul>
          </Section>
        )}

        {sp.tips && (
          <Section title="TACTICS">
            <ul style={{ margin: "4px 0 0", paddingLeft: 16, color: "#cfd8dc", fontSize: 11, lineHeight: 1.55 }}>
              {sp.tips.map((m,i) => <li key={i}>{m}</li>)}
            </ul>
          </Section>
        )}

        {sp.seasonNotes && (
          <Section title="SEASONAL PATTERN">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 4 }}>
              {Object.entries(sp.seasonNotes).map(([s, note]) => {
                const isBest = sp.bestSeason === s;
                return (
                  <div key={s} style={{
                    padding: 8, borderRadius: 6,
                    background: isBest ? "rgba(255,107,53,0.12)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isBest ? "var(--pfg-spawn)" : "rgba(255,255,255,0.05)"}`
                  }}>
                    <div style={{ fontSize: 8, letterSpacing: 1, fontWeight: 800,
                                  color: isBest ? "var(--pfg-spawn)" : "var(--pfg-fg-muted)" }}>
                      {s.toUpperCase()}{isBest ? " · BEST" : ""}
                    </div>
                    <div style={{ fontSize: 10, color: "#cfd8dc", marginTop: 2, lineHeight: 1.35 }}>{note}</div>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {sp.funFact && (
          <div style={{
            marginTop: 14, padding: 12, borderRadius: 8,
            background: "rgba(171,71,188,0.08)", border: "1px solid rgba(171,71,188,0.25)"
          }}>
            <div style={{ fontSize: 9, letterSpacing: 1.4, fontWeight: 800, color: "var(--pfg-lunar)" }}>
              ANGLER LORE
            </div>
            <div style={{ fontSize: 11, color: "#cfd8dc", marginTop: 4, lineHeight: 1.5 }}>
              {sp.funFact}
            </div>
          </div>
        )}

        {sp.range && (
          <div style={{ marginTop: 10, fontSize: 10, color: "var(--pfg-fg-muted)" }}>
            <b style={{ color: "#cfd8dc" }}>Range:</b> {sp.range}
          </div>
        )}

        {sp.caught && sp.pr && (
          <div style={{
            marginTop: 14, padding: 12, borderRadius: 8,
            background: "rgba(0,188,212,0.08)", border: "1px solid rgba(0,188,212,0.25)"
          }}>
            <div style={{ fontSize: 9, letterSpacing: 1.4, fontWeight: 800, color: "var(--pfg-accent)" }}>
              YOUR PR{sp.trophy ? " · ★ TROPHY" : ""}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "ui-monospace,monospace", marginTop: 2 }}>
              {sp.pr.toFixed(2)} <span style={{ fontSize: 11, color: "var(--pfg-fg-muted)" }}>lb</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--pfg-fg-muted)", marginTop: 2 }}>
              {sp.prDate} · {sp.prLake}
            </div>
          </div>
        )}
        {!sp.caught && (
          <div style={{
            marginTop: 14, padding: 12, borderRadius: 8,
            background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.14)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: 10, color: "var(--pfg-fg-muted)" }}>
              Not yet in your binder. Log a catch to unlock the card art.
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
          <button style={fillBtn}>Open card</button>
          <button style={ghostBtn}>{sp.caught ? "Log new PR" : "Log catch"}</button>
        </div>
      </div>
    );
  }

  function StatBar({ k, v, color }) {
    return (
      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: "8px 10px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 8, letterSpacing: 1.2, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>{k}</div>
          <div style={{ fontSize: 10, fontWeight: 800, color, fontFamily: "ui-monospace,monospace" }}>{v}</div>
        </div>
        <div style={{ marginTop: 4, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
          <div style={{ width: v + "%", height: "100%", background: color }}/>
        </div>
      </div>
    );
  }

  const Stat = ({ k, v, span }) => (
    <div style={{
      gridColumn: span ? `span ${span}` : "auto",
      background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: "8px 10px",
      border: "1px solid rgba(255,255,255,0.05)"
    }}>
      <div style={{ fontSize: 8, letterSpacing: 1.2, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>{k}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginTop: 2, lineHeight: 1.3 }}>{v}</div>
    </div>
  );

  const Section = ({ title, children }) => (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 9, letterSpacing: 1.4, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>{title}</div>
      <div style={{ fontSize: 11, color: "#cfd8dc", marginTop: 4, lineHeight: 1.5 }}>{children}</div>
    </div>
  );

  const fillBtn = {
    flex: 1, padding: "10px 12px", borderRadius: 8,
    background: "var(--pfg-accent)", color: "#0d1b2a",
    fontSize: 12, fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit"
  };
  const ghostBtn = {
    flex: 1, padding: "10px 12px", borderRadius: 8,
    background: "transparent", color: "#cfd8dc", border: "1px solid rgba(255,255,255,0.14)",
    fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
  };

  Object.assign(window, { PfgSpeciesScreen: SpeciesScreen });
})();
