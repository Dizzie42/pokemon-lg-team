import { useState, useRef } from "react";

const typeColors = {
  Grass:"#3d9e50",Poison:"#9b59b6",Water:"#2980b9",Ice:"#5dade2",
  Fire:"#e74c3c",Normal:"#95a5a6",Flying:"#85c1e9",Psychic:"#e91e8c",
  Ground:"#a0714f",Electric:"#f1c40f",Bug:"#7dbb00",Rock:"#a07850",
  Ghost:"#6c3483",Dragon:"#2e4bce",Steel:"#708090",Fighting:"#e8622a",
};

const teams = [
  {
    id: "A",
    name: "The Optimizer",
    subtitle: "Highest raw performance — meta pick",
    description: "Pure efficiency. Every slot earns its place with no redundancy. Starmie and Jolteon form a blistering fast special core, Kadabra nukes the Elite Four, Nidoking provides Ground/coverage, Snorlax is an unkillable late anchor, and Venusaur enables everything with Sleep Powder. This is the closest to a 'solved' LeafGreen team without legendaries or trades.",
    rating: 98,
    difficulty: "Medium",
    accentColor: "#30a060",
    bgGradient: "135deg, #0a1f14 0%, #0d2137 100%",
    members: [
      {
        name:"Venusaur",sprite:"🌿",types:["Grass","Poison"],role:"Sleep Setter / Grass Sweeper",
        note:"Your starter. Sleep Powder utility is irreplaceable — no other team member can match it.",
        moves:[
          {name:"Giga Drain",type:"Grass",cat:"Special",detail:"TM19 (Celadon). STAB + HP recovery. Essential sustain."},
          {name:"Sleep Powder",type:"Grass",cat:"Status",detail:"Lv.15. The best utility move in the game. Enables safe switches and catches."},
          {name:"Sludge Bomb",type:"Poison",cat:"Special",detail:"TM36 (Rocket Hideout). Secondary STAB for neutral coverage."},
          {name:"Earthquake",type:"Ground",cat:"Physical",detail:"TM26 (Silph Co). Covers Electric and Poison types that wall Grass."},
        ]
      },
      {
        name:"Starmie",sprite:"⭐",types:["Water","Psychic"],role:"Fast Special Sweeper",
        note:"Evolve Staryu (Misty's area/Pallet surf) with Water Stone. 115 Speed — outruns almost everything.",
        moves:[
          {name:"Surf",type:"Water",cat:"Special",detail:"HM03. Primary STAB + mandatory HM. Handles Fire, Rock, Ground."},
          {name:"Ice Beam",type:"Ice",cat:"Special",detail:"TM13. Destroys Lance's Dragon team. Also hits Grass."},
          {name:"Thunderbolt",type:"Electric",cat:"Special",detail:"TM24 (Game Corner). Hits Water-types that resist Surf. BoltBeam + Surf = near-perfect coverage."},
          {name:"Psychic",type:"Psychic",cat:"Special",detail:"TM29. Secondary STAB. Wrecks Poison/Fighting. Covers Agatha partially."},
        ]
      },
      {
        name:"Jolteon",sprite:"⚡",types:["Electric"],role:"Electric Glass Cannon",
        note:"Eevee from Celadon Mansion. Thunder Stone from Celadon Dept Store. 130 Speed — fastest on the team.",
        moves:[
          {name:"Thunderbolt",type:"Electric",cat:"Special",detail:"TM24 or natural. Primary STAB. 90 power, 100% acc. Hits Water/Flying hard."},
          {name:"Thunder Wave",type:"Electric",cat:"Status",detail:"TM73. Paralysis support. Pairs well with Jolteon's natural speed to cripple faster threats."},
          {name:"Pin Missile",type:"Bug",cat:"Physical",detail:"Lv.31. Only real coverage option. Hits Psychic types like Alakazam/Starmie for SE damage."},
          {name:"Shadow Ball",type:"Ghost",cat:"Special",detail:"TM30 (Lavender). Extra coverage vs Psychic/Ghost. Jolteon's movepool is shallow — this fills it."},
        ]
      },
      {
        name:"Kadabra",sprite:"🥄",types:["Psychic"],role:"Psychic Nuke / Elite Four MVP",
        note:"No trade needed — Kadabra has 120 SpA and 120 Spe. Catch Abra on Route 24, use a ball turn 1.",
        moves:[
          {name:"Psychic",type:"Psychic",cat:"Special",detail:"TM29. Best move in the game. 90 power, hits most of the E4 for massive damage."},
          {name:"Calm Mind",type:"Psychic",cat:"Status",detail:"TM04. One CM with 120 SpA is terrifying. Set up on anything slower."},
          {name:"Shadow Ball",type:"Ghost",cat:"Special",detail:"TM30. Hits Psychic/Ghost types including Agatha's Gengars for SE."},
          {name:"Thunderbolt",type:"Electric",cat:"Special",detail:"TM24. Coverage for Water/Flying that might threaten Kadabra's frailer defense."},
        ]
      },
      {
        name:"Nidoking",sprite:"👑",types:["Poison","Ground"],role:"Coverage King / Mixed Attacker",
        note:"Nidoran♂ on Route 22. Evolves to Nidorino at Lv.16, Moon Stone (Mt. Moon) → Nidoking.",
        moves:[
          {name:"Earthquake",type:"Ground",cat:"Physical",detail:"TM26. Primary STAB. 100 power. Hits Electric, Rock, Fire, Poison, Steel."},
          {name:"Ice Beam",type:"Ice",cat:"Special",detail:"TM13. Backup Dragon/Grass/Flying coverage. Pairs with EQ for near-perfect neutral coverage."},
          {name:"Megahorn",type:"Bug",cat:"Physical",detail:"Lv.53 or Move Reminder. Hits Psychic types hard. SE on Alakazam/Starmie/Kadabra."},
          {name:"Thunderbolt",type:"Electric",cat:"Special",detail:"TM24. Covers Water/Flying types that resist Ground. Completes the coverage triangle."},
        ]
      },
      {
        name:"Snorlax",sprite:"😴",types:["Normal"],role:"Bulky Late-Game Tank",
        note:"Route 12 or 16 — need Pokéflute from Lavender Tower. 160 HP, 110 Atk. Rest + high bulk = nearly unkillable.",
        moves:[
          {name:"Body Slam",type:"Normal",cat:"Physical",detail:"TM08. Primary STAB. 85 power + 30% paralysis chance. One of the best moves in the game."},
          {name:"Earthquake",type:"Ground",cat:"Physical",detail:"TM26. Covers Rock/Steel/Electric/Poison types. Snorlax hits hard enough to KO most things."},
          {name:"Rest",type:"Psychic",cat:"Status",detail:"TM44. Full HP restore at the cost of 2 turns asleep. With Snorlax's HP, nearly unkillable."},
          {name:"Fire Blast",type:"Fire",cat:"Special",detail:"TM38. Covers Grass and Bug types. Snorlax's SpA is low but Fire Blast still hits hard enough."},
        ]
      },
    ]
  },
  {
    id: "B",
    name: "The Popular Pick",
    subtitle: "Fan-favorite online team — solid and proven",
    description: "The team you found online. Venusaur, Nidoking, Gyarados, Starmie, Jolteon, Snorlax. Very strong and widely recommended. The main weakness is Gyarados — its Special Attack is only 60, so Surf does surprisingly little damage. It's a physical attacker stuck using a special move. Everything else on this team is excellent. Rated slightly below Team A purely because of that Gyarados caveat.",
    rating: 88,
    difficulty: "Easy",
    accentColor: "#2980b9",
    bgGradient: "135deg, #0a1428 0%, #0d1f35 100%",
    members: [
      {
        name:"Venusaur",sprite:"🌿",types:["Grass","Poison"],role:"Sleep Setter / Grass Sweeper",
        note:"Identical to Team A. Sleep Powder + Giga Drain is the backbone of any Bulbasaur run.",
        moves:[
          {name:"Giga Drain",type:"Grass",cat:"Special",detail:"TM19. STAB + recovery. More sustainable than Razor Leaf for the long haul."},
          {name:"Sleep Powder",type:"Grass",cat:"Status",detail:"Lv.15. Irreplaceable utility. Sets up sweeps and catches legendaries/rare Pokémon."},
          {name:"Sludge Bomb",type:"Poison",cat:"Special",detail:"TM36. Secondary STAB. Poisons and deals solid neutral damage."},
          {name:"Synthesis",type:"Grass",cat:"Status",detail:"Lv.45. HP recovery in a pinch. Swap for Earthquake if you want more coverage."},
        ]
      },
      {
        name:"Nidoking",sprite:"👑",types:["Poison","Ground"],role:"Coverage King",
        note:"Same as Team A — this Pokémon belongs on every serious LeafGreen team. Non-negotiable.",
        moves:[
          {name:"Earthquake",type:"Ground",cat:"Physical",detail:"TM26. Primary STAB. The best physical move in the game."},
          {name:"Ice Beam",type:"Ice",cat:"Special",detail:"TM13. Dragon/Grass/Flying coverage. Essential for Lance."},
          {name:"Thunderbolt",type:"Electric",cat:"Special",detail:"TM24. Water/Flying coverage. Hits what EQ can't."},
          {name:"Flamethrower",type:"Fire",cat:"Special",detail:"TM35. Covers Grass/Bug/Ice. Replaces Fire-type slot that Arcanine held."},
        ]
      },
      {
        name:"Gyarados",sprite:"🐉",types:["Water","Flying"],role:"Physical Dragon / HM User",
        note:"⚠️ Caveat: Gyarados SpA is only 60 — Surf hits weak. Use it for Intimidate, Bite, and Dragon Dance if you can wait for Lv.30+.",
        moves:[
          {name:"Surf",type:"Water",cat:"Special",detail:"HM03. Despite low SpA, it's your Water STAB and HM. Still hits decently at this level."},
          {name:"Bite",type:"Dark",cat:"Physical",detail:"Lv.29 naturally. Physical move that uses Gyarados's 125 Atk. Hits Psychic/Ghost types."},
          {name:"Dragon Rage",type:"Dragon",cat:"Special",detail:"Lv.20. Always does 40 damage regardless of stats — consistent chip damage."},
          {name:"Hyper Beam",type:"Normal",cat:"Special",detail:"TM15. Nuke button. Low accuracy hurts but with Gyarados's Attack it hits like a truck."},
        ]
      },
      {
        name:"Starmie",sprite:"⭐",types:["Water","Psychic"],role:"Fast Special Sweeper",
        note:"Yes, Starmie and Gyarados overlap on Water type. Starmie is the better Water-type here — keep both but know Starmie does the actual Water sweeping.",
        moves:[
          {name:"Surf",type:"Water",cat:"Special",detail:"HM03. Primary STAB. Starmie's 100 SpA means this actually hurts."},
          {name:"Ice Beam",type:"Ice",cat:"Special",detail:"TM13. BoltBeam combo partner. Handles Dragon/Grass/Flying."},
          {name:"Thunderbolt",type:"Electric",cat:"Special",detail:"TM24. Hits Water-types that resist Surf. Classic BoltBeam."},
          {name:"Psychic",type:"Psychic",cat:"Special",detail:"TM29. Secondary STAB. Wipes out Poison and Fighting types with ease."},
        ]
      },
      {
        name:"Jolteon",sprite:"⚡",types:["Electric"],role:"Speed Demon / Electric",
        note:"Same as Team A. 130 Speed is absurd. Plug-and-play Electric coverage.",
        moves:[
          {name:"Thunderbolt",type:"Electric",cat:"Special",detail:"TM24. Primary STAB. The reason Jolteon exists."},
          {name:"Thunder Wave",type:"Electric",cat:"Status",detail:"TM73. Paralysis support for slower teammates like Snorlax."},
          {name:"Pin Missile",type:"Bug",cat:"Physical",detail:"Lv.31. SE on Psychic types. Jolteon's limited movepool means you take what you can."},
          {name:"Shadow Ball",type:"Ghost",cat:"Special",detail:"TM30. Ghost/Psychic coverage. Filler but useful."},
        ]
      },
      {
        name:"Snorlax",sprite:"😴",types:["Normal"],role:"Tank / Cleanup Hitter",
        note:"Route 12 or 16. Same role as Team A — late-game wall that patches any defensive holes.",
        moves:[
          {name:"Body Slam",type:"Normal",cat:"Physical",detail:"TM08. STAB + 30% paralysis. Best Normal move available."},
          {name:"Earthquake",type:"Ground",cat:"Physical",detail:"TM26. Ground coverage. Hits what Body Slam can't."},
          {name:"Rest",type:"Psychic",cat:"Status",detail:"TM44. Full HP restore. Makes Snorlax very hard to KO."},
          {name:"Fire Blast",type:"Fire",cat:"Special",detail:"TM38. Grass/Bug/Ice coverage. Nuke for resistant types."},
        ]
      },
    ]
  },
  {
    id: "C",
    name: "The Speed Run",
    subtitle: "All-out offense — Glass cannon squad",
    description: "Built entirely around Speed and Special Attack. Every Pokémon on this team either outspeeds or nukes before taking damage. No tanks, no bulk — pure aggression. Venusaur, Starmie, Jolteon, Kadabra, Arcanine, and Dodrio form a blisteringly fast offensive squad. You will die occasionally but you'll also one-shot things constantly. Very satisfying to play.",
    rating: 85,
    difficulty: "Hard",
    accentColor: "#e74c3c",
    bgGradient: "135deg, #1f0a0a 0%, #2d0d0d 100%",
    members: [
      {
        name:"Venusaur",sprite:"🌿",types:["Grass","Poison"],role:"Offensive Anchor / Sleep",
        note:"Less of a tank here, more of a fast pivot. Sleep Powder still makes it mandatory.",
        moves:[
          {name:"Giga Drain",type:"Grass",cat:"Special",detail:"TM19. STAB + recovery. Keeps Venusaur healthy in a team with no defensive anchor."},
          {name:"Sleep Powder",type:"Grass",cat:"Status",detail:"Lv.15. Critical on an offense team — lets you set up or safely pivot."},
          {name:"Sludge Bomb",type:"Poison",cat:"Special",detail:"TM36. STAB coverage. Hits Grass and Fairy neutrally."},
          {name:"Earthquake",type:"Ground",cat:"Physical",detail:"TM26. Electric/Poison coverage. Fills Venusaur's coverage gap."},
        ]
      },
      {
        name:"Starmie",sprite:"⭐",types:["Water","Psychic"],role:"Primary Water / Psychic",
        note:"115 Speed ties with Jolteon's friends. BoltBeam + Psychic + Surf gives it near-perfect coverage alone.",
        moves:[
          {name:"Surf",type:"Water",cat:"Special",detail:"HM03. Primary STAB."},
          {name:"Ice Beam",type:"Ice",cat:"Special",detail:"TM13. Dragon/Grass coverage."},
          {name:"Thunderbolt",type:"Electric",cat:"Special",detail:"TM24. Water coverage."},
          {name:"Psychic",type:"Psychic",cat:"Special",detail:"TM29. Secondary STAB sweep."},
        ]
      },
      {
        name:"Jolteon",sprite:"⚡",types:["Electric"],role:"130 Speed Nuke",
        note:"Fastest Pokémon on the team. Goes first almost always. Thunderbolt everything.",
        moves:[
          {name:"Thunderbolt",type:"Electric",cat:"Special",detail:"TM24. Primary. 90 power, 100% acc."},
          {name:"Shadow Ball",type:"Ghost",cat:"Special",detail:"TM30. Ghost/Psychic coverage."},
          {name:"Pin Missile",type:"Bug",cat:"Physical",detail:"Lv.31. SE vs Psychic types."},
          {name:"Quick Attack",type:"Normal",cat:"Physical",detail:"Priority finisher for low-HP targets."},
        ]
      },
      {
        name:"Kadabra",sprite:"🥄",types:["Psychic"],role:"120 SpA / 120 Spe Nuke",
        note:"No trade needed. Pure glass cannon — if it gets hit it faints. If it attacks first, things die.",
        moves:[
          {name:"Psychic",type:"Psychic",cat:"Special",detail:"TM29. Primary. The best move in the game."},
          {name:"Calm Mind",type:"Psychic",cat:"Status",detail:"TM04. +1 CM = unstoppable."},
          {name:"Shadow Ball",type:"Ghost",cat:"Special",detail:"TM30. Ghost coverage."},
          {name:"Thunderbolt",type:"Electric",cat:"Special",detail:"TM24. Extra coverage."},
        ]
      },
      {
        name:"Arcanine",sprite:"🔥",types:["Fire"],role:"Fire Physical Sweeper",
        note:"110 Attack, 95 Speed. Extreme Speed priority is the reason Arcanine earns its slot over other Fire types on an offense team.",
        moves:[
          {name:"Flamethrower",type:"Fire",cat:"Special",detail:"TM35. Primary STAB. Reliable and accurate."},
          {name:"Extreme Speed",type:"Normal",cat:"Physical",detail:"Lv.49. +2 Priority. Sweeps weakened teams."},
          {name:"Aerial Ace",type:"Flying",cat:"Physical",detail:"TM40. Never misses. Fighting/Bug coverage."},
          {name:"Overheat",type:"Fire",cat:"Special",detail:"TM50. Nuke button for boss fights."},
        ]
      },
      {
        name:"Dodrio",sprite:"🦅",types:["Normal","Flying"],role:"110 Atk / 110 Spe Physical",
        note:"Routes 16/17/18. Better than Fearow with 110 in both Atk and Speed. Drill Peck hits very hard.",
        moves:[
          {name:"Drill Peck",type:"Flying",cat:"Physical",detail:"Lv.28. Primary STAB. 80 power, 100% acc. Best physical Flying move."},
          {name:"Return",type:"Normal",cat:"Physical",detail:"TM27. 102 power at max friendship. Excellent secondary STAB."},
          {name:"Aerial Ace",type:"Flying",cat:"Physical",detail:"TM40. Never-miss backup."},
          {name:"Tri Attack",type:"Normal",cat:"Special",detail:"Lv.1 / Move Reminder. 20% status chance. Fun coverage with solid power."},
        ]
      },
    ]
  },
  {
    id: "D",
    name: "The Balanced Classic",
    subtitle: "Rounded team — great for first playthrough",
    description: "A well-rounded team with clear roles and no overlap. Venusaur leads, Lapras tanks and surfs, Arcanine sweeps physically, Kadabra nukes psychically, Nidoking provides Ground coverage, and Dodrio handles Flying. This team has more defensive presence than Team A and is very forgiving to play. Every type in the game is covered. Great if you want to feel strong throughout the whole journey without relying on Game Corner TMs heavily.",
    rating: 82,
    difficulty: "Easy",
    accentColor: "#8e44ad",
    bgGradient: "135deg, #12001f 0%, #1a0a2e 100%",
    members: [
      {
        name:"Venusaur",sprite:"🌿",types:["Grass","Poison"],role:"Lead / Sleep / Grass",
        note:"The constant across all four teams. Bulbasaur is the best starter for LeafGreen — no debate.",
        moves:[
          {name:"Giga Drain",type:"Grass",cat:"Special",detail:"TM19. STAB + healing. More reliable than Solar Beam."},
          {name:"Sleep Powder",type:"Grass",cat:"Status",detail:"Lv.15. Best utility in the game."},
          {name:"Sludge Bomb",type:"Poison",cat:"Special",detail:"TM36. Secondary STAB."},
          {name:"Leech Seed",type:"Grass",cat:"Status",detail:"Lv.7. Passive drain every turn. Stacks with Giga Drain for massive sustain."},
        ]
      },
      {
        name:"Lapras",sprite:"🧊",types:["Water","Ice"],role:"Bulky Tank / HM Carrier",
        note:"Free gift at Silph Co. 130 HP base. Slower than Starmie but tankier. Hard-counters Lance entirely.",
        moves:[
          {name:"Surf",type:"Water",cat:"Special",detail:"HM03. Primary STAB. 85 SpA still hits hard with 95 power."},
          {name:"Ice Beam",type:"Ice",cat:"Special",detail:"TM13. Secondary STAB. SE on Dragon, Grass, Flying — essential for Lance."},
          {name:"Thunderbolt",type:"Electric",cat:"Special",detail:"TM24. BoltBeam combo. Hits Water-types that resist Surf."},
          {name:"Psychic",type:"Psychic",cat:"Special",detail:"TM29. Coverage for Poison/Fighting. Handles Agatha's support Pokémon."},
        ]
      },
      {
        name:"Arcanine",sprite:"🔥",types:["Fire"],role:"Physical Sweeper / Fire",
        note:"On this team, Fire coverage earns its slot — Lapras is the Water-type, not Starmie, so Nidoking needs Flamethrower less. Arcanine handles Bugs cleanly.",
        moves:[
          {name:"Flamethrower",type:"Fire",cat:"Special",detail:"TM35. Reliable primary STAB."},
          {name:"Extreme Speed",type:"Normal",cat:"Physical",detail:"Lv.49. Priority finisher."},
          {name:"Aerial Ace",type:"Flying",cat:"Physical",detail:"TM40. Never misses. Bug/Fighting coverage."},
          {name:"Crunch",type:"Dark",cat:"Physical",detail:"Lv.39. Physical Dark coverage. Hits Psychic/Ghost types hard."},
        ]
      },
      {
        name:"Kadabra",sprite:"🥄",types:["Psychic"],role:"Psychic Sweeper",
        note:"Same role as every team. Kadabra is simply the best Psychic you can get without trading.",
        moves:[
          {name:"Psychic",type:"Psychic",cat:"Special",detail:"TM29. Primary nuke."},
          {name:"Calm Mind",type:"Psychic",cat:"Status",detail:"TM04. One boost = sweep."},
          {name:"Shadow Ball",type:"Ghost",cat:"Special",detail:"TM30. Ghost coverage."},
          {name:"Recover",type:"Normal",cat:"Status",detail:"Lv.39. 50% HP recovery. Makes Kadabra a lot more durable mid-game."},
        ]
      },
      {
        name:"Nidoking",sprite:"👑",types:["Poison","Ground"],role:"Ground Coverage",
        note:"As always, the best coverage Pokémon in the game. Available from Route 22 at the start.",
        moves:[
          {name:"Earthquake",type:"Ground",cat:"Physical",detail:"TM26. Primary STAB."},
          {name:"Ice Beam",type:"Ice",cat:"Special",detail:"TM13. Dragon/Grass coverage."},
          {name:"Thunderbolt",type:"Electric",cat:"Special",detail:"TM24. Water/Flying coverage."},
          {name:"Megahorn",type:"Bug",cat:"Physical",detail:"Lv.53 / Move Reminder. Hits Psychic types."},
        ]
      },
      {
        name:"Dodrio",sprite:"🦅",types:["Normal","Flying"],role:"Physical Flying Sweeper",
        note:"Routes 16/17/18. Better end-game than Fearow. 110/110 Atk/Spe. Drill Peck handles Grass/Bug/Fighting.",
        moves:[
          {name:"Drill Peck",type:"Flying",cat:"Physical",detail:"Lv.28. Primary STAB. Best physical Flying move in game."},
          {name:"Return",type:"Normal",cat:"Physical",detail:"TM27. 102 power at max friendship."},
          {name:"Aerial Ace",type:"Flying",cat:"Physical",detail:"TM40. Never-miss backup."},
          {name:"Steel Wing",type:"Steel",cat:"Physical",detail:"TM47. Rock/Ice coverage. Fills gap in Dodrio's offenses."},
        ]
      },
    ]
  }
];

