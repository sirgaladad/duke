/* ============================================================
   PfgAuth — Login + Signup flow.
     LoginScreen     — email + Apple/Google
     SignupScreen    — three-step: account → home water → first card pull
   ============================================================ */

(function(){
  const I = window.PfgIcons;

  function AuthShell({ children, side }) {
    return (
      <div style={{
        position: "absolute", inset: 0, zIndex: 60,
        background: "rgba(8,16,26,0.85)", backdropFilter: "blur(8px)",
        display: "grid", placeItems: "center", padding: 24
      }}>
        <div style={{
          width: "min(880px, 100%)",
          background: "#0f2235", borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          display: "grid", gridTemplateColumns: "1fr 1.05fr",
          overflow: "hidden", minHeight: 520
        }}>
          {side}
          {children}
        </div>
      </div>
    );
  }

  function AuthSide() {
    return (
      <div style={{
        background: "linear-gradient(180deg, #0d2137 0%, #0a3d5c 100%)",
        padding: 36, display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "var(--pfg-grad-spawn-bar)"
        }}/>
        <div style={{ fontSize: 9, letterSpacing: 2, fontWeight: 700, color: "var(--pfg-accent)", opacity: 0.85 }}>
          POCKET FISHING GUIDE · ARKANSAS
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1.2, color: "#fff", marginTop: 14, lineHeight: 1.05 }}>
          Sign in to fish<br/>
          <span style={{ color: "var(--pfg-spawn)" }}>by the data.</span>
        </h1>
        <p style={{ fontSize: 13, color: "#cfd8dc", lineHeight: 1.55, marginTop: 14 }}>
          Personalized verdicts, your tackle box, your home waters,
          and the deck of 30 species cards — synced across devices.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: "22px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "Live PFG signals tuned to your home water",
            "Personal records & shareable angler card",
            "Tackle setups that re-rank by today's conditions",
            "Pocket Fishing the Game · play your collection"
          ].map((t, i) => (
            <li key={i} style={{ display: "flex", gap: 10, fontSize: 12, color: "#cfd8dc" }}>
              <span style={{
                width: 18, height: 18, borderRadius: "50%",
                background: "rgba(0,188,212,0.18)", color: "var(--pfg-accent)",
                display: "grid", placeItems: "center", fontSize: 11, fontWeight: 800, flexShrink: 0
              }}>✓</span>
              {t}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "auto", fontSize: 10, color: "var(--pfg-fg-muted)", letterSpacing: 1.4, fontWeight: 600 }}>
          BY TALE WATERS & TIDES
        </div>
      </div>
    );
  }

  /* ---------- Login ---------------------------------------- */
  function LoginScreen({ onLogin, onSwitchSignup, onClose }) {
    const [email, setEmail] = React.useState("river_runner@example.com");
    return (
      <AuthShell side={<AuthSide/>}>
        <div style={{ padding: 36, display: "flex", flexDirection: "column", position: "relative" }}>
          <button onClick={onClose} style={closeBtn}><I.Close size={16}/></button>
          <div style={{ fontSize: 9, letterSpacing: 1.6, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>
            WELCOME BACK
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "6px 0 22px", letterSpacing: -0.5 }}>
            Sign in to your dock.
          </h2>

          <button onClick={onLogin} style={socialBtn}>
            <I.Apple/> Continue with Apple
          </button>
          <button onClick={onLogin} style={{ ...socialBtn, marginTop: 8, background: "#fff", color: "#202124" }}>
            <I.Google/> Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0", color: "var(--pfg-fg-muted)", fontSize: 10, letterSpacing: 1.4 }}>
            <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }}/>
            OR EMAIL
            <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }}/>
          </div>

          <label style={fieldLabel}>EMAIL</label>
          <div style={fieldWrap}>
            <I.Mail size={15}/>
            <input value={email} onChange={(e) => setEmail(e.target.value)}
                   placeholder="you@water.com"
                   style={fieldInput}/>
          </div>

          <label style={{ ...fieldLabel, marginTop: 14 }}>PASSWORD</label>
          <div style={fieldWrap}>
            <span style={{ width: 15, color: "var(--pfg-fg-muted)" }}>🔒</span>
            <input type="password" defaultValue="••••••••••" style={fieldInput}/>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#cfd8dc" }}>
              <input type="checkbox" defaultChecked/> Remember me
            </label>
            <a style={{ fontSize: 11, color: "var(--pfg-accent)", fontWeight: 600, cursor: "pointer" }}>
              Forgot password?
            </a>
          </div>

          <button onClick={onLogin} style={primaryBtn}>Sign in →</button>

          <div style={{ marginTop: "auto", fontSize: 12, color: "var(--pfg-fg-muted)", textAlign: "center", paddingTop: 14 }}>
            New here? <a onClick={onSwitchSignup} style={{ color: "var(--pfg-accent)", fontWeight: 700, cursor: "pointer" }}>Create your dock →</a>
          </div>
        </div>
      </AuthShell>
    );
  }

  /* ---------- Signup --------------------------------------- */
  function SignupScreen({ onSignup, onSwitchLogin, onClose }) {
    const [step, setStep] = React.useState(1);
    const [data, setData] = React.useState({
      name: "", email: "",
      homeWater: "Norfork Tailwater",
      target: ["white_bass", "rainbow_trout"],
      skill: "intermediate"
    });

    const totalSteps = 3;

    return (
      <AuthShell side={<AuthSide/>}>
        <div style={{ padding: 32, display: "flex", flexDirection: "column", position: "relative" }}>
          <button onClick={onClose} style={closeBtn}><I.Close size={16}/></button>

          {/* progress */}
          <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
            {[1,2,3].map(n => (
              <div key={n} style={{
                flex: 1, height: 3, borderRadius: 2,
                background: n <= step ? "var(--pfg-accent)" : "rgba(255,255,255,0.08)"
              }}/>
            ))}
          </div>
          <div style={{ fontSize: 9, letterSpacing: 1.6, fontWeight: 800, color: "var(--pfg-fg-muted)" }}>
            STEP {step} OF {totalSteps}
          </div>

          {step === 1 && (
            <>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "6px 0 22px", letterSpacing: -0.5 }}>
                Build your dock.
              </h2>

              <button style={socialBtn}><I.Apple/> Continue with Apple</button>
              <button style={{ ...socialBtn, marginTop: 8, background: "#fff", color: "#202124" }}>
                <I.Google/> Continue with Google
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0", color: "var(--pfg-fg-muted)", fontSize: 10, letterSpacing: 1.4 }}>
                <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }}/>
                OR EMAIL
                <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }}/>
              </div>

              <label style={fieldLabel}>YOUR NAME</label>
              <div style={fieldWrap}>
                <I.Profile size={15}/>
                <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}
                       placeholder="Maddox L." style={fieldInput}/>
              </div>
              <label style={{ ...fieldLabel, marginTop: 12 }}>EMAIL</label>
              <div style={fieldWrap}>
                <I.Mail size={15}/>
                <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}
                       placeholder="you@water.com" style={fieldInput}/>
              </div>

              <button onClick={() => setStep(2)} style={primaryBtn}>Next: Home water →</button>
              <div style={{ marginTop: "auto", fontSize: 12, color: "var(--pfg-fg-muted)", textAlign: "center", paddingTop: 14 }}>
                Already have a dock? <a onClick={onSwitchLogin} style={{ color: "var(--pfg-accent)", fontWeight: 700, cursor: "pointer" }}>Sign in →</a>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "6px 0 6px", letterSpacing: -0.5 }}>
                Where do you fish?
              </h2>
              <p style={{ fontSize: 12, color: "var(--pfg-fg-muted)", margin: "0 0 18px" }}>
                We'll tune today's verdict and tackle picks to your home water.
              </p>

              <label style={fieldLabel}>HOME WATER</label>
              <div style={fieldWrap}>
                <I.Pin size={15}/>
                <select value={data.homeWater} onChange={(e) => setData({ ...data, homeWater: e.target.value })} style={fieldInput}>
                  <option>Norfork Tailwater</option>
                  <option>Bull Shoals Lake</option>
                  <option>Beaver Lake</option>
                  <option>Crooked Creek</option>
                  <option>Greers Ferry</option>
                  <option>Lake Conway</option>
                </select>
              </div>

              <label style={{ ...fieldLabel, marginTop: 14 }}>TARGET SPECIES (PICK 1–4)</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 6 }}>
                {[
                  { id: "white_bass", name: "White Bass" },
                  { id: "rainbow_trout", name: "Rainbow Trout" },
                  { id: "largemouth_bass", name: "Largemouth" },
                  { id: "smallmouth_bass", name: "Smallmouth" },
                  { id: "walleye", name: "Walleye" },
                  { id: "channel_catfish", name: "Catfish" }
                ].map(s => {
                  const on = data.target.includes(s.id);
                  return (
                    <button key={s.id} onClick={() => {
                      const next = on ? data.target.filter(x => x !== s.id)
                                      : [...data.target, s.id].slice(0,4);
                      setData({ ...data, target: next });
                    }} style={{
                      padding: "9px 12px", borderRadius: 8,
                      background: on ? "rgba(0,188,212,0.14)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${on ? "var(--pfg-accent)" : "rgba(255,255,255,0.08)"}`,
                      color: on ? "var(--pfg-accent)" : "#cfd8dc",
                      fontSize: 12, fontWeight: 700,
                      cursor: "pointer", fontFamily: "inherit", textAlign: "left"
                    }}>{on ? "✓ " : ""}{s.name}</button>
                  );
                })}
              </div>

              <label style={{ ...fieldLabel, marginTop: 14 }}>SKILL</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                {["beginner","intermediate","veteran"].map(s => {
                  const on = data.skill === s;
                  return (
                    <button key={s} onClick={() => setData({ ...data, skill: s })} style={{
                      padding: "9px 6px", borderRadius: 8,
                      background: on ? "rgba(0,188,212,0.14)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${on ? "var(--pfg-accent)" : "rgba(255,255,255,0.08)"}`,
                      color: on ? "var(--pfg-accent)" : "#cfd8dc",
                      fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                      cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize"
                    }}>{s}</button>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
                <button onClick={() => setStep(1)} style={ghostBtn}>← Back</button>
                <button onClick={() => setStep(3)} style={{ ...primaryBtn, marginTop: 0, flex: 1 }}>
                  Next: First card pull →
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "6px 0 6px", letterSpacing: -0.5 }}>
                Pull your first card.
              </h2>
              <p style={{ fontSize: 12, color: "var(--pfg-fg-muted)", margin: "0 0 16px" }}>
                Welcome gift — a starter card from your home water's deck.
              </p>

              <div style={{ display: "grid", placeItems: "center", padding: "8px 0" }}>
                <window.PfgSpeciesCardMini speciesId="white_bass" verdict="GO" temp="54.5°F" peakWindow={{ from: "05:42", to: "08:15" }}/>
              </div>

              <div style={{
                background: "rgba(0,188,212,0.08)", border: "1px dashed rgba(0,188,212,0.3)",
                borderRadius: 8, padding: 12, marginTop: 14, fontSize: 11, color: "#cfd8dc", lineHeight: 1.5
              }}>
                <b style={{ color: "var(--pfg-accent)" }}>Your starter deck:</b> 6 cards selected from your
                target species + home water — White Bass, Rainbow Trout, plus 4 surprise picks. Earn the
                rest by logging catches.
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 18 }}>
                <button onClick={() => setStep(2)} style={ghostBtn}>← Back</button>
                <button onClick={() => onSignup(data)} style={{ ...primaryBtn, marginTop: 0, flex: 1 }}>
                  Open the app →
                </button>
              </div>
            </>
          )}
        </div>
      </AuthShell>
    );
  }

  /* ---------- styles --------------------------------------- */
  const closeBtn = {
    position: "absolute", top: 14, right: 14,
    width: 32, height: 32, borderRadius: 8,
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
    color: "#cfd8dc", display: "grid", placeItems: "center", cursor: "pointer"
  };
  const socialBtn = {
    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
    padding: "11px 14px", borderRadius: 8,
    background: "#000", color: "#fff", fontSize: 13, fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontFamily: "inherit"
  };
  const fieldLabel = { fontSize: 9, letterSpacing: 1.4, fontWeight: 800, color: "var(--pfg-fg-muted)", display: "block", marginBottom: 6 };
  const fieldWrap = {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 12px", borderRadius: 8,
    background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)",
    color: "var(--pfg-fg-muted)"
  };
  const fieldInput = {
    flex: 1, background: "transparent", border: "none", outline: "none",
    color: "#fff", fontSize: 13, fontFamily: "inherit", padding: 0
  };
  const primaryBtn = {
    width: "100%", padding: "12px 16px", borderRadius: 8,
    background: "var(--pfg-accent)", color: "#0d1b2a",
    fontSize: 13, fontWeight: 800, letterSpacing: 0.3,
    border: "none", cursor: "pointer", marginTop: 18, fontFamily: "inherit"
  };
  const ghostBtn = {
    padding: "12px 16px", borderRadius: 8,
    background: "transparent", color: "#cfd8dc",
    fontSize: 13, fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.14)", cursor: "pointer", fontFamily: "inherit"
  };

  Object.assign(window, {
    PfgLogin: LoginScreen,
    PfgSignup: SignupScreen
  });
})();
