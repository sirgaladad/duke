/* ============================================================
   Arkansas Sportfish — Card Game Dataset
   30 species. Every card needs: identity, stats, habitat, diet,
   seasonal pattern, baits/tackle, range, fun fact, conservation,
   spawn temp window, gameplay stats, rarity.
   Signals from PFG live-shape the card at runtime.
   ============================================================ */

window.SPECIES = [
  {
    id: "white_bass",
    name: "White Bass",
    latin: "Morone chrysops",
    family: "Moronidae",
    art: "assets/species/white_bass.png",
    tagline: "The spawning run every Ozark angler waits for.",
    waterType: ["Rivers", "Reservoirs", "Lakes"],
    size:    { common: "10–14 in", max: "17 in", weight: "Up to 4 lbs" },
    spawnF:  { low: 54, peak: 58, high: 68 },   // °F window
    bestSeason: "Spring",
    seasonNotes: {
      Spring: "PEAK — the run. Intercept at creek mouths.",
      Summer: "Schools chase shad in open water.",
      Fall:   "Fall feeding frenzy on shallow flats.",
      Winter: "Deep, slow. Vertical jigging."
    },
    habitat:  "Open reservoirs, tributary mouths, tailwaters. Schools in current seams.",
    diet:     "Shad, minnows, small crustaceans. Feeds by sight, in schools.",
    baits:    ["Rooster Tails", "Spoons", "Live minnows", "Blade baits"],
    tackle:   "Medium spinning, 6–10 lb line",
    idMarks:  ["Silver sides", "6–8 horizontal stripes", "Small mouth", "Two dorsal fins"],
    tips:     ["Find the school — find the run", "Match shad size", "First & last light"],
    funFact:  "A female can carry 500,000 eggs. The spawn run has males arriving days before the females — and the whole show can shift two weeks either way on water temp alone.",
    range:    "Statewide in major reservoirs and rivers.",
    homeLake: "Lake Maumelle",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Common",
    stats:    { bite: 78, fight: 62, stealth: 35 }
  },
  {
    id: "largemouth_bass",
    name: "Largemouth Bass",
    latin: "Micropterus salmoides",
    family: "Centrarchidae",
    art: "assets/species/largemouth_bass.png",
    tagline: "The tournament fish. Ambush predator of the vegetation.",
    waterType: ["Lakes", "Reservoirs", "Ponds", "Rivers"],
    size:    { common: "12–20 in", max: "25+ in", weight: "Up to 15+ lbs" },
    spawnF:  { low: 60, peak: 65, high: 75 },
    bestSeason: "Spring",
    seasonNotes: {
      Spring: "Pre-spawn to post-spawn — best bite of the year.",
      Summer: "Deep structure at dawn, shade at noon.",
      Fall:   "Chase shad into creeks.",
      Winter: "Slow jigs off main-lake points."
    },
    habitat:  "Weed edges, timber, dock pilings, creek arms.",
    diet:     "Bluegill, shad, crawfish, frogs, small mammals if desperate.",
    baits:    ["Plastic worms", "Jig & craw", "Topwater frogs", "Spinnerbaits"],
    tackle:   "Medium-heavy baitcaster, 14–20 lb line",
    idMarks:  ["Upper jaw extends past eye", "Broken lateral stripe", "Olive-green body"],
    tips:     ["Flip the thickest cover", "Slow down in cold water", "Target the shade line"],
    funFact:  "A guarded bass nest is so ingrained that a male will charge a bait fifteen times before eating it. Sight-fishing the spawn is equal parts aim and patience.",
    range:    "Every significant water body in Arkansas.",
    homeLake: "Lake Ouachita",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Common",
    stats:    { bite: 82, fight: 88, stealth: 55 }
  },
  {
    id: "smallmouth_bass",
    name: "Smallmouth Bass",
    latin: "Micropterus dolomieu",
    family: "Centrarchidae",
    art: "assets/species/smallmouth_bass.png",
    tagline: "Pound-for-pound, the hardest pull in the Ozarks.",
    waterType: ["Rivers", "Lakes", "Streams"],
    size:    { common: "10–18 in", max: "22 in", weight: "Up to 7 lbs" },
    spawnF:  { low: 59, peak: 63, high: 70 },
    bestSeason: "Spring",
    seasonNotes: {
      Spring: "Pre-spawn on rocky points.",
      Summer: "Cool, oxygenated current.",
      Fall:   "Aggressive on crawfish patterns.",
      Winter: "Deep bluff ends on main river."
    },
    habitat:  "Clear rocky rivers, bluff banks, gravel bars.",
    diet:     "Crawfish, hellgrammites, minnows, sculpins.",
    baits:    ["Ned rig", "Tubes", "Jerkbaits", "In-line spinners"],
    tackle:   "Medium spinning, 8–10 lb fluorocarbon",
    idMarks:  ["Bronze-brown body", "Vertical bars", "Red eye", "Jaw ends under eye"],
    tips:     ["Cast upstream, drift down", "Brown & orange mimic crawfish", "Target current seams"],
    funFact:  "Smallmouth are the reason anglers buy wading boots. They live in moving water and will leave a bed to chase a bait they didn't even see the first time.",
    range:    "Crooked Creek, Buffalo River, Kings River, White River.",
    homeLake: "Crooked Creek",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Uncommon",
    stats:    { bite: 80, fight: 94, stealth: 68 }
  },
  {
    id: "striped_bass",
    name: "Striped Bass",
    latin: "Morone saxatilis",
    family: "Moronidae",
    art: "assets/species/striped_bass.png",
    tagline: "The saltwater fish that forgot to leave.",
    waterType: ["Reservoirs", "Tailwaters"],
    size:    { common: "20–36 in", max: "50+ in", weight: "Up to 50+ lbs" },
    spawnF:  { low: 55, peak: 62, high: 68 },
    bestSeason: "Summer",
    seasonNotes: {
      Spring: "Follow shad into creek arms.",
      Summer: "Deep cool water layers.",
      Fall:   "Surface schooling on shad balls.",
      Winter: "Suspended on main-lake points."
    },
    habitat:  "Large reservoirs — Beaver, Ouachita, Norfork.",
    diet:     "Threadfin & gizzard shad. Almost exclusively.",
    baits:    ["Live shad", "Big topwater", "Flutter spoons", "Umbrella rigs"],
    tackle:   "Heavy 7'+, 30–50 lb braid",
    idMarks:  ["Unbroken horizontal stripes", "Silver sides", "Big shoulders"],
    tips:     ["Find the thermocline", "Match shad size exactly", "Dawn topwater"],
    funFact:  "Stripers need oxygenated cold water to survive July in Arkansas. In bad summers they stack up below dam tailraces — the only place they can breathe.",
    range:    "Lake Ouachita, Beaver, Norfork, Greers Ferry.",
    homeLake: "Lake Ouachita",
    conservation: "Secure",
    native:   "Introduced",
    rarity:   "Rare",
    stats:    { bite: 72, fight: 98, stealth: 48 }
  },
  {
    id: "black_crappie",
    name: "Black Crappie",
    latin: "Pomoxis nigromaculatus",
    family: "Centrarchidae",
    art: "assets/species/black_crappie.png",
    tagline: "Paper-mouthed, school-schooled, skillet-bound.",
    waterType: ["Lakes", "Reservoirs", "Oxbows"],
    size:    { common: "8–12 in", max: "16 in", weight: "Up to 3 lbs" },
    spawnF:  { low: 56, peak: 62, high: 68 },
    bestSeason: "Spring",
    seasonNotes: {
      Spring: "Shallow brush — 2 to 6 feet. Peak.",
      Summer: "Suspend over deep brush piles.",
      Fall:   "Move back shallow, brief window.",
      Winter: "Deep creek channels, 20–30 ft."
    },
    habitat:  "Standing timber, brush piles, dock pilings.",
    diet:     "Minnows, small shad, aquatic insects.",
    baits:    ["Minnows under a float", "Jigs on light line", "Tiny spinners"],
    tackle:   "Ultralight or 10–12' crappie pole, 4–6 lb line",
    idMarks:  ["Random black speckles", "7–8 dorsal spines", "Deep body"],
    tips:     ["Count down to depth", "Move until you find the school", "Vertical on brush"],
    funFact:  "Black crappie love clearer water than their white cousins. Side-by-side in the same lake, they'll hold deeper and tighter to cover.",
    range:    "Statewide; best in clear reservoirs.",
    homeLake: "Lake Greeson",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Common",
    stats:    { bite: 70, fight: 42, stealth: 60 }
  },
  {
    id: "white_crappie",
    name: "White Crappie",
    latin: "Pomoxis annularis",
    family: "Centrarchidae",
    art: "assets/species/white_crappie.png",
    tagline: "Muddy-water specialist. Prolific. Forgiving.",
    waterType: ["Lakes", "Reservoirs", "Rivers", "Oxbows"],
    size:    { common: "8–12 in", max: "15 in", weight: "Up to 2 lbs" },
    spawnF:  { low: 56, peak: 62, high: 68 },
    bestSeason: "Spring",
    seasonNotes: {
      Spring: "Shallow cover — bank-beatable.",
      Summer: "Suspend on ledges.",
      Fall:   "Scatter-feed on shad.",
      Winter: "Deep, slow, live minnows."
    },
    habitat:  "Stained & muddy reservoirs, river backwaters.",
    diet:     "Small shad, minnows, insect larvae.",
    baits:    ["Minnows", "Tube jigs", "Chartreuse anything"],
    tackle:   "Ultralight, 4–6 lb line",
    idMarks:  ["Vertical bars on side", "6 dorsal spines", "Longer snout than black"],
    tips:     ["Muddy water? Go chartreuse", "Brush is gold", "They stack by size"],
    funFact:  "State record is over 5 pounds. 'Slab' is a real word here — a crappie over a pound is worth the trip.",
    range:    "Statewide, dominant in turbid waters.",
    homeLake: "Lake Conway",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Common",
    stats:    { bite: 72, fight: 40, stealth: 50 }
  },
  {
    id: "bluegill",
    name: "Bluegill",
    latin: "Lepomis macrochirus",
    family: "Centrarchidae",
    art: "assets/species/bluegill.png",
    tagline: "Every angler's first fish. Still the best kids' catch in the state.",
    waterType: ["Ponds", "Lakes", "Rivers"],
    size:    { common: "6–9 in", max: "12 in", weight: "Up to 2 lbs" },
    spawnF:  { low: 67, peak: 75, high: 85 },
    bestSeason: "Summer",
    seasonNotes: {
      Spring: "Start moving shallow.",
      Summer: "PEAK — full moon beds, 2–4 ft.",
      Fall:   "Still aggressive; slow down.",
      Winter: "Deep, lethargic."
    },
    habitat:  "Any warm-water body in Arkansas.",
    diet:     "Insects, larvae, tiny minnows, worms.",
    baits:    ["Red worms", "Crickets", "Tiny poppers", "Beetle spins"],
    tackle:   "Cane pole to ultralight, 4 lb line",
    idMarks:  ["Solid black ear flap", "Vertical bars", "Deep, round body"],
    tips:     ["Fish the bed colonies", "Smaller hook than you think", "Full moon = beds"],
    funFact:  "Male bluegills fan gravel beds in colonies of dozens — a circle of saucers six feet across. Find one and you have fish for hours.",
    range:    "Literally every pond in Arkansas.",
    homeLake: "Farm ponds",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Common",
    stats:    { bite: 90, fight: 35, stealth: 25 }
  },
  {
    id: "channel_catfish",
    name: "Channel Catfish",
    latin: "Ictalurus punctatus",
    family: "Ictaluridae",
    art: "assets/species/channel_catfish.png",
    tagline: "Night-shift whiskered opportunist. The people's fish.",
    waterType: ["Rivers", "Lakes", "Reservoirs", "Ponds"],
    size:    { common: "12–24 in", max: "40+ in", weight: "Up to 30 lbs" },
    spawnF:  { low: 70, peak: 78, high: 85 },
    bestSeason: "Summer",
    seasonNotes: {
      Spring: "Pre-spawn on rising water.",
      Summer: "Peak — spawn in holes & undercut banks.",
      Fall:   "Heavy feed on falling temps.",
      Winter: "Deep channel holes."
    },
    habitat:  "River holes, riprap, reservoir channels.",
    diet:     "Anything. Live, dead, stinky — works.",
    baits:    ["Chicken liver", "Cut shad", "Stink bait", "Nightcrawlers"],
    tackle:   "Medium-heavy, 15–25 lb mono",
    idMarks:  ["Forked tail", "Dark spots on juveniles", "Smooth olive skin", "Long barbels"],
    tips:     ["Fish after dark", "Current seams hold the big ones", "Smellier is better"],
    funFact:  "A catfish has more taste buds on its body than a human has in their mouth. The barbels are just the start — the whole fish tastes the water.",
    range:    "Every river and reservoir in Arkansas.",
    homeLake: "Arkansas River",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Common",
    stats:    { bite: 85, fight: 74, stealth: 45 }
  },
  {
    id: "blue_catfish",
    name: "Blue Catfish",
    latin: "Ictalurus furcatus",
    family: "Ictaluridae",
    art: "assets/species/blue_catfish.png",
    tagline: "The big river monarch. Trophy water fish.",
    waterType: ["Rivers", "Large reservoirs"],
    size:    { common: "20–36 in", max: "60+ in", weight: "Up to 100+ lbs" },
    spawnF:  { low: 70, peak: 75, high: 82 },
    bestSeason: "Summer",
    seasonNotes: {
      Spring: "Pre-spawn — follow shad into coves.",
      Summer: "Big river channel drift.",
      Fall:   "Best trophy window.",
      Winter: "Hold deep on main river."
    },
    habitat:  "Arkansas, White, Mississippi river main channels.",
    diet:     "Live & cut shad, skipjack, carp chunks.",
    baits:    ["Cut skipjack", "Live bluegill (regulated)", "Whole shad heads"],
    tackle:   "Heavy rod, 50–80 lb braid",
    idMarks:  ["Smooth straight-edge anal fin", "Blue-slate back", "Deeply forked tail"],
    tips:     ["Anchor on ledges", "Drift baits in current", "Fresh cut bait beats frozen"],
    funFact:  "The Arkansas state record is 116 pounds. Somewhere in the Mississippi River right now, a blue catfish older than most anglers is eating a whole gizzard shad in one bite.",
    range:    "Arkansas, Mississippi, lower White rivers.",
    homeLake: "Mississippi River",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Rare",
    stats:    { bite: 78, fight: 96, stealth: 52 }
  },
  {
    id: "walleye",
    name: "Walleye",
    latin: "Sander vitreus",
    family: "Percidae",
    art: "assets/species/walleye.png",
    tagline: "Low-light hunter. Arkansas's northernmost gamefish.",
    waterType: ["Lakes", "Rivers"],
    size:    { common: "14–22 in", max: "30 in", weight: "Up to 15+ lbs" },
    spawnF:  { low: 42, peak: 46, high: 52 },
    bestSeason: "Spring",
    seasonNotes: {
      Spring: "Pre-spawn run into tributaries.",
      Summer: "Deep thermocline, night bite.",
      Fall:   "Aggressive on jigs.",
      Winter: "Slow deep jigging."
    },
    habitat:  "Greers Ferry, Beaver, Bull Shoals. Clear cold water.",
    diet:     "Shad, minnows, small panfish.",
    baits:    ["Jig + minnow", "Bottom bouncers", "Crankbaits at dusk"],
    tackle:   "Medium spinning, 8–10 lb fluorocarbon",
    idMarks:  ["Marble-glass eye", "Spiny dorsal + soft dorsal", "White tip on tail"],
    tips:     ["Fish low light", "Stain your jig head with nail polish", "Slow drift"],
    funFact:  "The walleye's tapetum lucidum — a reflective layer behind the retina — is why their eyes glow. It lets them hunt in light levels where you can't see your own boat.",
    range:    "Northern reservoirs; native pop. Greers Ferry.",
    homeLake: "Greers Ferry Lake",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Rare",
    stats:    { bite: 68, fight: 70, stealth: 88 }
  },
  {
    id: "rainbow_trout",
    name: "Rainbow Trout",
    latin: "Oncorhynchus mykiss",
    family: "Salmonidae",
    art: "assets/species/rainbow_trout.png",
    tagline: "Year-round cold-water quarry. Tailwater gold.",
    waterType: ["Tailwaters", "Streams", "Cold lakes"],
    size:    { common: "10–16 in", max: "30+ in", weight: "Up to 19 lbs (state)" },
    spawnF:  { low: 42, peak: 48, high: 55 },
    bestSeason: "Winter",
    seasonNotes: {
      Spring: "High generation — drift patterns.",
      Summer: "Dawn & dusk near oxygenated water.",
      Fall:   "Aggressive on streamers.",
      Winter: "PEAK — low flows, best sight fishing."
    },
    habitat:  "Below dams: Bull Shoals, Norfork, Beaver, Greers.",
    diet:     "Sow bugs, midges, scuds, small baitfish.",
    baits:    ["Power Bait", "Corn", "Woolly buggers", "Pheasant tail nymph"],
    tackle:   "Light spinning, 4 lb line; or 5wt fly",
    idMarks:  ["Pink side stripe", "Heavy black spots", "White mouth"],
    tips:     ["Match the generation schedule", "Drift with current", "Smaller is better"],
    funFact:  "Every rainbow in Arkansas is stocked. The tailwaters below Bull Shoals stay cold enough year-round to support trout — a freshwater miracle in the South.",
    range:    "Tailwaters of White, Norfork, Little Red.",
    homeLake: "Bull Shoals Tailwater",
    conservation: "Stocked",
    native:   "Introduced",
    rarity:   "Uncommon",
    stats:    { bite: 74, fight: 78, stealth: 80 }
  },
  {
    id: "brown_trout",
    name: "Brown Trout",
    latin: "Salmo trutta",
    family: "Salmonidae",
    art: "assets/species/brown_trout.png",
    tagline: "Ghost of the tailwater. State-record 40+ pounds.",
    waterType: ["Tailwaters", "Streams"],
    size:    { common: "12–20 in", max: "40+ in", weight: "40+ lbs (state)" },
    spawnF:  { low: 44, peak: 48, high: 54 },
    bestSeason: "Fall",
    seasonNotes: {
      Spring: "Midge hatches, subtle drifts.",
      Summer: "Big browns hide. Night bite.",
      Fall:   "PEAK — pre-spawn, aggressive.",
      Winter: "Spawning closure on redds."
    },
    habitat:  "White River, Little Red, Norfork tailwater.",
    diet:     "Sculpins, crawfish, shad, other trout.",
    baits:    ["Big streamers", "Jerkbaits", "Sculpin patterns"],
    tackle:   "Medium spinning or 7-wt fly",
    idMarks:  ["Red spots with blue halos", "Buttery-yellow sides", "Square tail"],
    tips:     ["Big fly, big fish", "Fish overcast, high-flow days", "Respect redds in winter"],
    funFact:  "Rip Collins caught a 40 lb 4 oz brown trout on the Little Red River in 1992 — held the IGFA world record for two decades. That fish is why anglers still drive overnight to cast at dawn.",
    range:    "White River system tailwaters.",
    homeLake: "Norfork Tailwater",
    conservation: "Stocked",
    native:   "Introduced",
    rarity:   "Legendary",
    stats:    { bite: 62, fight: 92, stealth: 94 }
  },
  {
    id: "alligator_gar",
    name: "Alligator Gar",
    latin: "Atractosteus spatula",
    family: "Lepisosteidae",
    art: "assets/species/alligator_gar.png",
    tagline: "Living fossil. Apex predator of slow southern water.",
    waterType: ["Rivers", "Oxbows", "Backwaters", "Reservoirs"],
    size:    { common: "4–6 ft", max: "8+ ft", weight: "Up to 300+ lbs" },
    spawnF:  { low: 68, peak: 74, high: 82 },
    bestSeason: "Summer",
    seasonNotes: {
      Spring: "Hold in deep warm pockets.",
      Summer: "PEAK — cruise the surface in heat.",
      Fall:   "Still active on warm afternoons.",
      Winter: "Dormant in deep holes."
    },
    habitat:  "Lower White, Arkansas, Mississippi systems. Slow muddy water.",
    diet:     "Whole fish — buffalo, carp, gar. Opportunistic.",
    baits:    ["Cut mullet", "Cut buffalo", "Rope lures (frayed nylon)"],
    tackle:   "Very heavy — 100 lb braid + wire leader",
    idMarks:  ["Alligator-like snout with two tooth rows", "Olive diamond scales", "Blunt head"],
    tips:     ["CPR — catch, photo, release", "Use a bite guard", "Give them time to swallow"],
    funFact:  "Alligator gar predate the dinosaurs by about 50 million years. Their scales are hard enough that pre-contact peoples used them as arrowheads — and they can breathe air from the surface when water goes anoxic.",
    range:    "Lower Arkansas, White, Mississippi river systems.",
    homeLake: "Lower White River",
    conservation: "Vulnerable",
    native:   "Native",
    rarity:   "Legendary",
    stats:    { bite: 60, fight: 99, stealth: 72 }
  },

  /* ============================================================
     CENTRARCHIDAE expansion — bass & sunfish
     ============================================================ */
  {
    id: "kentucky_bass",
    name: "Kentucky Bass",
    latin: "Micropterus punctulatus",
    family: "Centrarchidae",
    art: "assets/species/kentucky_bass.png",
    tagline: "Spotted bass. The deep, clear-water cousin of the Ozarks.",
    waterType: ["Rivers", "Reservoirs", "Lakes"],
    size:    { common: "10–17 in", max: "24 in", weight: "Up to 8 lbs" },
    spawnF:  { low: 60, peak: 65, high: 70 },
    bestSeason: "Spring",
    seasonNotes: {
      Spring: "Pre-spawn on rocky points & gravel.",
      Summer: "Suspend deep on bluff ends.",
      Fall:   "Chase shad up creek arms.",
      Winter: "Deep — 30+ ft on points."
    },
    habitat:  "Deep, clear reservoirs. Rocky points, bluff walls, river current.",
    diet:     "Crawfish, shad, small minnows.",
    baits:    ["Drop shot", "Shaky head", "Spoons", "Small swimbaits"],
    tackle:   "Medium spinning, 8–10 lb fluorocarbon",
    idMarks:  ["Tongue patch", "Rows of small spots below lateral line", "Diamond cheek scales"],
    tips:     ["Fish vertical on bluffs", "Smaller bait than largemouth", "Drop shot for finicky fish"],
    funFact:  "Spotted bass have a small patch of teeth on the tongue — slide a finger across and you'll feel sandpaper. It's the easiest way to tell them from a largemouth in the boat.",
    range:    "Beaver, Bull Shoals, Norfork; Buffalo & White rivers.",
    homeLake: "Beaver Lake",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Uncommon",
    stats:    { bite: 76, fight: 84, stealth: 70 }
  },
  {
    id: "rock_bass",
    name: "Rock Bass",
    latin: "Ambloplites rupestris",
    family: "Centrarchidae",
    art: "assets/species/rock_bass.png",
    tagline: "Goggle-eye. The Ozark stream's punchy little brawler.",
    waterType: ["Streams", "Rivers", "Clear lakes"],
    size:    { common: "6–10 in", max: "13 in", weight: "Up to 1.5 lbs" },
    spawnF:  { low: 60, peak: 66, high: 70 },
    bestSeason: "Summer",
    seasonNotes: {
      Spring: "Move shallow as water warms.",
      Summer: "PEAK — under shade ledges.",
      Fall:   "Aggressive on falling temps.",
      Winter: "Deep pools, slow."
    },
    habitat:  "Clear Ozark streams. Boulders, bedrock ledges, undercut banks.",
    diet:     "Crawfish, hellgrammites, small minnows, insects.",
    baits:    ["Crawfish-pattern jigs", "In-line spinners", "Live crickets"],
    tackle:   "Ultralight, 4–6 lb line",
    idMarks:  ["Red eye", "Stout body", "Dark splotches", "Six anal spines"],
    tips:     ["Fish ledge shadows", "Drift a jig under the bank", "They live where smallmouth live"],
    funFact:  "Rock bass eyes flash bright red in the right light — the local nickname 'goggle-eye' is more accurate than scientific.",
    range:    "Buffalo, White, Kings, Crooked Creek systems.",
    homeLake: "Buffalo River",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Common",
    stats:    { bite: 78, fight: 60, stealth: 55 }
  },
  {
    id: "warmouth",
    name: "Warmouth",
    latin: "Lepomis gulosus",
    family: "Centrarchidae",
    art: "assets/species/warmouth.png",
    tagline: "Stump-knocker. The bayou's mean-eyed sunfish.",
    waterType: ["Swamps", "Oxbows", "Slow rivers", "Ponds"],
    size:    { common: "6–10 in", max: "12 in", weight: "Up to 2 lbs" },
    spawnF:  { low: 70, peak: 73, high: 80 },
    bestSeason: "Summer",
    seasonNotes: {
      Spring: "Move shallow late spring.",
      Summer: "PEAK — heavy cover, stumps.",
      Fall:   "Still aggressive in shallows.",
      Winter: "Mud bottom, very slow."
    },
    habitat:  "Cypress knees, lily pads, stump fields. Mud-bottom backwaters.",
    diet:     "Crawfish, small fish, dragonfly larvae, frogs.",
    baits:    ["Live worms", "Jig-and-pig", "Small spinnerbaits"],
    tackle:   "Ultralight, 6 lb line",
    idMarks:  ["Big mouth", "Three dark stripes from eye", "Mottled brown body"],
    tips:     ["Flip cover", "Bigger bait than bluegill", "Bayou backwaters"],
    funFact:  "Warmouth have teeth on their tongue — like spotted bass — and a mouth bigger than any sunfish has a right to. They eat like miniature largemouth.",
    range:    "Lower Mississippi, White, Ouachita drainages.",
    homeLake: "Bayou Bartholomew",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Common",
    stats:    { bite: 80, fight: 50, stealth: 40 }
  },
  {
    id: "green_sunfish",
    name: "Green Sunfish",
    latin: "Lepomis cyanellus",
    family: "Centrarchidae",
    art: "assets/species/green_sunfish.png",
    tagline: "The aggressive runt. Will hit anything that moves.",
    waterType: ["Creeks", "Ponds", "Lakes", "Drainage ditches"],
    size:    { common: "4–7 in", max: "10 in", weight: "Up to 1 lb" },
    spawnF:  { low: 68, peak: 75, high: 82 },
    bestSeason: "Summer",
    seasonNotes: {
      Spring: "Move shallow early.",
      Summer: "PEAK — full sun, bank-beatable.",
      Fall:   "Still hammering anything small.",
      Winter: "Suspend in deeper holes."
    },
    habitat:  "Any small water in Arkansas — survives where bluegill won't.",
    diet:     "Insects, larvae, small minnows. Indiscriminate.",
    baits:    ["Tiny inline spinners", "Worm chunks", "Wet flies"],
    tackle:   "Cane pole or ultralight, 4 lb line",
    idMarks:  ["Big mouth (largest of sunfish)", "Yellow-edged fins", "Blue-green sheen"],
    tips:     ["Cast small, fast", "Banks of farm ponds", "Great kid fish"],
    funFact:  "Green sunfish are the survivors. They tolerate low oxygen, high temps, muddy water, and tiny puddles. After droughts, they're often the first fish to recolonize.",
    range:    "Statewide — every creek and pond.",
    homeLake: "Farm ponds",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Common",
    stats:    { bite: 92, fight: 30, stealth: 20 }
  },
  {
    id: "longear_sunfish",
    name: "Longear Sunfish",
    latin: "Lepomis megalotis",
    family: "Centrarchidae",
    art: "assets/species/longear_sunsfish.png",
    tagline: "The prettiest fish in Arkansas. Stained-glass on a hook.",
    waterType: ["Streams", "Rivers", "Clear lakes"],
    size:    { common: "4–7 in", max: "9 in", weight: "Under 1 lb" },
    spawnF:  { low: 68, peak: 72, high: 76 },
    bestSeason: "Summer",
    seasonNotes: {
      Spring: "Build colony beds late spring.",
      Summer: "PEAK — colorful breeding males.",
      Fall:   "Slowing, but still active.",
      Winter: "Deep pools, dormant."
    },
    habitat:  "Clear, gravel-bottom Ozark streams with steady current.",
    diet:     "Insects, small crustaceans, snails.",
    baits:    ["Tiny dry flies", "Wet flies", "Bits of worm"],
    tackle:   "Fly rod 3-wt or ultralight, 2–4 lb line",
    idMarks:  ["Long black ear flap with white edge", "Turquoise & orange stripes on face"],
    tips:     ["Sight-fish riffle tails", "Tiny flies", "C&R — they're gorgeous"],
    funFact:  "Spawning male longears might be the most colorful freshwater fish in North America — turquoise, copper, orange, edged in cream. Hold one wet in sun and you'll forget about catching trout.",
    range:    "Ozark + Ouachita stream systems.",
    homeLake: "Kings River",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Common",
    stats:    { bite: 75, fight: 32, stealth: 30 }
  },
  {
    id: "redear_sunfish",
    name: "Redear Sunfish",
    latin: "Lepomis microlophus",
    family: "Centrarchidae",
    art: "assets/species/redear_sunfish.png",
    tagline: "Shellcracker. Bottom-feeding panfish that crushes snails.",
    waterType: ["Lakes", "Reservoirs", "Slow rivers"],
    size:    { common: "8–12 in", max: "15 in", weight: "Up to 4 lbs" },
    spawnF:  { low: 66, peak: 72, high: 80 },
    bestSeason: "Spring",
    seasonNotes: {
      Spring: "PEAK — bed in firm-bottom shallows.",
      Summer: "Move to 8–12 ft over snail beds.",
      Fall:   "Slow but still feeding bottom.",
      Winter: "Deep, lethargic."
    },
    habitat:  "Hard-bottom flats with snails and freshwater clams.",
    diet:     "Snails, clams, mussels — crushes shells with throat teeth.",
    baits:    ["Red worms on bottom", "Crickets", "Small jigs tipped with worm"],
    tackle:   "Light spinning, 6 lb line",
    idMarks:  ["Bright red/orange ear flap edge", "Olive back", "Rounded body"],
    tips:     ["Fish bottom on a slip-shot rig", "Find shell beds = find redears", "Slower than bluegill"],
    funFact:  "The 'shellcracker' nickname is no joke — redears have specialized pharyngeal teeth that crush snail shells. State record is over 2 lbs of one of the prettiest panfish you can put in a skillet.",
    range:    "Statewide; thrives in clearer reservoirs.",
    homeLake: "Lake Monticello",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Common",
    stats:    { bite: 72, fight: 48, stealth: 38 }
  },

  /* ============================================================
     MORONIDAE expansion — temperate bass
     ============================================================ */
  {
    id: "hybrid_striped_bass",
    name: "Hybrid Striped Bass",
    latin: "Morone saxatilis × chrysops",
    family: "Moronidae",
    art: "assets/species/hybrid_striped_bass.png",
    tagline: "Wiper. Bred for muscle. Bred for the fight.",
    waterType: ["Reservoirs", "Tailwaters"],
    size:    { common: "16–24 in", max: "30 in", weight: "Up to 27 lbs (state)" },
    spawnF:  { low: 58, peak: 64, high: 68 },
    bestSeason: "Summer",
    seasonNotes: {
      Spring: "Follow shad into creeks.",
      Summer: "Schooling blitzes on shad balls.",
      Fall:   "PEAK — surface feed frenzies.",
      Winter: "Deep main-lake structure."
    },
    habitat:  "Open reservoir water — Beaver, Norfork, Greers Ferry.",
    diet:     "Threadfin shad. Almost exclusively.",
    baits:    ["Live shad", "Topwater poppers", "Big spoons", "Bucktails"],
    tackle:   "Heavy 7'+, 30–40 lb braid",
    idMarks:  ["Broken horizontal stripes (key ID)", "Thicker body than white bass"],
    tips:     ["Watch the gulls", "Cast under the school", "Small bait, big school"],
    funFact:  "Hybrids are sterile — bred at hatcheries from striper × white bass and stocked in reservoirs that can't sustain pure stripers. The trade-off: faster growth, harder fight, no spawning run to manage.",
    range:    "Lake Norfork, Greers Ferry, Beaver, Ouachita.",
    homeLake: "Lake Norfork",
    conservation: "Stocked",
    native:   "Hybrid",
    rarity:   "Uncommon",
    stats:    { bite: 84, fight: 95, stealth: 50 }
  },
  {
    id: "yellow_bass",
    name: "Yellow Bass",
    latin: "Morone mississippiensis",
    family: "Moronidae",
    art: "assets/species/yellow_bass.png",
    tagline: "Stripey. The Mississippi backwater's golden runt.",
    waterType: ["Oxbows", "Slow rivers", "Reservoirs"],
    size:    { common: "6–10 in", max: "14 in", weight: "Up to 2.5 lbs" },
    spawnF:  { low: 58, peak: 62, high: 65 },
    bestSeason: "Spring",
    seasonNotes: {
      Spring: "Spawning runs into tributaries.",
      Summer: "Schools in open water.",
      Fall:   "Shad chase, mixed schools.",
      Winter: "Deep oxbow holes."
    },
    habitat:  "Mississippi River oxbows, lower Arkansas River backwaters.",
    diet:     "Small shad, minnows, insects.",
    baits:    ["Small jigs", "Beetle spins", "Live minnows"],
    tackle:   "Ultralight, 6 lb line",
    idMarks:  ["Yellow flanks", "Broken stripes (offset)", "Smaller than white bass"],
    tips:     ["Find the school = limit fast", "Tiny lures only", "Backwater oxbows after high water"],
    funFact:  "Yellow bass spawn earlier and shorter than white bass — by the time the white bass run is famous, the yellows are already done. Locals who know the timing fill coolers.",
    range:    "Lower White, Arkansas, Mississippi backwaters.",
    homeLake: "Lake Chicot",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Uncommon",
    stats:    { bite: 75, fight: 55, stealth: 45 }
  },

  /* ============================================================
     SALMONIDAE expansion — trout
     ============================================================ */
  {
    id: "brook_trout",
    name: "Brook Trout",
    latin: "Salvelinus fontinalis",
    family: "Salmonidae",
    art: "assets/species/brook_trout.png",
    tagline: "The rarest trout in the state. Vermiculated jewel.",
    waterType: ["Tailwaters", "Cold streams"],
    size:    { common: "8–12 in", max: "16 in", weight: "Up to 5 lbs (state)" },
    spawnF:  { low: 44, peak: 47, high: 52 },
    bestSeason: "Fall",
    seasonNotes: {
      Spring: "Drift midges in cold flows.",
      Summer: "Hold tight to oxygenated cold pockets.",
      Fall:   "PEAK — pre-spawn aggression.",
      Winter: "Slow drifts, sight-fish."
    },
    habitat:  "Cold tailwater pockets — Norfork, Little Red on cold years.",
    diet:     "Midges, scuds, sow bugs, small minnows.",
    baits:    ["Tiny midge nymphs", "Wax worms", "Mini Power Bait"],
    tackle:   "Ultralight or 4-wt fly, 2–4 lb tippet",
    idMarks:  ["Vermiculated dark back", "Red spots in blue halos", "White-edged fins"],
    tips:     ["Drift dead-naturally", "Tiny flies (#18-22)", "C&R — they're stocked sparingly"],
    funFact:  "Brook trout are technically char, not trout. Arkansas only has them where the water stays cold enough year-round — which in our climate is a very short list.",
    range:    "Norfork tailwater (limited stocking).",
    homeLake: "Norfork Tailwater",
    conservation: "Stocked",
    native:   "Introduced",
    rarity:   "Rare",
    stats:    { bite: 65, fight: 70, stealth: 92 }
  },

  /* ============================================================
     PERCIDAE expansion — perch family
     ============================================================ */
  {
    id: "sauger",
    name: "Sauger",
    latin: "Sander canadensis",
    family: "Percidae",
    art: "assets/species/sauger.png",
    tagline: "Walleye's river cousin. Master of muddy current.",
    waterType: ["Rivers", "Tailwaters"],
    size:    { common: "12–18 in", max: "24 in", weight: "Up to 5 lbs" },
    spawnF:  { low: 38, peak: 44, high: 50 },
    bestSeason: "Winter",
    seasonNotes: {
      Spring: "Pre-spawn run below dams.",
      Summer: "Deep current channels.",
      Fall:   "Aggressive on jig & minnow.",
      Winter: "PEAK — concentrate below dams."
    },
    habitat:  "Arkansas River tailwaters; Mississippi main channel.",
    diet:     "Shad, minnows, small crawfish.",
    baits:    ["Jig & minnow", "Small crankbaits", "Bottom-bouncers"],
    tackle:   "Medium spinning, 8 lb line",
    idMarks:  ["Spotted dorsal fin", "Saddles on sides", "No white tail tip"],
    tips:     ["Fish below dams in winter", "Vertical jig the deep slot", "Slow"],
    funFact:  "Sauger handle muddy, fast water that walleye won't touch. They have an even better tapetum lucidum — turbid-water vision that makes them apex predators in the lower Arkansas.",
    range:    "Arkansas River tailwaters; Mississippi.",
    homeLake: "Arkansas River",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Uncommon",
    stats:    { bite: 70, fight: 68, stealth: 86 }
  },

  /* ============================================================
     ESOCIDAE — pike family
     ============================================================ */
  {
    id: "chain_pickerel",
    name: "Chain Pickerel",
    latin: "Esox niger",
    family: "Esocidae",
    art: "assets/species/chain_pickerel.png",
    tagline: "Slough shark. Toothy ambusher of the Delta.",
    waterType: ["Oxbows", "Swamps", "Slow rivers", "Lakes"],
    size:    { common: "16–24 in", max: "30 in", weight: "Up to 9 lbs" },
    spawnF:  { low: 44, peak: 48, high: 52 },
    bestSeason: "Spring",
    seasonNotes: {
      Spring: "PEAK — pre-spawn ambush feeders.",
      Summer: "Hide in vegetation.",
      Fall:   "Aggressive on falling temps.",
      Winter: "Slow but catchable."
    },
    habitat:  "Lily pads, hydrilla, cypress backwaters. Anywhere with weeds.",
    diet:     "Smaller fish — bluegill, shiners, frogs.",
    baits:    ["Inline spinners", "Spoons", "Topwater frogs", "Fluke-style soft baits"],
    tackle:   "Medium baitcaster, wire leader, 14–17 lb line",
    idMarks:  ["Dark chain pattern on green sides", "Duckbill snout", "Sharp teeth"],
    tips:     ["Wire leader is mandatory", "Fast-moving lures", "Edge of the weeds"],
    funFact:  "A chain pickerel will hit a topwater so hard you'll think you snagged a log. Arkansas state record is 9 lb 4 oz — and southern pickerel grow bigger and faster than their northern cousins.",
    range:    "Delta lakes, Bayou Bartholomew, lower White River.",
    homeLake: "Big Lake",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Uncommon",
    stats:    { bite: 80, fight: 86, stealth: 60 }
  },
  {
    id: "grass_pickerel",
    name: "Grass Pickerel",
    latin: "Esox americanus vermiculatus",
    family: "Esocidae",
    art: "assets/species/grass_pickerel.png",
    tagline: "Pocket-sized predator. Tiny teeth, big attitude.",
    waterType: ["Backwaters", "Sloughs", "Vegetated ponds"],
    size:    { common: "6–10 in", max: "14 in", weight: "Up to 1 lb" },
    spawnF:  { low: 36, peak: 42, high: 50 },
    bestSeason: "Spring",
    seasonNotes: {
      Spring: "PEAK — earliest spawning predator.",
      Summer: "Tucked in dense weeds.",
      Fall:   "Active feeders, low light.",
      Winter: "Active under ice elsewhere."
    },
    habitat:  "Heavy vegetation in slow, clear backwaters.",
    diet:     "Small minnows, insects, tiny crawfish.",
    baits:    ["Tiny inline spinners", "Small streamers", "1\" curl-tail grubs"],
    tackle:   "Ultralight, 4 lb line — leader optional",
    idMarks:  ["Vermiculated pattern", "Dark teardrop under eye", "Smaller than chain pickerel"],
    tips:     ["Sight-fish weedlines", "Stay back — they spook", "Tiny lures only"],
    funFact:  "Often mistaken for a chain pickerel pup. The vermiculated pattern (squiggly worm-like marks) is the dead giveaway — and they almost never exceed a foot.",
    range:    "Eastern Arkansas backwaters, lower river systems.",
    homeLake: "Bayou DeView",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Rare",
    stats:    { bite: 72, fight: 50, stealth: 78 }
  },

  /* ============================================================
     LEPISOSTEIDAE expansion — gar family
     ============================================================ */
  {
    id: "longnose_gar",
    name: "Longnose Gar",
    latin: "Lepisosteus osseus",
    family: "Lepisosteidae",
    art: "assets/species/longnose_gar.png",
    tagline: "Needle-nosed prehistoric. Surface-rolling sentry.",
    waterType: ["Rivers", "Reservoirs", "Backwaters"],
    size:    { common: "30–48 in", max: "72 in", weight: "Up to 50 lbs" },
    spawnF:  { low: 65, peak: 72, high: 78 },
    bestSeason: "Summer",
    seasonNotes: {
      Spring: "Schools roll on warming surfaces.",
      Summer: "PEAK — heavy roller activity.",
      Fall:   "Spread out, warm afternoons.",
      Winter: "Deep pool dormancy."
    },
    habitat:  "Open river, oxbow lakes, reservoir bays.",
    diet:     "Shad, suckers, smaller fish — slashes sideways with snout.",
    baits:    ["Rope lures (frayed nylon — no hook)", "Live shad", "Cut bait"],
    tackle:   "Heavy rod, 50 lb braid, wire leader",
    idMarks:  ["Long needle-thin snout", "Tooth rows visible", "Olive cylinder body"],
    tips:     ["Rope lures tangle in teeth — no hook needed", "Patient hookset", "C&R is easier"],
    funFact:  "Longnose gar can breathe air through a vascularized swim bladder — letting them survive in oxygen-poor backwaters where most fish suffocate. They've been doing it for 100 million years.",
    range:    "Statewide rivers and reservoirs.",
    homeLake: "Arkansas River",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Uncommon",
    stats:    { bite: 65, fight: 88, stealth: 60 }
  },
  {
    id: "spotted_gar",
    name: "Spotted Gar",
    latin: "Lepisosteus oculatus",
    family: "Lepisosteidae",
    art: "assets/species/spotted_gar.png",
    tagline: "Mid-sized gar. Speckled. Surface-loving.",
    waterType: ["Oxbows", "Backwaters", "Slow rivers"],
    size:    { common: "24–36 in", max: "44 in", weight: "Up to 15 lbs" },
    spawnF:  { low: 70, peak: 75, high: 82 },
    bestSeason: "Summer",
    seasonNotes: {
      Spring: "Begin surface activity.",
      Summer: "PEAK — visible rollers in shallows.",
      Fall:   "Spread out in warmer pools.",
      Winter: "Stack in deep holes."
    },
    habitat:  "Cypress oxbows, weedy backwaters, slow river bends.",
    diet:     "Sunfish, shad, minnows.",
    baits:    ["Rope lures", "Small live bait", "Cut shad"],
    tackle:   "Medium-heavy, 30 lb braid, wire leader",
    idMarks:  ["Heavy black spots on body, head, fins", "Shorter snout than longnose"],
    tips:     ["Sight-fish rollers", "Cast ahead, let it sink", "Tangle, don't hook"],
    funFact:  "Of Arkansas's three gar species, the spotted gar is the homebody — rarely leaving the oxbow it was born in. Locals know individual fish by their spot patterns.",
    range:    "Lower Arkansas, White, Mississippi backwaters.",
    homeLake: "Lake Chicot",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Uncommon",
    stats:    { bite: 62, fight: 80, stealth: 70 }
  },

  /* ============================================================
     AMIIDAE — bowfin (sole survivor of its family)
     ============================================================ */
  {
    id: "bowfin",
    name: "Bowfin",
    latin: "Amia calva",
    family: "Amiidae",
    art: "assets/species/bowfin.png",
    tagline: "Grinnel. Living fossil. The South's freshwater bulldog.",
    waterType: ["Oxbows", "Swamps", "Bayous", "Slow rivers"],
    size:    { common: "20–28 in", max: "36 in", weight: "Up to 17 lbs" },
    spawnF:  { low: 60, peak: 64, high: 70 },
    bestSeason: "Spring",
    seasonNotes: {
      Spring: "PEAK — pre-spawn surface gulping.",
      Summer: "Hold deep cover, ambush.",
      Fall:   "Active feeders again.",
      Winter: "Tucked in mud, slow."
    },
    habitat:  "Cypress backwaters, weedy lakes, slow muddy water.",
    diet:     "Anything — fish, frogs, crawfish, snakes.",
    baits:    ["Soft plastics", "Spinnerbaits", "Live bluegill", "Cut bait"],
    tackle:   "Heavy baitcaster, 40 lb braid, wire leader",
    idMarks:  ["Long single dorsal fin", "Black spot on tail (males)", "Dog-like teeth"],
    tips:     ["Wire leader — they bite through everything", "Big plastics", "Don't lip them"],
    funFact:  "Bowfin are the only living member of their family — every other Amiidae species died out 65 million years ago. They can breathe air, survive drying mud, and a guide on a hot day will joke they're 'living fossils with attitude.'",
    range:    "Eastern Arkansas, Delta drainages.",
    homeLake: "Bayou Bartholomew",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Rare",
    stats:    { bite: 78, fight: 94, stealth: 64 }
  },

  /* ============================================================
     SCIAENIDAE — drum
     ============================================================ */
  {
    id: "freshwater_drum",
    name: "Freshwater Drum",
    latin: "Aplodinotus grunniens",
    family: "Sciaenidae",
    art: "assets/species/Drum.png",
    tagline: "Gaspergou. The river's hidden heavyweight.",
    waterType: ["Rivers", "Reservoirs", "Tailwaters"],
    size:    { common: "12–22 in", max: "36 in", weight: "Up to 40 lbs" },
    spawnF:  { low: 65, peak: 70, high: 78 },
    bestSeason: "Summer",
    seasonNotes: {
      Spring: "Aggregate in tailwaters.",
      Summer: "PEAK — bottom-feed all day.",
      Fall:   "Spread out into channels.",
      Winter: "Deep, slow, but catchable."
    },
    habitat:  "Big rivers, reservoir flats, bridge scour holes.",
    diet:     "Crawfish, mussels, minnows, insects — bottom feeder.",
    baits:    ["Nightcrawlers on bottom", "Crawfish jigs", "Cut bait"],
    tackle:   "Medium-heavy, 12–20 lb line",
    idMarks:  ["Tall humped back", "Silver scales", "Otoliths called 'lucky stones'"],
    tips:     ["Fish current breaks", "Bottom rigs", "They pull HARD — don't dismiss them"],
    funFact:  "Freshwater drum 'drum' — a true sound, made by vibrating muscles against the swim bladder. Their lucky stones (otoliths) are still given as gifts and worn as jewelry across the Mississippi watershed.",
    range:    "Statewide rivers and large reservoirs.",
    homeLake: "Arkansas River",
    conservation: "Secure",
    native:   "Native",
    rarity:   "Common",
    stats:    { bite: 70, fight: 82, stealth: 50 }
  },

  /* ============================================================
     POLYODONTIDAE — paddlefish
     ============================================================ */
  {
    id: "paddlefish",
    name: "Paddlefish",
    latin: "Polyodon spathula",
    family: "Polyodontidae",
    art: "assets/species/paddlefish.png",
    tagline: "Spoonbill. Living fossil. Filter-feeding ghost of the river.",
    waterType: ["Rivers", "Reservoirs"],
    size:    { common: "36–54 in", max: "72 in", weight: "Up to 100+ lbs" },
    spawnF:  { low: 50, peak: 55, high: 62 },
    bestSeason: "Spring",
    seasonNotes: {
      Spring: "PEAK — snagging season opens.",
      Summer: "Suspend on plankton blooms.",
      Fall:   "Less concentrated, harder to find.",
      Winter: "Deep main-river holes."
    },
    habitat:  "Beaver tailwater, Arkansas River, big-river main channels.",
    diet:     "Zooplankton — filter-feeds with comb-like gill rakers. Eats no bait.",
    baits:    ["No bait — snagging only (regulated season)"],
    tackle:   "Heavy 8'+ rod, 80–100 lb braid, weighted treble snag rig",
    idMarks:  ["Long paddle (rostrum) on snout", "Smooth shark-like skin", "No scales"],
    tips:     ["Snagging season + permit only", "Find the school via electronics", "Long, slow sweeps"],
    funFact:  "Paddlefish use the electroreceptors in their rostrum to find clouds of zooplankton — the same sensory trick sharks use to find prey. They've been doing it unchanged for 75 million years.",
    range:    "Beaver, Bull Shoals tailwaters; Arkansas, Mississippi rivers.",
    homeLake: "Beaver Tailwater",
    conservation: "Vulnerable",
    native:   "Native",
    rarity:   "Legendary",
    stats:    { bite: 30, fight: 96, stealth: 85 }
  }
];