const eliteFourData = [
  {name:"Lorelei",type:"Ice / Water",members:["Dewgong","Cloyster","Slowbro","Jynx","Lapras"],
   strategy:"Lead with Jolteon or Nidoking (Thunderbolt). Venusaur's Giga Drain handles Slowbro. Avoid Lapras vs Lapras — use Electric."},
  {name:"Bruno",type:"Fighting / Rock",members:["Onix×2","Hitmonchan","Hitmonlee","Machamp"],
   strategy:"Kadabra one-shots everything here with Psychic. Starmie's Surf handles Onix. Easiest E4 member."},
  {name:"Agatha",type:"Ghost / Poison",members:["Gengar×2","Haunter×2","Arbok"],
   strategy:"Shadow Ball from Kadabra or Jolteon. Nidoking Earthquake handles Arbok. Ground immunity matters — Gengar is Ghost/Poison, EQ doesn't hit it."},
  {name:"Lance",type:"Dragon / Flying",members:["Gyarados","Dragonair×2","Aerodactyl","Dragonite"],
   strategy:"Ice Beam from Lapras/Starmie/Nidoking destroys everything. Thunderbolt for Gyarados/Aerodactyl. This is the easiest E4 member if you have Ice Beam."},
  {name:"Champion Gary",type:"Mixed",members:["Pidgeot","Alakazam","Rhydon","Exeggutor","Gyarados","Blastoise/Charizard/Venusaur"],
   strategy:"Kadabra vs Alakazam (Shadow Ball). Ice Beam vs Exeggutor/Pidgeot. Jolteon vs Gyarados. Earthquake vs Rhydon. Starmie vs fire/rock starters. Adapt based on his starter."},
];

