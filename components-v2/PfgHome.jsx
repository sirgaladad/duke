/* ============================================================
   PfgHome — landing page with hero variation switcher + below-fold
   sections (today's picks · spawn track preview · CTAs).
   Also exposes simple placeholder screens for routes we did not
   redesign in this round (Forecast, Technique, Access, Game).
   ============================================================ */

(function(){
  const I = window.PfgIcons;

  function HomeScreen({ user, signal, heroVariant, onHeroVariant, onRoute }) {
    const Hero = heroVariant === "card" ? window.PfgHeroCard
               : heroVariant === "dashboard" ? window.PfgHeroDashboard
               : window.PfgHeroVerdict;
    return (
      <div>
        <Hero user={user} signal={signal}/>

        {/* hero variant switcher (in-prototype only) */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 6,
          marginTop: 14, marginBottom: 22,
          padding: "8px 12px", borderRadius: 999,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          width: "fit-content", marginInline: "auto"
        }}>
          <span style={{ fontSize: 9, letterSpacing: 1.4, fontWeight: 800, color: "var(--pfg-fg-muted)", padding: "0 8px", alignSelf: "center" }}>
            HERO VARIATION
          </span>
          {[
            { id: "verdict",   label: "Verdict" },
            { id: "card",      label: "Card of the day" },
            { id: "dashboard", label: "Live dashboard" }
          ].map(v => {
            const on = heroVariant === v.id;
            return (
              <button key={v.id} onClick={() => onHeroVariant(v.id)} style={{
                padding: "5px 12px", borderRadius: 999,
                background: on ? "var(--pfg-accent)" : "transparent",
                color: on ? "#0d1b2a" : "#cfd8dc",
                fontSize: 11, fontWeight: 800, border: "none",
                cursor: "pointer", fontFamily: "inherit"
              }}>{v.label}</button>
            );
          })}
        </div>

        {/* Quick links to the new You surfaces */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 4
        }}>
          <QuickLink onClick={() => onRoute("species")} icon={<I.Species size={20}/>}
            title="Species" sub="22 / 30 caught" tone="var(--pfg-accent)"/>
          <QuickLink onClick={() => onRoute("tackle")} icon={<I.Tackle size={20}/>}
            title="Tackle Box" sub="5 setups · 8 GO matches" tone="var(--pfg-go)"/>
          <QuickLink onClick={() => onRoute("dock")} icon={<I.Dock size={20}/>}
            title="The Dock" sub="3 new matches" tone="var(--pfg-spawn)" badge="NEW"/>
          <QuickLink onClick={() => onRoute("game")} icon={<I.Game size={20}/>}
            title="Pocket Fishing the Game" sub="Today's spawn card unlocked" tone="var(--pfg-lunar)" badge="NEW"/>
        </div>
      </div>
    );
  }

  function QuickLink({ icon, title, sub, tone, badge, onClick }) {
    return (
      <button onClick={onClick} style={{
        textAlign: "left", padding: "16px 16px", borderRadius: 12,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        cursor: "pointer", fontFamily: "inherit",
        display: "flex", flexDirection: "column", gap: 8,
        transition: "background 120ms"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: `${tone}22`, color: tone,
            display: "grid", placeItems: "center"
          }}>{icon}</div>
          {badge && <span style={{
            fontSize: 8, fontWeight: 800, letterSpacing: 0.8,
            padding: "2px 5px", borderRadius: 3,
            background: "var(--pfg-spawn)", color: "#fff"
          }}>{badge}</span>}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{title}</div>
          <div style={{ fontSize: 11, color: "var(--pfg-fg-muted)", marginTop: 2 }}>{sub}</div>
        </div>
      </button>
    );
  }

  /* simple placeholders for the existing routes we kept */
  function PlaceholderScreen({ title, subtitle, body }) {
    return (
      <div style={{
        padding: 40, borderRadius: 16,
        background: "linear-gradient(135deg, #0d2137 0%, #0a3d5c 100%)",
        border: "1px solid rgba(255,255,255,0.06)"
      }}>
        <div style={{ fontSize: 9, letterSpacing: 1.6, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>
          EXISTING SCREEN · KEPT AS-IS
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: -1, margin: "8px 0 8px" }}>
          {title}
        </h1>
        <p style={{ fontSize: 14, color: "#cfd8dc", maxWidth: 540, lineHeight: 1.5 }}>{subtitle}</p>
        {body}
      </div>
    );
  }

  function GameScreen() {
    return (
      <div>
        <div style={{
          padding: 36, borderRadius: 16,
          background: "linear-gradient(135deg, #1a0d2a 0%, #0d1b2a 70%)",
          border: "2px solid var(--pfg-spawn)",
          position: "relative", overflow: "hidden"
        }}>
          <div style={{ fontSize: 9, letterSpacing: 1.6, fontWeight: 800, color: "var(--pfg-spawn)" }}>
            ● POCKET FISHING THE GAME · NEW
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: "#fff", letterSpacing: -1.5, margin: "10px 0 12px" }}>
            Play your collection.
          </h1>
          <p style={{ fontSize: 15, color: "#cfd8dc", maxWidth: 560, lineHeight: 1.5 }}>
            A Go Fish variant where live PFG signals change what every card is worth today.
            Pull cards from your deck of 30 species, book pairs, score multiplied by today's
            spawn-bar verdict.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            <button style={{
              padding: "12px 18px", borderRadius: 8,
              background: "var(--pfg-spawn)", color: "#fff",
              fontSize: 13, fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit"
            }}>Open the deck →</button>
            <button style={{
              padding: "12px 18px", borderRadius: 8,
              background: "transparent", color: "#cfd8dc",
              fontSize: 13, fontWeight: 700,
              border: "1px solid rgba(255,255,255,0.14)", cursor: "pointer", fontFamily: "inherit"
            }}>How it works</button>
          </div>
        </div>
        <div style={{ marginTop: 16, padding: 18, borderRadius: 12,
                      background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.1)",
                      fontSize: 12, color: "var(--pfg-fg-muted)", textAlign: "center" }}>
          Full game prototype is in <b style={{ color: "var(--pfg-accent)" }}>Fishing Card Game.html</b> —
          this nav link will deep-link there in production.
        </div>
      </div>
    );
  }

  Object.assign(window, {
    PfgHomeScreen: HomeScreen,
    PfgPlaceholderScreen: PlaceholderScreen,
    PfgGameScreen: GameScreen
  });
})();