// Rarity scale + gameplay values
window.RARITY = {
  Common:    { tier: 1, base: 10, color: "#8899aa",  glow: "rgba(136,153,170,0.3)" },
  Uncommon:  { tier: 2, base: 20, color: "#4dd0e1",  glow: "rgba(77,208,225,0.35)" },
  Rare:      { tier: 3, base: 35, color: "#00bcd4",  glow: "rgba(0,188,212,0.45)" },
  Legendary: { tier: 4, base: 60, color: "#ff6b35",  glow: "rgba(255,107,53,0.55)" }
};

// Seasonal pattern color coding (matches PFG app)
window.SEASON_COLORS = {
  Spring: { bg: "#2d5a3d", fg: "#7fd88f", emoji: "🌱" },
  Summer: { bg: "#b8860b", fg: "#ffd54f", emoji: "☀️" },
  Fall:   { bg: "#a04020", fg: "#ff8a50", emoji: "🍂" },
  Winter: { bg: "#1a4a6e", fg: "#4fc3f7", emoji: "❄️" }
};

// Default live PFG signal snapshot — Feb 2026 / Lake Maumelle / White Bass
window.DEFAULT_SIGNAL = {
  season: "Spring",
  waterTempF: 54.5,
  verdict: "GO",           // GO | SCOUT | HOLD
  verdictScore: 87,
  activeSpawn: "white_bass",
  lake: "Lake Maumelle",
  lunar: "Waxing Gibbous",
  solarFeeding: "Major",
  timestamp: "2026-02-24 14:15 CST",
  hour: 6.5                // 24h float; 6.5 = 6:30 AM
};