export default function App() {
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [selectedMon, setSelectedMon] = useState(0);
  const [tab, setTab] = useState("team");
  // Per-team member order: map of teamIndex -> array of member indices
  const [memberOrders, setMemberOrders] = useState(() =>
    teams.map((t) => t.members.map((_, i) => i))
  );
  const dragSrc = useRef(null);
  const dragOver = useRef(null);

  const team = teams[selectedTeam];
  const order = memberOrders[selectedTeam];
  const orderedMembers = order.map((i) => team.members[i]);
  const mon = orderedMembers[selectedMon];

  const handleDragStart = (e, idx) => {
    dragSrc.current = idx;
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragEnter = (e, idx) => {
    dragOver.current = idx;
    e.preventDefault();
  };
  const handleDragOver = (e) => { e.preventDefault(); };
  const handleDrop = (e, idx) => {
    e.preventDefault();
    const src = dragSrc.current;
    if (src === null || src === idx) return;
    const newOrders = memberOrders.map((o, ti) => {
      if (ti !== selectedTeam) return o;
      const next = [...o];
      const [moved] = next.splice(src, 1);
      next.splice(idx, 0, moved);
      return next;
    });
    setMemberOrders(newOrders);
    // Keep selection following the dragged mon
    setSelectedMon(idx);
    dragSrc.current = null;
    dragOver.current = null;
  };
  const handleDragEnd = () => {
    dragSrc.current = null;
    dragOver.current = null;
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(${team.bgGradient})`,
      fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif",
      color:"#e8e0d0",
      transition:"background 0.5s ease",
    }}>
      {/* Header */}
      <div style={{
        padding:"20px 24px 16px",
        borderBottom:"1px solid rgba(255,255,255,0.08)",
        background:"rgba(0,0,0,0.4)",
        backdropFilter:"blur(10px)",
        position:"sticky",top:0,zIndex:100,
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}>
          <span style={{fontSize:"22px"}}>🍃</span>
          <div>
            <div style={{fontSize:"9px",letterSpacing:"4px",color:team.accentColor,textTransform:"uppercase"}}>Pokémon LeafGreen — Bulbasaur Starter · No Trades · No Legends</div>
            <div style={{fontSize:"18px",fontWeight:"bold",color:"#f0ead0",letterSpacing:"0.5px"}}>Optimal Team Compendium</div>
          </div>
        </div>

        {/* Team Selector */}
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
          {teams.map((t,i) => (
            <button key={i} onClick={()=>{setSelectedTeam(i);setSelectedMon(0);setTab("team");}} style={{
              background: selectedTeam===i ? t.accentColor : "rgba(255,255,255,0.05)",
              border:`1px solid ${selectedTeam===i ? t.accentColor : "rgba(255,255,255,0.1)"}`,
              borderRadius:"20px",padding:"6px 14px",cursor:"pointer",
              color: selectedTeam===i ? "#fff" : "#8a9a90",
              fontSize:"12px",fontFamily:"inherit",letterSpacing:"0.5px",
              transition:"all 0.2s",fontWeight: selectedTeam===i ? "bold" : "normal",
            }}>
              Team {t.id}: {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Team Banner */}
      <div style={{
        padding:"20px 24px 16px",
        background:`linear-gradient(90deg, ${team.accentColor}18, transparent)`,
        borderBottom:`1px solid ${team.accentColor}33`,
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"12px"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"4px"}}>
              <h2 style={{margin:0,fontSize:"20px",color:"#f0ead0"}}>Team {team.id}: {team.name}</h2>
              <div style={{
                background:`${team.accentColor}22`,border:`1px solid ${team.accentColor}`,
                borderRadius:"12px",padding:"2px 10px",fontSize:"11px",color:team.accentColor,fontWeight:"bold"
              }}>Score: {team.rating}/100</div>
              <div style={{
                background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
                borderRadius:"12px",padding:"2px 10px",fontSize:"11px",color:"#8a9a90"
              }}>Difficulty: {team.difficulty}</div>
            </div>
            <div style={{fontSize:"12px",color:team.accentColor,fontStyle:"italic",marginBottom:"8px"}}>{team.subtitle}</div>
            <p style={{margin:0,fontSize:"13px",color:"#8a9a90",maxWidth:"650px",lineHeight:"1.7"}}>{team.description}</p>
          </div>
          <div style={{display:"flex",gap:"6px"}}>
            {orderedMembers.map((m,i)=>(
              <button
                key={order[i]}
                draggable
                onDragStart={(e)=>handleDragStart(e,i)}
                onDragEnter={(e)=>handleDragEnter(e,i)}
                onDragOver={handleDragOver}
                onDrop={(e)=>handleDrop(e,i)}
                onDragEnd={handleDragEnd}
                onClick={()=>setSelectedMon(i)}
                title={`${m.name} — drag to reorder`}
                style={{
                  background: selectedMon===i ? `${team.accentColor}33` : "rgba(255,255,255,0.04)",
                  border:`2px solid ${selectedMon===i ? team.accentColor : "rgba(255,255,255,0.08)"}`,
                  borderRadius:"10px",padding:"8px",cursor:"grab",
                  fontSize:"22px",transition:"all 0.2s",
                  boxShadow: selectedMon===i ? `0 0 12px ${team.accentColor}44` : "none",
                  userSelect:"none",
              }}>{m.sprite}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub tabs */}
      <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.07)",background:"rgba(0,0,0,0.25)",padding:"0 24px"}}>
        {[["team","🎮 Pokémon Detail"],["e4","⚔️ Elite Four Guide"],["compare","📊 Team Compare"]].map(([t,label])=>(
          <button key={t} onClick={()=>setTab(t)} style={{
            background:"none",border:"none",cursor:"pointer",padding:"12px 16px",
            fontSize:"12px",letterSpacing:"1.5px",textTransform:"uppercase",fontFamily:"inherit",
            color: tab===t ? team.accentColor : "#607a70",
            borderBottom: tab===t ? `2px solid ${team.accentColor}` : "2px solid transparent",
            transition:"all 0.2s",
          }}>{label}</button>
        ))}
      </div>

      {/* TEAM TAB */}
      {tab==="team" && (
        <div style={{display:"flex",minHeight:"calc(100vh - 280px)"}}>
          {/* Sidebar */}
          <div style={{width:"180px",minWidth:"180px",borderRight:"1px solid rgba(255,255,255,0.07)",padding:"16px 10px",background:"rgba(0,0,0,0.15)"}}>
            <div style={{fontSize:"9px",letterSpacing:"3px",color:"#607a70",textTransform:"uppercase",marginBottom:"12px",paddingLeft:"4px"}}>
              Party — drag to reorder
            </div>
            {orderedMembers.map((m,i)=>(
              <div
                key={order[i]}
                draggable
                onDragStart={(e)=>handleDragStart(e,i)}
                onDragEnter={(e)=>handleDragEnter(e,i)}
                onDragOver={handleDragOver}
                onDrop={(e)=>handleDrop(e,i)}
                onDragEnd={handleDragEnd}
                onClick={()=>setSelectedMon(i)}
                style={{
                  width:"100%",background: selectedMon===i ? `${team.accentColor}18` : "transparent",
                  border: selectedMon===i ? `1px solid ${team.accentColor}44` : "1px solid transparent",
                  borderLeft: selectedMon===i ? `3px solid ${team.accentColor}` : "3px solid transparent",
                  borderRadius:"6px",padding:"9px",cursor:"grab",
                  display:"flex",alignItems:"center",gap:"8px",marginBottom:"5px",
                  transition:"all 0.15s",textAlign:"left",userSelect:"none",
                  boxSizing:"border-box",
                }}>
                <span style={{fontSize:"9px",color:"#405040",minWidth:"12px",textAlign:"center",fontWeight:"bold"}}>{i+1}</span>
                <span style={{fontSize:"20px"}}>{m.sprite}</span>
                <div>
                  <div style={{fontSize:"12px",color: selectedMon===i ? "#f0ead0" : "#8a9a90",fontWeight: selectedMon===i?"bold":"normal"}}>{m.name}</div>
                  <div style={{display:"flex",gap:"2px",marginTop:"2px",flexWrap:"wrap"}}>
                    {m.types.map(t=>(
                      <span key={t} style={{fontSize:"8px",background:typeColors[t]+"33",color:typeColors[t],border:`1px solid ${typeColors[t]}55`,borderRadius:"2px",padding:"1px 4px"}}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail */}
          <div style={{flex:1,padding:"24px 28px",overflow:"auto"}}>
            {/* Mon header */}
            <div style={{
              display:"flex",gap:"20px",alignItems:"flex-start",marginBottom:"22px",
              padding:"20px",borderRadius:"12px",
              background:`linear-gradient(135deg, ${team.accentColor}12, rgba(255,255,255,0.02))`,
              border:`1px solid ${team.accentColor}2a`,
            }}>
              <div style={{
                fontSize:"52px",width:"76px",height:"76px",display:"flex",alignItems:"center",
                justifyContent:"center",background:`${team.accentColor}18`,borderRadius:"50%",
                border:`2px solid ${team.accentColor}44`,flexShrink:0,
              }}>{mon.sprite}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:"10px",color:team.accentColor,letterSpacing:"3px",textTransform:"uppercase",marginBottom:"3px"}}>{mon.role}</div>
                <h2 style={{margin:"0 0 6px",fontSize:"24px",color:"#f0ead0"}}>{mon.name}</h2>
                <div style={{display:"flex",gap:"6px",marginBottom:"10px"}}>
                  {mon.types.map(t=>(
                    <span key={t} style={{fontSize:"10px",background:typeColors[t],color:"white",borderRadius:"4px",padding:"2px 8px",fontWeight:"bold",letterSpacing:"0.5px"}}>{t}</span>
                  ))}
                </div>
                <div style={{
                  fontSize:"12px",color:"#c0d0c8",background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.08)",borderRadius:"6px",padding:"8px 12px",lineHeight:"1.6"
                }}>{mon.note}</div>
              </div>
            </div>

            {/* Moves */}
            <div style={{fontSize:"10px",letterSpacing:"3px",color:team.accentColor,textTransform:"uppercase",marginBottom:"12px"}}>Recommended Moveset</div>
            <div style={{display:"grid",gap:"9px"}}>
              {mon.moves.map((mv,i)=>{
                const mtype = mv.type.split(" ")[0];
                return (
                  <div key={i} style={{
                    background:`linear-gradient(90deg, ${typeColors[mtype]||"#607070"}15, rgba(255,255,255,0.02))`,
                    border:`1px solid ${typeColors[mtype]||"#607070"}2a`,
                    borderLeft:`3px solid ${typeColors[mtype]||"#607070"}`,
                    borderRadius:"8px",padding:"13px 15px",
                    display:"flex",gap:"14px",alignItems:"flex-start",
                  }}>
                    <div style={{
                      minWidth:"24px",height:"24px",background:`${typeColors[mtype]||"#607070"}25`,
                      borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:"11px",fontWeight:"bold",color:typeColors[mtype]||"#607070",flexShrink:0,
                    }}>{i+1}</div>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"3px",flexWrap:"wrap"}}>
                        <span style={{fontSize:"14px",fontWeight:"bold",color:"#e8e0d0"}}>{mv.name}</span>
                        <span style={{fontSize:"9px",background:typeColors[mtype]||"#607070",color:"white",borderRadius:"3px",padding:"2px 7px",letterSpacing:"0.5px"}}>{mv.type}</span>
                        <span style={{fontSize:"9px",color:"#607a70",background:"rgba(255,255,255,0.05)",borderRadius:"3px",padding:"2px 7px"}}>{mv.cat}</span>
                      </div>
                      <div style={{fontSize:"12px",color:"#8aa0a0",lineHeight:"1.6"}}>{mv.detail}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* E4 TAB */}
      {tab==="e4" && (
        <div style={{padding:"28px",maxWidth:"780px"}}>
          <div style={{fontSize:"10px",letterSpacing:"3px",color:team.accentColor,textTransform:"uppercase",marginBottom:"8px"}}>Team {team.id} Strategy</div>
          <h2 style={{margin:"0 0 20px",fontSize:"20px",color:"#f0ead0"}}>Elite Four & Champion Guide</h2>
          {eliteFourData.map((e,i)=>(
            <div key={i} style={{
              marginBottom:"14px",padding:"18px 22px",borderRadius:"10px",
              background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",
            }}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"12px",marginBottom:"10px"}}>
                <div>
                  <div style={{fontSize:"10px",color:"#607a70",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"3px"}}>#{i+1}</div>
                  <div style={{fontSize:"17px",fontWeight:"bold",color:"#f0ead0"}}>{e.name}</div>
                  <div style={{fontSize:"11px",color:"#8aa0a0",marginTop:"2px"}}>{e.type}</div>
                </div>
                <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
                  {e.members.map((m,j)=>(
                    <span key={j} style={{fontSize:"11px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"4px",padding:"2px 8px",color:"#a0b0a8"}}>{m}</span>
                  ))}
                </div>
              </div>
              <div style={{
                fontSize:"13px",color:"#8aa0a0",lineHeight:"1.7",
                padding:"10px 12px",background:"rgba(255,255,255,0.03)",borderRadius:"6px",
                borderLeft:`2px solid ${team.accentColor}`,
              }}>{e.strategy}</div>
            </div>
          ))}
        </div>
      )}

      {/* COMPARE TAB */}
      {tab==="compare" && (
        <div style={{padding:"28px",overflow:"auto"}}>
          <div style={{fontSize:"10px",letterSpacing:"3px",color:team.accentColor,textTransform:"uppercase",marginBottom:"8px"}}>All Teams</div>
          <h2 style={{margin:"0 0 20px",fontSize:"20px",color:"#f0ead0"}}>Side-by-Side Comparison</h2>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:"600px"}}>
              <thead>
                <tr>
                  <th style={{padding:"12px 16px",textAlign:"left",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",color:"#607a70",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>Team</th>
                  {["Slot 1","Slot 2","Slot 3","Slot 4","Slot 5","Slot 6"].map(s=>(
                    <th key={s} style={{padding:"12px 10px",textAlign:"center",fontSize:"10px",letterSpacing:"1px",textTransform:"uppercase",color:"#607a70",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>{s}</th>
                  ))}
                  <th style={{padding:"12px 10px",textAlign:"center",fontSize:"10px",letterSpacing:"1px",textTransform:"uppercase",color:"#607a70",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>Score</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((t,i)=>(
                  <tr key={i} onClick={()=>{setSelectedTeam(i);setSelectedMon(0);setTab("team");}}
                    style={{cursor:"pointer",background: selectedTeam===i ? `${t.accentColor}10` : "transparent",transition:"background 0.2s"}}>
                    <td style={{padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                      <div style={{fontSize:"13px",fontWeight:"bold",color:t.accentColor}}>Team {t.id}</div>
                      <div style={{fontSize:"11px",color:"#607a70"}}>{t.name}</div>
                      <div style={{fontSize:"10px",color:"#506050",marginTop:"2px"}}>{t.difficulty}</div>
                    </td>
                    {t.members.map((m,j)=>(
                      <td key={j} style={{padding:"14px 10px",textAlign:"center",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                        <div style={{fontSize:"20px"}}>{m.sprite}</div>
                        <div style={{fontSize:"11px",color:"#8a9a90",marginTop:"3px"}}>{m.name}</div>
                      </td>
                    ))}
                    <td style={{padding:"14px 10px",textAlign:"center",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                      <div style={{
                        fontSize:"16px",fontWeight:"bold",color:t.accentColor,
                        background:`${t.accentColor}15`,border:`1px solid ${t.accentColor}44`,
                        borderRadius:"8px",padding:"4px 10px",display:"inline-block"
                      }}>{t.rating}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{marginTop:"28px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"14px"}}>
            {teams.map((t,i)=>(
              <div key={i} style={{
                padding:"16px 18px",borderRadius:"10px",cursor:"pointer",
                background: selectedTeam===i ? `${t.accentColor}15` : "rgba(255,255,255,0.03)",
                border:`1px solid ${selectedTeam===i ? t.accentColor+"66" : "rgba(255,255,255,0.07)"}`,
                transition:"all 0.2s",
              }} onClick={()=>{setSelectedTeam(i);setSelectedMon(0);setTab("team");}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                  <div style={{fontSize:"13px",fontWeight:"bold",color:t.accentColor}}>Team {t.id}: {t.name}</div>
                  <div style={{fontSize:"12px",color:t.accentColor,fontWeight:"bold"}}>{t.rating}/100</div>
                </div>
                <div style={{fontSize:"11px",color:"#607a70",fontStyle:"italic",marginBottom:"8px"}}>{t.subtitle}</div>
                <div style={{fontSize:"11px",color:"#8a9a90",lineHeight:"1.6"}}>{t.description.slice(0,140)}…</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}