/* ============================================================
   TIME-OF-DAY patterns
   For each species, a curve of bite activity across 24h,
   expressed as keyed windows. Values 0..1.
   Dawn = 5-7, Morning = 7-11, Midday = 11-15, Afternoon = 15-17,
   Dusk = 17-19, Night = 19-5
   ============================================================ */
window.TOD_PATTERNS = {
  white_bass:       { dawn: 0.95, morning: 0.70, midday: 0.40, afternoon: 0.55, dusk: 0.90, night: 0.30,
                      tag: "Crepuscular · chasing shad at light change" },
  largemouth_bass:  { dawn: 0.92, morning: 0.75, midday: 0.45, afternoon: 0.60, dusk: 0.88, night: 0.55,
                      tag: "Ambush predator · low-light feeds, summer nights" },
  smallmouth_bass:  { dawn: 0.88, morning: 0.82, midday: 0.60, afternoon: 0.70, dusk: 0.85, night: 0.25,
                      tag: "All-day opportunist · current seams" },
  striped_bass:     { dawn: 0.98, morning: 0.70, midday: 0.30, afternoon: 0.45, dusk: 0.92, night: 0.65,
                      tag: "First & last light · topwater blitzes" },
  black_crappie:    { dawn: 0.75, morning: 0.85, midday: 0.70, afternoon: 0.75, dusk: 0.80, night: 0.50,
                      tag: "Daytime sight feeder · loves overcast" },
  white_crappie:    { dawn: 0.70, morning: 0.80, midday: 0.75, afternoon: 0.80, dusk: 0.75, night: 0.60,
                      tag: "Turbid-water generalist · midday bite" },
  bluegill:         { dawn: 0.65, morning: 0.90, midday: 0.85, afternoon: 0.88, dusk: 0.70, night: 0.15,
                      tag: "Diurnal · warm-water sun feeder" },
  channel_catfish:  { dawn: 0.55, morning: 0.35, midday: 0.25, afternoon: 0.40, dusk: 0.80, night: 0.95,
                      tag: "Nocturnal · peak bite after dark" },
  blue_catfish:     { dawn: 0.60, morning: 0.40, midday: 0.50, afternoon: 0.55, dusk: 0.85, night: 0.98,
                      tag: "Deep-water night hunter" },
  walleye:          { dawn: 0.92, morning: 0.50, midday: 0.20, afternoon: 0.35, dusk: 0.95, night: 0.85,
                      tag: "Glass eye · low-light specialist" },
  rainbow_trout:    { dawn: 0.80, morning: 0.85, midday: 0.70, afternoon: 0.75, dusk: 0.88, night: 0.30,
                      tag: "Daylight feeder · hatch-dependent" },
  brown_trout:      { dawn: 0.85, morning: 0.55, midday: 0.35, afternoon: 0.50, dusk: 0.92, night: 0.88,
                      tag: "Big browns hunt the dark · streamer magic" },
  alligator_gar:    { dawn: 0.70, morning: 0.60, midday: 0.55, afternoon: 0.65, dusk: 0.85, night: 0.80,
                      tag: "Surface-gulper · warm-water dusk patrol" },

  // ─── Centrarchidae expansion ───
  kentucky_bass:    { dawn: 0.86, morning: 0.78, midday: 0.55, afternoon: 0.65, dusk: 0.84, night: 0.30,
                      tag: "Deep-clear-water bass · steady all-day bite" },
  rock_bass:        { dawn: 0.78, morning: 0.85, midday: 0.72, afternoon: 0.78, dusk: 0.80, night: 0.35,
                      tag: "Stream brawler · daylight under shade" },
  warmouth:         { dawn: 0.70, morning: 0.85, midday: 0.78, afternoon: 0.82, dusk: 0.72, night: 0.30,
                      tag: "Stump-hugger · warm afternoon ambush" },
  green_sunfish:    { dawn: 0.70, morning: 0.92, midday: 0.88, afternoon: 0.90, dusk: 0.72, night: 0.18,
                      tag: "Sun-loving runt · midday aggression" },
  longear_sunfish:  { dawn: 0.65, morning: 0.88, midday: 0.85, afternoon: 0.88, dusk: 0.68, night: 0.15,
                      tag: "Diurnal stream gem · sight-feed in sun" },
  redear_sunfish:   { dawn: 0.62, morning: 0.82, midday: 0.78, afternoon: 0.80, dusk: 0.65, night: 0.20,
                      tag: "Bottom-feeder · hard-bottom shell beds" },

  // ─── Moronidae expansion ───
  hybrid_striped_bass: { dawn: 0.96, morning: 0.72, midday: 0.35, afternoon: 0.50, dusk: 0.92, night: 0.55,
                         tag: "Shad-blitzer · low-light schooling frenzy" },
  yellow_bass:      { dawn: 0.80, morning: 0.78, midday: 0.55, afternoon: 0.65, dusk: 0.82, night: 0.40,
                      tag: "Backwater school fish · low-light bite" },

  // ─── Salmonidae expansion ───
  brook_trout:      { dawn: 0.82, morning: 0.80, midday: 0.65, afternoon: 0.72, dusk: 0.85, night: 0.25,
                      tag: "Cold-water char · drift-feeder by day" },

  // ─── Percidae expansion ───
  sauger:           { dawn: 0.90, morning: 0.50, midday: 0.25, afternoon: 0.40, dusk: 0.92, night: 0.78,
                      tag: "Muddy-current night hunter" },

  // ─── Esocidae ───
  chain_pickerel:   { dawn: 0.85, morning: 0.78, midday: 0.65, afternoon: 0.75, dusk: 0.82, night: 0.30,
                      tag: "Weed-edge ambusher · light-change strikes" },
  grass_pickerel:   { dawn: 0.78, morning: 0.72, midday: 0.55, afternoon: 0.65, dusk: 0.78, night: 0.25,
                      tag: "Pocket predator · daylight sight feeder" },

  // ─── Lepisosteidae expansion ───
  longnose_gar:     { dawn: 0.65, morning: 0.62, midday: 0.58, afternoon: 0.68, dusk: 0.85, night: 0.75,
                      tag: "Surface roller · warm-water dusk feed" },
  spotted_gar:      { dawn: 0.68, morning: 0.65, midday: 0.55, afternoon: 0.65, dusk: 0.82, night: 0.70,
                      tag: "Backwater gar · sight-feeds shallows" },

  // ─── Amiidae ───
  bowfin:           { dawn: 0.72, morning: 0.65, midday: 0.50, afternoon: 0.68, dusk: 0.85, night: 0.78,
                      tag: "Air-gulper · twilight ambush in cover" },

  // ─── Sciaenidae ───
  freshwater_drum:  { dawn: 0.62, morning: 0.65, midday: 0.70, afternoon: 0.72, dusk: 0.68, night: 0.55,
                      tag: "Bottom-grunter · steady all-day feed" },

  // ─── Polyodontidae ───
  paddlefish:       { dawn: 0.55, morning: 0.65, midday: 0.78, afternoon: 0.72, dusk: 0.55, night: 0.30,
                      tag: "Plankton filter-feeder · midday cruiser" }
};

// Helper: which TOD window does an hour fall in?
window.hourToWindow = function(h) {
  if (h >= 5 && h < 7)   return "dawn";
  if (h >= 7 && h < 11)  return "morning";
  if (h >= 11 && h < 15) return "midday";
  if (h >= 15 && h < 17) return "afternoon";
  if (h >= 17 && h < 19) return "dusk";
  return "night";
};

// Human label for an hour
window.hourLabel = function(h) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const period = hh >= 12 ? "PM" : "AM";
  const h12 = hh === 0 ? 12 : (hh > 12 ? hh - 12 : hh);
  return `${h12}:${String(mm).padStart(2,'0')} ${period}`;
};

/* ============================================================
   TOURNAMENT FORMATS
   ============================================================ */
window.TOURNAMENT_FORMATS = {
  classic: {
    id: "classic",
    name: "Classic Bag",
    tag: "5-fish livewell · heaviest bag wins",
    livewellSize: 5,
    scoring: "weight",
    duration: "7 hrs",
    entry: "$60",
    purse: "$12,400",
    icon: "⚖️"
  },
  slam: {
    id: "slam",
    name: "Arkansas Slam",
    tag: "One of each: bass · catfish · panfish · trout",
    livewellSize: 4,
    scoring: "slam",
    duration: "10 hrs",
    entry: "$80",
    purse: "$18,600",
    icon: "🏆"
  },
  signal: {
    id: "signal",
    name: "Signal Run",
    tag: "PFG-boosted species only · bonus points for spawn foil",
    livewellSize: 5,
    scoring: "signalPoints",
    duration: "6 hrs",
    entry: "$40",
    purse: "$9,200",
    icon: "📡"
  },
  family: {
    id: "family",
    name: "Family Slam",
    tag: "One species from each fish family · 10 families on the deck",
    livewellSize: 10,
    scoring: "familySlam",
    duration: "12 hrs",
    entry: "$100",
    purse: "$24,800",
    icon: "🧬"
  }
};

/* ============================================================
   FAMILIES — taxonomic groupings used by deck grid + Family Slam
   ============================================================ */
window.FAMILIES = [
  { id: "Centrarchidae",  label: "Bass & Sunfish",     short: "Centrarchidae",  color: "#4dd0e1" },
  { id: "Moronidae",      label: "Temperate Bass",     short: "Moronidae",      color: "#9ccc65" },
  { id: "Ictaluridae",    label: "Catfish",            short: "Ictaluridae",    color: "#a1887f" },
  { id: "Salmonidae",     label: "Trout",              short: "Salmonidae",     color: "#ff8a65" },
  { id: "Percidae",       label: "Walleye / Sauger",   short: "Percidae",       color: "#ba68c8" },
  { id: "Esocidae",       label: "Pickerel / Pike",    short: "Esocidae",       color: "#aed581" },
  { id: "Lepisosteidae",  label: "Gar",                short: "Lepisosteidae",  color: "#fdd835" },
  { id: "Amiidae",        label: "Bowfin",             short: "Amiidae",        color: "#8d6e63" },
  { id: "Sciaenidae",     label: "Drum",               short: "Sciaenidae",     color: "#90a4ae" },
  { id: "Polyodontidae",  label: "Paddlefish",         short: "Polyodontidae",  color: "#ec407a" }
];
