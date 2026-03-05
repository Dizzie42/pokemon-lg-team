import { useState, useRef } from "react";

const typeColors = {
  Grass:"#3d9e50",Poison:"#9b59b6",Water:"#2980b9",Ice:"#5dade2",
  Fire:"#e74c3c",Normal:"#95a5a6",Flying:"#85c1e9",Psychic:"#e91e8c",
  Ground:"#a0714f",Electric:"#f1c40f",Bug:"#7dbb00",Rock:"#a07850",
  Ghost:"#6c3483",Dragon:"#2e4bce",Steel:"#708090",Fighting:"#e8622a",
};

// ─── POKÉDEX DATA ───────────────────────────────────────────────────────────
const pokedexData = [
  // Starters
  {id:"001",name:"Bulbasaur",types:["Grass","Poison"],sprite:"🌿",how:"Starter choice from Professor Oak (Pallet Town)"},
  {id:"002",name:"Ivysaur",types:["Grass","Poison"],sprite:"🌿",how:"Evolve Bulbasaur at Lv.16"},
  {id:"003",name:"Venusaur",types:["Grass","Poison"],sprite:"🌿",how:"Evolve Ivysaur at Lv.32"},
  {id:"004",name:"Charmander",types:["Fire"],sprite:"🔥",how:"Starter choice from Professor Oak (Pallet Town)"},
  {id:"005",name:"Charmeleon",types:["Fire"],sprite:"🔥",how:"Evolve Charmander at Lv.16"},
  {id:"006",name:"Charizard",types:["Fire","Flying"],sprite:"🔥",how:"Evolve Charmeleon at Lv.36"},
  {id:"007",name:"Squirtle",types:["Water"],sprite:"💧",how:"Starter choice from Professor Oak (Pallet Town)"},
  {id:"008",name:"Wartortle",types:["Water"],sprite:"💧",how:"Evolve Squirtle at Lv.16"},
  {id:"009",name:"Blastoise",types:["Water"],sprite:"💧",how:"Evolve Wartortle at Lv.36"},
  {id:"010",name:"Caterpie",types:["Bug"],sprite:"🐛",how:"LeafGreen exclusive — Routes 2, 24, 25; Viridian Forest"},
  {id:"011",name:"Metapod",types:["Bug"],sprite:"🐛",how:"Evolve Caterpie at Lv.7; Viridian Forest"},
  {id:"012",name:"Butterfree",types:["Bug","Flying"],sprite:"🦋",how:"Evolve Metapod at Lv.10"},
  {id:"013",name:"Weedle",types:["Bug","Poison"],sprite:"🐛",how:"FireRed exclusive — trade or import"},
  {id:"014",name:"Kakuna",types:["Bug","Poison"],sprite:"🐛",how:"FireRed exclusive — trade or import"},
  {id:"015",name:"Beedrill",types:["Bug","Poison"],sprite:"🐝",how:"FireRed exclusive — trade or import"},
  {id:"016",name:"Pidgey",types:["Normal","Flying"],sprite:"🐦",how:"Routes 1, 2, 5, 6, 7, 8, 12, 13, 14, 15"},
  {id:"017",name:"Pidgeotto",types:["Normal","Flying"],sprite:"🐦",how:"Evolve Pidgey at Lv.18; Routes 13, 14, 15"},
  {id:"018",name:"Pidgeot",types:["Normal","Flying"],sprite:"🐦",how:"Evolve Pidgeotto at Lv.36"},
  {id:"019",name:"Rattata",types:["Normal"],sprite:"🐭",how:"Routes 1, 22, 23; many early routes"},
  {id:"020",name:"Raticate",types:["Normal"],sprite:"🐭",how:"Evolve Rattata at Lv.20; Routes 16, 17, 18"},
  {id:"021",name:"Spearow",types:["Normal","Flying"],sprite:"🐦",how:"Routes 3, 4, 9, 10, 11, 16, 17, 18, 22, 23"},
  {id:"022",name:"Fearow",types:["Normal","Flying"],sprite:"🦅",how:"Evolve Spearow at Lv.20; Routes 16, 17, 18, 23"},
  {id:"023",name:"Ekans",types:["Poison"],sprite:"🐍",how:"FireRed exclusive — trade or import"},
  {id:"024",name:"Arbok",types:["Poison"],sprite:"🐍",how:"FireRed exclusive — trade or import"},
  {id:"025",name:"Pikachu",types:["Electric"],sprite:"⚡",how:"Viridian Forest; Power Plant"},
  {id:"026",name:"Raichu",types:["Electric"],sprite:"⚡",how:"Evolve Pikachu with Thunder Stone (Celadon Dept Store)"},
  {id:"027",name:"Sandshrew",types:["Ground"],sprite:"🏜️",how:"LeafGreen exclusive — Routes 4, 22 (rare)"},
  {id:"028",name:"Sandslash",types:["Ground"],sprite:"🏜️",how:"Evolve Sandshrew at Lv.22"},
  {id:"029",name:"Nidoran♀",types:["Poison"],sprite:"💜",how:"Routes 22, 23; Safari Zone"},
  {id:"030",name:"Nidorina",types:["Poison"],sprite:"💜",how:"Evolve Nidoran♀ at Lv.16; Safari Zone"},
  {id:"031",name:"Nidoqueen",types:["Poison","Ground"],sprite:"💜",how:"Evolve Nidorina with Moon Stone"},
  {id:"032",name:"Nidoran♂",types:["Poison"],sprite:"💙",how:"Routes 22, 23; Safari Zone"},
  {id:"033",name:"Nidorino",types:["Poison"],sprite:"💙",how:"Evolve Nidoran♂ at Lv.16; Safari Zone"},
  {id:"034",name:"Nidoking",types:["Poison","Ground"],sprite:"👑",how:"Evolve Nidorino with Moon Stone (Mt. Moon / Route 2)"},
  {id:"035",name:"Clefairy",types:["Normal"],sprite:"🌙",how:"Mt. Moon (common); Clefairy appear near Moon Stone"},
  {id:"036",name:"Clefable",types:["Normal"],sprite:"🌙",how:"Evolve Clefairy with Moon Stone"},
  {id:"037",name:"Vulpix",types:["Fire"],sprite:"🦊",how:"LeafGreen exclusive — Routes 7, 8"},
  {id:"038",name:"Ninetales",types:["Fire"],sprite:"🦊",how:"Evolve Vulpix with Fire Stone (Celadon Dept Store)"},
  {id:"039",name:"Jigglypuff",types:["Normal"],sprite:"🎤",how:"Routes 3, 115 (post-National Dex); Lv.1 trade w/ Abra"},
  {id:"040",name:"Wigglytuff",types:["Normal"],sprite:"🎤",how:"Evolve Jigglypuff with Moon Stone"},
  {id:"041",name:"Zubat",types:["Poison","Flying"],sprite:"🦇",how:"Mt. Moon, Rock Tunnel, Seafoam Islands, Victory Road — any cave"},
  {id:"042",name:"Golbat",types:["Poison","Flying"],sprite:"🦇",how:"Evolve Zubat at Lv.22; Victory Road, Seafoam Islands"},
  {id:"043",name:"Oddish",types:["Grass","Poison"],sprite:"🌿",how:"LeafGreen exclusive — Routes 5, 6, 7, 8, 12, 13, 14, 15"},
  {id:"044",name:"Gloom",types:["Grass","Poison"],sprite:"🌿",how:"Evolve Oddish at Lv.21; Routes 12–15 (rare)"},
  {id:"045",name:"Vileplume",types:["Grass","Poison"],sprite:"🌺",how:"Evolve Gloom with Leaf Stone (Celadon Dept Store)"},
  {id:"046",name:"Paras",types:["Bug","Grass"],sprite:"🍄",how:"Mt. Moon, Safari Zone"},
  {id:"047",name:"Parasect",types:["Bug","Grass"],sprite:"🍄",how:"Evolve Paras at Lv.24; Safari Zone"},
  {id:"048",name:"Venonat",types:["Bug","Poison"],sprite:"🐛",how:"Routes 12, 13, 14, 15, 24, 25; Safari Zone"},
  {id:"049",name:"Venomoth",types:["Bug","Poison"],sprite:"🦋",how:"Evolve Venonat at Lv.31; Safari Zone"},
  {id:"050",name:"Diglett",types:["Ground"],sprite:"🕳️",how:"Diglett's Cave (between Route 2 and Vermilion)"},
  {id:"051",name:"Dugtrio",types:["Ground"],sprite:"🕳️",how:"Evolve Diglett at Lv.26; Diglett's Cave (rare)"},
  {id:"052",name:"Meowth",types:["Normal"],sprite:"🐱",how:"FireRed exclusive — trade or import"},
  {id:"053",name:"Persian",types:["Normal"],sprite:"🐱",how:"FireRed exclusive — trade or import"},
  {id:"054",name:"Psyduck",types:["Water"],sprite:"🦆",how:"LeafGreen exclusive — Seafoam Islands, Routes 23, 25 (surf)"},
  {id:"055",name:"Golduck",types:["Water"],sprite:"🦆",how:"Evolve Psyduck at Lv.33; Seafoam Islands"},
  {id:"056",name:"Mankey",types:["Fighting"],sprite:"🐒",how:"FireRed exclusive — trade or import"},
  {id:"057",name:"Primeape",types:["Fighting"],sprite:"🐒",how:"FireRed exclusive — trade or import"},
  {id:"058",name:"Growlithe",types:["Fire"],sprite:"🔥",how:"FireRed exclusive — trade or import"},
  {id:"059",name:"Arcanine",types:["Fire"],sprite:"🔥",how:"Evolve Growlithe (FireRed) with Fire Stone — trade"},
  {id:"060",name:"Poliwag",types:["Water"],sprite:"🌀",how:"Routes 22, 23; Safari Zone; surf various routes"},
  {id:"061",name:"Poliwhirl",types:["Water"],sprite:"🌀",how:"Evolve Poliwag at Lv.25; Safari Zone"},
  {id:"062",name:"Poliwrath",types:["Water","Fighting"],sprite:"🌀",how:"Evolve Poliwhirl with Water Stone"},
  {id:"063",name:"Abra",types:["Psychic"],sprite:"🥄",how:"Routes 24, 25 — use Poké Ball immediately (teleports turn 1)"},
  {id:"064",name:"Kadabra",types:["Psychic"],sprite:"🥄",how:"Evolve Abra at Lv.16"},
  {id:"065",name:"Alakazam",types:["Psychic"],sprite:"🥄",how:"Trade evolution only — trade Kadabra (skippable, use Kadabra)"},
  {id:"066",name:"Machop",types:["Fighting"],sprite:"💪",how:"Mt. Moon, Rock Tunnel, Victory Road; Trade from NPC in Vermilion"},
  {id:"067",name:"Machoke",types:["Fighting"],sprite:"💪",how:"Evolve Machop at Lv.28; Victory Road"},
  {id:"068",name:"Machamp",types:["Fighting"],sprite:"💪",how:"Trade evolution only — trade Machoke"},
  {id:"069",name:"Bellsprout",types:["Grass","Poison"],sprite:"🌱",how:"FireRed exclusive — trade or import"},
  {id:"070",name:"Weepinbell",types:["Grass","Poison"],sprite:"🌱",how:"FireRed exclusive — trade or import"},
  {id:"071",name:"Victreebel",types:["Grass","Poison"],sprite:"🌱",how:"FireRed exclusive — trade or import"},
  {id:"072",name:"Tentacool",types:["Water","Poison"],sprite:"🎐",how:"Surfing on most ocean routes (very common)"},
  {id:"073",name:"Tentacruel",types:["Water","Poison"],sprite:"🎐",how:"Evolve Tentacool at Lv.30; surfing on routes 19–21"},
  {id:"074",name:"Geodude",types:["Rock","Ground"],sprite:"🪨",how:"Mt. Moon, Rock Tunnel, Seafoam Islands, Victory Road"},
  {id:"075",name:"Graveler",types:["Rock","Ground"],sprite:"🪨",how:"Evolve Geodude at Lv.25; Seafoam Islands, Victory Road"},
  {id:"076",name:"Golem",types:["Rock","Ground"],sprite:"🪨",how:"Trade evolution only — trade Graveler"},
  {id:"077",name:"Ponyta",types:["Fire"],sprite:"🐴",how:"Routes 17 (Cycling Road — rare encounter)"},
  {id:"078",name:"Rapidash",types:["Fire"],sprite:"🐴",how:"Evolve Ponyta at Lv.40"},
  {id:"079",name:"Slowpoke",types:["Water","Psychic"],sprite:"🌊",how:"Routes 12, 13 (surf/fish); Safari Zone"},
  {id:"080",name:"Slowbro",types:["Water","Psychic"],sprite:"🌊",how:"Evolve Slowpoke at Lv.37"},
  {id:"081",name:"Magnemite",types:["Electric","Steel"],sprite:"🧲",how:"Power Plant, Routes 10 (near Power Plant)"},
  {id:"082",name:"Magneton",types:["Electric","Steel"],sprite:"🧲",how:"Evolve Magnemite at Lv.30; Power Plant"},
  {id:"083",name:"Farfetch'd",types:["Normal","Flying"],sprite:"🦆",how:"In-game trade: give Spearow to NPC in Vermilion City"},
  {id:"084",name:"Doduo",types:["Normal","Flying"],sprite:"🐦",how:"Routes 16, 17, 18, 22 (rare)"},
  {id:"085",name:"Dodrio",types:["Normal","Flying"],sprite:"🦅",how:"Evolve Doduo at Lv.31; Routes 17 (rare)"},
  {id:"086",name:"Seel",types:["Water"],sprite:"🦭",how:"Seafoam Islands (surfing or walking lower floors)"},
  {id:"087",name:"Dewgong",types:["Water","Ice"],sprite:"🦭",how:"Evolve Seel at Lv.34; Seafoam Islands"},
  {id:"088",name:"Grimer",types:["Poison"],sprite:"☣️",how:"FireRed exclusive — trade or import"},
  {id:"089",name:"Muk",types:["Poison"],sprite:"☣️",how:"FireRed exclusive — trade or import"},
  {id:"090",name:"Shellder",types:["Water"],sprite:"🐚",how:"LeafGreen exclusive — Routes 6, 11, 20, 21 (Super Rod)"},
  {id:"091",name:"Cloyster",types:["Water","Ice"],sprite:"🐚",how:"Evolve Shellder with Water Stone"},
  {id:"092",name:"Gastly",types:["Ghost","Poison"],sprite:"👻",how:"Pokémon Tower (Lavender Town) — all floors"},
  {id:"093",name:"Haunter",types:["Ghost","Poison"],sprite:"👻",how:"Evolve Gastly at Lv.25; Pokémon Tower upper floors"},
  {id:"094",name:"Gengar",types:["Ghost","Poison"],sprite:"👻",how:"Trade evolution only — trade Haunter"},
  {id:"095",name:"Onix",types:["Rock","Ground"],sprite:"🐍",how:"Rock Tunnel, Victory Road, Brock's Gym (trade)"},
  {id:"096",name:"Drowzee",types:["Psychic"],sprite:"😴",how:"Routes 11, 12 (grass)"},
  {id:"097",name:"Hypno",types:["Psychic"],sprite:"😴",how:"Evolve Drowzee at Lv.26"},
  {id:"098",name:"Krabby",types:["Water"],sprite:"🦀",how:"Routes 6, 11, 25 (Old Rod / Good Rod); Seafoam Islands"},
  {id:"099",name:"Kingler",types:["Water"],sprite:"🦀",how:"Evolve Krabby at Lv.28"},
  {id:"100",name:"Voltorb",types:["Electric"],sprite:"💣",how:"Power Plant; also disguised as items (be careful!)"},
  {id:"101",name:"Electrode",types:["Electric"],sprite:"💣",how:"Evolve Voltorb at Lv.30; Power Plant"},
  {id:"102",name:"Exeggcute",types:["Grass","Psychic"],sprite:"🥚",how:"Safari Zone (common)"},
  {id:"103",name:"Exeggutor",types:["Grass","Psychic"],sprite:"🌴",how:"Evolve Exeggcute with Leaf Stone"},
  {id:"104",name:"Cubone",types:["Ground"],sprite:"💀",how:"Pokémon Tower (Lavender Town); Safari Zone"},
  {id:"105",name:"Marowak",types:["Ground"],sprite:"💀",how:"Evolve Cubone at Lv.28 (boss version in Pokémon Tower is ghost, uncatchable)"},
  {id:"106",name:"Hitmonlee",types:["Fighting"],sprite:"💥",how:"Saffron City Fighting Dojo — choose one of two prizes after beating it"},
  {id:"107",name:"Hitmonchan",types:["Fighting"],sprite:"🥊",how:"Saffron City Fighting Dojo — choose one of two prizes (Hitmonlee or Hitmonchan)"},
  {id:"108",name:"Lickitung",types:["Normal"],sprite:"👅",how:"In-game trade: give Slowbro to NPC on Route 18"},
  {id:"109",name:"Koffing",types:["Poison"],sprite:"☁️",how:"FireRed exclusive — trade or import"},
  {id:"110",name:"Weezing",types:["Poison"],sprite:"☁️",how:"FireRed exclusive — trade or import"},
  {id:"111",name:"Rhyhorn",types:["Ground","Rock"],sprite:"🦏",how:"Safari Zone (common in various areas); Victory Road"},
  {id:"112",name:"Rhydon",types:["Ground","Rock"],sprite:"🦏",how:"Evolve Rhyhorn at Lv.42; Victory Road (rare)"},
  {id:"113",name:"Chansey",types:["Normal"],sprite:"🥚",how:"Safari Zone (rare); Pokémon Tower (rare)"},
  {id:"114",name:"Tangela",types:["Grass"],sprite:"🌿",how:"LeafGreen exclusive — Routes 21 (south of Pallet, surf)"},
  {id:"115",name:"Kangaskhan",types:["Normal"],sprite:"🦘",how:"Safari Zone (uncommon)"},
  {id:"116",name:"Horsea",types:["Water"],sprite:"🐴",how:"LeafGreen exclusive — Routes 19, 20, 21 (Super Rod)"},
  {id:"117",name:"Seadra",types:["Water"],sprite:"🐴",how:"Evolve Horsea at Lv.32"},
  {id:"118",name:"Goldeen",types:["Water"],sprite:"🐠",how:"Routes 12, 13, Safari Zone (Old/Good Rod)"},
  {id:"119",name:"Seaking",types:["Water"],sprite:"🐠",how:"Evolve Goldeen at Lv.33; routes via Super Rod"},
  {id:"120",name:"Staryu",types:["Water"],sprite:"⭐",how:"LeafGreen exclusive — Routes 19, 20, 21 (Super Rod / surfing)"},
  {id:"121",name:"Starmie",types:["Water","Psychic"],sprite:"⭐",how:"Evolve Staryu with Water Stone (Celadon Dept Store)"},
  {id:"122",name:"Mr. Mime",types:["Psychic"],sprite:"🎭",how:"In-game trade: give Clefairy to NPC on Route 2 (south, requires Cut)"},
  {id:"123",name:"Scyther",types:["Bug","Flying"],sprite:"⚔️",how:"FireRed exclusive — Safari Zone or Game Corner"},
  {id:"124",name:"Jynx",types:["Ice","Psychic"],sprite:"💋",how:"Seafoam Islands (walking floors B1–B4); also in-game trade for Poliwhirl"},
  {id:"125",name:"Electabuzz",types:["Electric"],sprite:"⚡",how:"FireRed exclusive — Power Plant"},
  {id:"126",name:"Magmar",types:["Fire"],sprite:"🔥",how:"LeafGreen exclusive — Pokémon Mansion (Cinnabar Island)"},
  {id:"127",name:"Pinsir",types:["Bug"],sprite:"🦀",how:"LeafGreen exclusive — Safari Zone (rare)"},
  {id:"128",name:"Tauros",types:["Normal"],sprite:"🐂",how:"Safari Zone (uncommon)"},
  {id:"129",name:"Magikarp",types:["Water"],sprite:"🐟",how:"Old Rod anywhere (very common); sold for ₽500 by NPC on Route 4"},
  {id:"130",name:"Gyarados",types:["Water","Flying"],sprite:"🐉",how:"Evolve Magikarp at Lv.20; also in Lake of Rage (post-National Dex)"},
  {id:"131",name:"Lapras",types:["Water","Ice"],sprite:"🧊",how:"FREE gift from Silph Co. employee on 7F after defeating Team Rocket"},
  {id:"132",name:"Ditto",types:["Normal"],sprite:"🔵",how:"Pokémon Mansion (Cinnabar); Cerulean Cave (post-game)"},
  {id:"133",name:"Eevee",types:["Normal"],sprite:"🦊",how:"FREE from Celadon City Mansion (back entrance, top floor)"},
  {id:"134",name:"Vaporeon",types:["Water"],sprite:"💧",how:"Evolve Eevee with Water Stone"},
  {id:"135",name:"Jolteon",types:["Electric"],sprite:"⚡",how:"Evolve Eevee with Thunder Stone (Celadon Dept Store 4F)"},
  {id:"136",name:"Flareon",types:["Fire"],sprite:"🔥",how:"Evolve Eevee with Fire Stone"},
  {id:"137",name:"Porygon",types:["Normal"],sprite:"🤖",how:"Celadon Game Corner — 9999 coins"},
  {id:"138",name:"Omanyte",types:["Rock","Water"],sprite:"🐚",how:"Revive from Dome Fossil (Mt. Moon) at Cinnabar Island Lab"},
  {id:"139",name:"Omastar",types:["Rock","Water"],sprite:"🐚",how:"Evolve Omanyte at Lv.40"},
  {id:"140",name:"Kabuto",types:["Rock","Water"],sprite:"🦀",how:"Revive from Helix Fossil (Mt. Moon) at Cinnabar Island Lab"},
  {id:"141",name:"Kabutops",types:["Rock","Water"],sprite:"🦀",how:"Evolve Kabuto at Lv.40"},
  {id:"142",name:"Aerodactyl",types:["Rock","Flying"],sprite:"🦖",how:"Revive from Old Amber (Pewter Museum back room) at Cinnabar Island Lab"},
  {id:"143",name:"Snorlax",types:["Normal"],sprite:"😴",how:"Route 12 AND Route 16 — use Pokéflute (from Lavender Tower) to wake"},
  {id:"144",name:"Articuno",types:["Ice","Flying"],sprite:"❄️",how:"LEGENDARY — Seafoam Islands B4F (requires Surf + Strength)"},
  {id:"145",name:"Zapdos",types:["Electric","Flying"],sprite:"⚡",how:"LEGENDARY — Power Plant (requires Surf)"},
  {id:"146",name:"Moltres",types:["Fire","Flying"],sprite:"🔥",how:"LEGENDARY — Mt. Ember (Kindle Road on One Island, post-game)"},
  {id:"147",name:"Dratini",types:["Dragon"],sprite:"🐲",how:"Safari Zone (surf on the fishing pond area); Game Corner Celadon (4600 coins)"},
  {id:"148",name:"Dragonair",types:["Dragon"],sprite:"🐲",how:"Evolve Dratini at Lv.30"},
  {id:"149",name:"Dragonite",types:["Dragon","Flying"],sprite:"🐉",how:"Evolve Dragonair at Lv.55"},
  {id:"150",name:"Mewtwo",types:["Psychic"],sprite:"🧬",how:"LEGENDARY — Cerulean Cave B1F (post-game, requires all 8 badges + Elite Four)"},
  {id:"151",name:"Mew",types:["Psychic"],sprite:"✨",how:"Event only — not obtainable in normal gameplay"},
];

// ─── TM/HM DATA ─────────────────────────────────────────────────────────────
const tmhmData = [
  {id:"TM01",name:"Focus Punch",type:"Fighting",power:"150",cat:"Physical",where:"Silph Co. 2F"},
  {id:"TM02",name:"Dragon Claw",type:"Dragon",power:"80",cat:"Physical",where:"Victory Road 1F"},
  {id:"TM03",name:"Water Pulse",type:"Water",power:"60",cat:"Special",where:"Misty (Cerulean Gym reward)"},
  {id:"TM04",name:"Calm Mind",type:"Psychic",power:"—",cat:"Status",where:"Sabrina (Saffron Gym reward)"},
  {id:"TM05",name:"Roar",type:"Normal",power:"—",cat:"Status",where:"Route 4"},
  {id:"TM06",name:"Toxic",type:"Poison",power:"—",cat:"Status",where:"Koga (Fuchsia Gym reward)"},
  {id:"TM07",name:"Hail",type:"Ice",power:"—",cat:"Status",where:"Icefall Cave (One Island — post-game)"},
  {id:"TM08",name:"Bulk Up",type:"Fighting",power:"—",cat:"Status",where:"Chuck — wait, FRLG: Brawly reward / Route 10 North"},
  {id:"TM09",name:"Bullet Seed",type:"Grass",power:"10×",cat:"Physical",where:"Route 6"},
  {id:"TM10",name:"Hidden Power",type:"Normal",power:"60",cat:"Special",where:"Game Corner Celadon (3000 coins) or Route 2"},
  {id:"TM11",name:"Sunny Day",type:"Fire",power:"—",cat:"Status",where:"Mt. Ember (One Island area)"},
  {id:"TM12",name:"Taunt",type:"Dark",power:"—",cat:"Status",where:"Route 6 (south)"},
  {id:"TM13",name:"Ice Beam",type:"Ice",power:"95",cat:"Special",where:"Seafoam Islands OR Game Corner (4000 coins) — highest priority TM"},
  {id:"TM14",name:"Blizzard",type:"Ice",power:"120",cat:"Special",where:"Celadon Dept Store (5F, ₽5500)"},
  {id:"TM15",name:"Hyper Beam",type:"Normal",power:"150",cat:"Special",where:"Celadon Dept Store (5F, ₽7500)"},
  {id:"TM16",name:"Light Screen",type:"Psychic",power:"—",cat:"Status",where:"Celadon Dept Store (5F, ₽3000)"},
  {id:"TM17",name:"Protect",type:"Normal",power:"—",cat:"Status",where:"Celadon Dept Store (5F, ₽3000)"},
  {id:"TM18",name:"Rain Dance",type:"Water",power:"—",cat:"Status",where:"Mt. Ember (One Island area)"},
  {id:"TM19",name:"Giga Drain",type:"Grass",power:"60",cat:"Special",where:"Erika (Celadon Gym reward) — must beat Erika"},
  {id:"TM20",name:"Safeguard",type:"Normal",power:"—",cat:"Status",where:"Celadon Dept Store (5F, ₽3000)"},
  {id:"TM21",name:"Frustration",type:"Normal",power:"varies",cat:"Physical",where:"Rocket Hideout (Celadon)"},
  {id:"TM22",name:"SolarBeam",type:"Grass",power:"120",cat:"Special",where:"Pokémon Mansion (Cinnabar Island)"},
  {id:"TM23",name:"Iron Tail",type:"Steel",power:"100",cat:"Physical",where:"Pokémon Tower (Lavender Town) — upper floors"},
  {id:"TM24",name:"Thunderbolt",type:"Electric",power:"95",cat:"Special",where:"Game Corner Celadon (4000 coins) or Lt. Surge reward — top priority"},
  {id:"TM25",name:"Thunder",type:"Electric",power:"120",cat:"Special",where:"Celadon Dept Store (5F, ₽5500)"},
  {id:"TM26",name:"Earthquake",type:"Ground",power:"100",cat:"Physical",where:"Silph Co. (Giovanni drops it after battle)"},
  {id:"TM27",name:"Return",type:"Normal",power:"up to 102",cat:"Physical",where:"Various NPCs (Pallet Town, One Island)"},
  {id:"TM28",name:"Dig",type:"Ground",power:"80",cat:"Physical",where:"Route 11 (NPC gift)"},
  {id:"TM29",name:"Psychic",type:"Psychic",power:"90",cat:"Special",where:"Saffron City (Mr. Psychic's house) or Game Corner (3500 coins)"},
  {id:"TM30",name:"Shadow Ball",type:"Ghost",power:"80",cat:"Special",where:"Pokémon Tower (Lavender Town) — top floor"},
  {id:"TM31",name:"Brick Break",type:"Fighting",power:"75",cat:"Physical",where:"Silph Co. 7F"},
  {id:"TM32",name:"Double Team",type:"Normal",power:"—",cat:"Status",where:"Game Corner Celadon (1500 coins)"},
  {id:"TM33",name:"Reflect",type:"Psychic",power:"—",cat:"Status",where:"Celadon Dept Store (5F, ₽3000)"},
  {id:"TM34",name:"Shock Wave",type:"Electric",power:"60",cat:"Special",where:"Lt. Surge (Vermilion Gym reward)"},
  {id:"TM35",name:"Flamethrower",type:"Fire",power:"95",cat:"Special",where:"Game Corner Celadon (4000 coins) or Blaine reward"},
  {id:"TM36",name:"Sludge Bomb",type:"Poison",power:"90",cat:"Special",where:"Rocket Hideout (Celadon basement)"},
  {id:"TM37",name:"Sandstorm",type:"Rock",power:"—",cat:"Status",where:"Route 4 / Desert area"},
  {id:"TM38",name:"Fire Blast",type:"Fire",power:"120",cat:"Special",where:"Celadon Dept Store (5F, ₽5500)"},
  {id:"TM39",name:"Rock Tomb",type:"Rock",power:"60",cat:"Physical",where:"Brock (Pewter Gym reward)"},
  {id:"TM40",name:"Aerial Ace",type:"Flying",power:"60",cat:"Physical",where:"Route 9 (NPC gift)"},
  {id:"TM41",name:"Torment",type:"Dark",power:"—",cat:"Status",where:"Rocket Hideout (Celadon)"},
  {id:"TM42",name:"Facade",type:"Normal",power:"70",cat:"Physical",where:"Pewter City (NPC after beating Brock)"},
  {id:"TM43",name:"Secret Power",type:"Normal",power:"70",cat:"Physical",where:"Route 23 / various"},
  {id:"TM44",name:"Rest",type:"Psychic",power:"—",cat:"Status",where:"Celadon Dept Store (5F, ₽3000)"},
  {id:"TM45",name:"Attract",type:"Normal",power:"—",cat:"Status",where:"Celadon Dept Store (4F)"},
  {id:"TM46",name:"Thief",type:"Dark",power:"60",cat:"Physical",where:"Rocket Hideout (Celadon)"},
  {id:"TM47",name:"Steel Wing",type:"Steel",power:"70",cat:"Physical",where:"Route 2 (south, requires Cut)"},
  {id:"TM48",name:"Skill Swap",type:"Psychic",power:"—",cat:"Status",where:"Silph Co."},
  {id:"TM49",name:"Snatch",type:"Dark",power:"—",cat:"Status",where:"Rocket Hideout / S.S. Anne"},
  {id:"TM50",name:"Overheat",type:"Fire",power:"140",cat:"Special",where:"Blaine (Cinnabar Gym reward)"},
  {id:"HM01",name:"Cut",type:"Normal",power:"50",cat:"Physical",where:"S.S. Anne Captain's room (Vermilion) — required for many paths"},
  {id:"HM02",name:"Fly",type:"Flying",power:"70",cat:"Physical",where:"Route 16 (gift from girl in house past Cut tree)"},
  {id:"HM03",name:"Surf",type:"Water",power:"95",cat:"Special",where:"Safari Zone Warden's gift (after returning Gold Teeth)"},
  {id:"HM04",name:"Strength",type:"Normal",power:"80",cat:"Physical",where:"Safari Zone Warden (give Gold Teeth found in Safari Zone)"},
  {id:"HM05",name:"Flash",type:"Normal",power:"—",cat:"Status",where:"Route 2 (NPC south of Viridian Forest, requires Cut)"},
  {id:"HM06",name:"Rock Smash",type:"Fighting",power:"20",cat:"Physical",where:"One Island (post-game)"},
  {id:"HM07",name:"Waterfall",type:"Water",power:"80",cat:"Physical",where:"Icefall Cave (One Island — post-game)"},
];

// ─── KEY ITEMS / PROGRESSION CHECKLIST ──────────────────────────────────────
const checklistData = [
  {
    phase:"Early Game", color:"#3d9e50",
    items:[
      {id:"c1", text:"Choose Bulbasaur as starter (Pallet Town — Professor Oak's Lab)"},
      {id:"c2", text:"Catch Nidoran♂ on Route 22 early — Moon Stone → Nidoking ASAP"},
      {id:"c3", text:"Get Potion / PokéBalls from Oak's Lab before first route"},
      {id:"c4", text:"Pick up Moon Stone in Mt. Moon — evolve Nidorino immediately"},
      {id:"c5", text:"Grab the Old Rod from Vermilion City fisherman (catch Magikarp optionally)"},
      {id:"c6", text:"Get TM28 Dig from Route 11 NPC (free, useful escape + move)"},
      {id:"c7", text:"Board S.S. Anne → get HM01 Cut from captain"},
      {id:"c8", text:"Beat Lt. Surge → get Thunder Badge (enables Fly use)"},
    ]
  },
  {
    phase:"Mid Game", color:"#2980b9",
    items:[
      {id:"c9", text:"Get Bike Voucher from Vermilion fan club chairman → exchange in Cerulean Bike Shop"},
      {id:"c10", text:"Catch Abra on Routes 24/25 — use Poké Ball turn 1 before it Teleports"},
      {id:"c11", text:"Beat Erika (Celadon Gym) → get TM19 Giga Drain"},
      {id:"c12", text:"Get Eevee from Celadon Mansion rooftop (back entrance) — evolve to Jolteon"},
      {id:"c13", text:"Buy TM24 Thunderbolt + TM13 Ice Beam at Celadon Game Corner — top priority"},
      {id:"c14", text:"Get TM36 Sludge Bomb from Rocket Hideout (Celadon basement)"},
      {id:"c15", text:"Get Silph Scope from Rocket Hideout — needed to identify Ghost-types in Lavender Tower"},
      {id:"c16", text:"Rescue Mr. Fuji in Pokémon Tower → receive Pokéflute"},
      {id:"c17", text:"Wake Snorlax on Route 12 or Route 16 with Pokéflute — catch it"},
      {id:"c18", text:"Get HM03 Surf from Safari Zone Warden (give Gold Teeth)"},
      {id:"c19", text:"Get HM04 Strength from Safari Zone Warden (same exchange as Surf)"},
      {id:"c20", text:"Beat Koga (Fuchsia Gym) → get Soul Badge (enables Surf use)"},
    ]
  },
  {
    phase:"Late Game", color:"#8e44ad",
    items:[
      {id:"c21", text:"Get Lapras for FREE on Silph Co. 7F after defeating Team Rocket (or skip for Starmie)"},
      {id:"c22", text:"Get TM26 Earthquake — Giovanni drops it after Silph Co. battle"},
      {id:"c23", text:"Beat Sabrina (Saffron Gym) → get TM04 Calm Mind"},
      {id:"c24", text:"Get HM02 Fly from girl's house on Route 16 (past Cut tree)"},
      {id:"c25", text:"Catch Staryu (LeafGreen) on Routes 19–21 via Super Rod → evolve with Water Stone"},
      {id:"c26", text:"Get Good Rod from NPC in Fuschia City (fishing guru's house)"},
      {id:"c27", text:"Get Super Rod from NPC on Route 12"},
      {id:"c28", text:"Revive fossils at Cinnabar Island Lab (Dome/Helix + Old Amber)"},
      {id:"c29", text:"Beat Blaine (Cinnabar Gym) → get TM50 Overheat"},
      {id:"c30", text:"Beat Giovanni (Viridian Gym) → get Earth Badge (enables all HMs)"},
      {id:"c31", text:"Get TM29 Psychic from Mr. Psychic's house in Saffron City (free!)"},
    ]
  },
  {
    phase:"Elite Four Prep", color:"#e74c3c",
    items:[
      {id:"c32", text:"Stock 20+ Full Restores and 10+ Revives before Victory Road"},
      {id:"c33", text:"Ensure team is Lv.50+ (ideally 55+) before entering Victory Road"},
      {id:"c34", text:"Teach Ice Beam to Lapras or Starmie — essential for Lance's Dragons"},
      {id:"c35", text:"Teach Thunderbolt to Jolteon or Nidoking — covers Lorelei's Water/Ice types"},
      {id:"c36", text:"Make sure Kadabra knows Psychic + Shadow Ball — handles Bruno and Agatha"},
      {id:"c37", text:"Grab TM26 Earthquake if you haven't — mandatory for Nidoking"},
      {id:"c38", text:"Get TM44 Rest from Celadon Dept Store for Snorlax — makes it nearly unkillable"},
      {id:"c39", text:"Beat Victory Road and challenge the Elite Four — good luck!"},
    ]
  },
];

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
      <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.07)",background:"rgba(0,0,0,0.25)",padding:"0 24px",overflowX:"auto",flexWrap:"nowrap"}}>
        {[["team","🎮 Pokémon Detail"],["e4","⚔️ Elite Four"],["compare","📊 Team Compare"],["pokedex","📖 Pokédex"],["tmhm","💿 TM / HM"],["checklist","✅ Checklist"]].map(([t,label])=>(
          <button key={t} onClick={()=>setTab(t)} style={{
            background:"none",border:"none",cursor:"pointer",padding:"12px 14px",
            fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase",fontFamily:"inherit",
            color: tab===t ? team.accentColor : "#607a70",whiteSpace:"nowrap",
            borderBottom: tab===t ? `2px solid ${team.accentColor}` : "2px solid transparent",
            transition:"all 0.2s",flexShrink:0,
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
      {/* POKÉDEX TAB */}
      {tab==="pokedex" && <PokedexTab accentColor={team.accentColor}/>}

      {/* TM/HM TAB */}
      {tab==="tmhm" && <TmhmTab accentColor={team.accentColor}/>}

      {/* CHECKLIST TAB */}
      {tab==="checklist" && <ChecklistTab accentColor={team.accentColor}/>}

    </div>
  );
}

// ─── POKÉDEX TAB ─────────────────────────────────────────────────────────────
function PokedexTab({accentColor}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const allTypes = ["All","Grass","Poison","Fire","Water","Ice","Electric","Psychic","Normal","Flying","Ground","Rock","Bug","Ghost","Dragon","Steel","Fighting"];

  const filtered = pokedexData.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.how.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter==="All" || p.types.includes(typeFilter);
    return matchSearch && matchType;
  });

  const numericId = (id) => parseInt(id, 10);
  const spriteUrl   = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numericId(id)}.png`;
  const artworkUrl  = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numericId(id)}.png`;
  const primaryType = (p) => p.types[0];

  return (
    <div style={{padding:"24px",position:"relative"}}>
      <div style={{fontSize:"10px",letterSpacing:"3px",color:accentColor,textTransform:"uppercase",marginBottom:"6px"}}>Reference</div>
      <h2 style={{margin:"0 0 6px",fontSize:"20px",color:"#f0ead0"}}>Pokédex — All LeafGreen Pokémon & How to Get Them</h2>
      <p style={{margin:"0 0 18px",fontSize:"12px",color:"#607a70"}}>Click any card to expand with full official artwork.</p>

      {/* Filters */}
      <div style={{display:"flex",gap:"10px",marginBottom:"18px",flexWrap:"wrap"}}>
        <input
          value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Search Pokémon or location..."
          style={{flex:1,minWidth:"200px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"6px",padding:"8px 12px",color:"#e8e0d0",fontFamily:"inherit",fontSize:"13px",outline:"none"}}
        />
        <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)}
          style={{background:"#111820",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"6px",padding:"8px 12px",color:"#e8e0d0",fontFamily:"inherit",fontSize:"13px",cursor:"pointer"}}>
          {allTypes.map(t=><option key={t} value={t} style={{background:"#111820"}}>{t}</option>)}
        </select>
      </div>
      <div style={{fontSize:"12px",color:"#506050",marginBottom:"14px"}}>{filtered.length} Pokémon shown</div>

      {/* Grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:"8px"}}>
        {filtered.map(p => {
          const mainColor = typeColors[primaryType(p)] || "#607070";
          return (
            <div key={p.id} onClick={()=>setExpanded(expanded?.id===p.id ? null : p)}
              style={{
                background:`linear-gradient(160deg, ${mainColor}18, rgba(255,255,255,0.02))`,
                border:`1px solid ${mainColor}33`,
                borderRadius:"10px", padding:"12px 10px", cursor:"pointer",
                textAlign:"center", transition:"all 0.18s",
                boxShadow: expanded?.id===p.id ? `0 0 16px ${mainColor}44` : "none",
                transform: expanded?.id===p.id ? "scale(1.03)" : "scale(1)",
              }}>
              {/* Pixel sprite */}
              <div style={{height:"64px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <img
                  src={spriteUrl(p.id)}
                  alt={p.name}
                  style={{imageRendering:"pixelated",maxHeight:"64px",maxWidth:"64px"}}
                  onError={e=>{e.target.style.display="none";}}
                />
              </div>
              <div style={{fontSize:"9px",color:mainColor,marginBottom:"3px",letterSpacing:"1px"}}>#{p.id}</div>
              <div style={{fontSize:"12px",fontWeight:"bold",color:"#f0ead0",marginBottom:"5px"}}>{p.name}</div>
              <div style={{display:"flex",gap:"3px",justifyContent:"center",flexWrap:"wrap"}}>
                {p.types.map(t=>(
                  <span key={t} style={{fontSize:"8px",background:typeColors[t]||"#607070",color:"white",borderRadius:"3px",padding:"1px 5px",fontWeight:"bold"}}>{t}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded modal overlay */}
      {expanded && (
        <div onClick={()=>setExpanded(null)} style={{
          position:"fixed",top:0,left:0,right:0,bottom:0,
          background:"rgba(0,0,0,0.75)",zIndex:200,
          display:"flex",alignItems:"center",justifyContent:"center",
          backdropFilter:"blur(4px)",padding:"20px",
        }}>
          <div onClick={e=>e.stopPropagation()} style={{
            background:"linear-gradient(135deg,#0d1b2a,#0a0f1a)",
            border:`1px solid ${typeColors[primaryType(expanded)]||"#607070"}55`,
            borderRadius:"16px",padding:"28px",maxWidth:"480px",width:"100%",
            boxShadow:`0 0 60px ${typeColors[primaryType(expanded)]||"#607070"}22`,
            position:"relative",
          }}>
            {/* Close */}
            <button onClick={()=>setExpanded(null)} style={{
              position:"absolute",top:"14px",right:"14px",background:"rgba(255,255,255,0.08)",
              border:"1px solid rgba(255,255,255,0.1)",borderRadius:"50%",width:"28px",height:"28px",
              cursor:"pointer",color:"#8a9a90",fontSize:"14px",display:"flex",alignItems:"center",justifyContent:"center",
            }}>✕</button>

            <div style={{display:"flex",gap:"20px",alignItems:"flex-start"}}>
              {/* Official artwork */}
              <div style={{
                flexShrink:0,width:"140px",height:"140px",
                background:`radial-gradient(circle, ${typeColors[primaryType(expanded)]||"#607070"}22 0%, transparent 70%)`,
                display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"12px",
              }}>
                <img
                  src={artworkUrl(expanded.id)}
                  alt={expanded.name}
                  style={{maxWidth:"130px",maxHeight:"130px",objectFit:"contain",filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.5))"}}
                  onError={e=>{e.target.src=spriteUrl(expanded.id); e.target.style.imageRendering="pixelated";}}
                />
              </div>

              {/* Details */}
              <div style={{flex:1}}>
                <div style={{fontSize:"10px",color:typeColors[primaryType(expanded)]||"#607070",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"4px"}}>#{expanded.id}</div>
                <div style={{fontSize:"22px",fontWeight:"bold",color:"#f0ead0",marginBottom:"8px"}}>{expanded.name}</div>
                <div style={{display:"flex",gap:"5px",marginBottom:"14px",flexWrap:"wrap"}}>
                  {expanded.types.map(t=>(
                    <span key={t} style={{fontSize:"11px",background:typeColors[t]||"#607070",color:"white",borderRadius:"4px",padding:"3px 10px",fontWeight:"bold"}}>{t}</span>
                  ))}
                </div>
                <div style={{fontSize:"10px",color:typeColors[primaryType(expanded)]||"#607070",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"6px"}}>How to Obtain</div>
                <div style={{fontSize:"13px",color:"#b0c0b8",lineHeight:"1.7",background:"rgba(255,255,255,0.03)",borderRadius:"8px",padding:"10px 12px",border:"1px solid rgba(255,255,255,0.06)"}}>
                  {expanded.how}
                </div>

                {/* Pixel sprite small preview */}
                <div style={{marginTop:"12px",display:"flex",alignItems:"center",gap:"8px"}}>
                  <img src={spriteUrl(expanded.id)} alt="" style={{imageRendering:"pixelated",width:"40px",height:"40px",opacity:0.7}}/>
                  <span style={{fontSize:"10px",color:"#506050",fontStyle:"italic"}}>Gen III pixel sprite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TM/HM TAB ───────────────────────────────────────────────────────────────
function TmhmTab({accentColor}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = tmhmData.filter(tm => {
    const matchSearch = tm.name.toLowerCase().includes(search.toLowerCase()) ||
      tm.where.toLowerCase().includes(search.toLowerCase()) ||
      tm.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter==="All" || (filter==="HM" ? tm.id.startsWith("HM") : tm.id.startsWith("TM"));
    return matchSearch && matchFilter;
  });
  const catColor = {Physical:"#e8622a",Special:"#2980b9",Status:"#8e44ad"};
  return (
    <div style={{padding:"24px"}}>
      <div style={{fontSize:"10px",letterSpacing:"3px",color:accentColor,textTransform:"uppercase",marginBottom:"6px"}}>Reference</div>
      <h2 style={{margin:"0 0 6px",fontSize:"20px",color:"#f0ead0"}}>TM & HM List</h2>
      <p style={{margin:"0 0 18px",fontSize:"13px",color:"#607a70"}}>All TMs and HMs available in Pokémon LeafGreen, what they do, and exactly where to find them.</p>
      <div style={{display:"flex",gap:"10px",marginBottom:"18px",flexWrap:"wrap"}}>
        <input
          value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Search move name or location..."
          style={{flex:1,minWidth:"200px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"6px",padding:"8px 12px",color:"#e8e0d0",fontFamily:"inherit",fontSize:"13px",outline:"none"}}
        />
        {["All","TM","HM"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{
            background: filter===f ? accentColor : "rgba(255,255,255,0.05)",
            border:`1px solid ${filter===f ? accentColor : "rgba(255,255,255,0.1)"}`,
            borderRadius:"6px",padding:"8px 16px",cursor:"pointer",color: filter===f?"#fff":"#8a9a90",
            fontSize:"12px",fontFamily:"inherit",transition:"all 0.2s",
          }}>{f}</button>
        ))}
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",minWidth:"600px"}}>
          <thead>
            <tr style={{borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
              {["ID","Move","Type","Power","Cat.","Where to Get"].map(h=>(
                <th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",color:"#607a70"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((tm,i)=>(
              <tr key={tm.id} style={{borderBottom:"1px solid rgba(255,255,255,0.04)",background: i%2===0?"transparent":"rgba(255,255,255,0.015)"}}>
                <td style={{padding:"10px 12px"}}>
                  <span style={{
                    fontSize:"11px",fontWeight:"bold",
                    color: tm.id.startsWith("HM") ? "#f1c40f" : accentColor,
                    background: tm.id.startsWith("HM") ? "rgba(241,196,15,0.12)" : `${accentColor}15`,
                    border:`1px solid ${tm.id.startsWith("HM") ? "rgba(241,196,15,0.3)" : accentColor+"44"}`,
                    borderRadius:"4px",padding:"2px 7px",
                  }}>{tm.id}</span>
                </td>
                <td style={{padding:"10px 12px",fontSize:"13px",fontWeight:"bold",color:"#e8e0d0"}}>{tm.name}</td>
                <td style={{padding:"10px 12px"}}>
                  <span style={{fontSize:"10px",background:typeColors[tm.type]||"#607070",color:"white",borderRadius:"3px",padding:"2px 7px"}}>{tm.type}</span>
                </td>
                <td style={{padding:"10px 12px",fontSize:"13px",color:"#a0b0a8",textAlign:"center"}}>{tm.power}</td>
                <td style={{padding:"10px 12px"}}>
                  <span style={{fontSize:"10px",color:catColor[tm.cat]||"#8a9a90",background:`${catColor[tm.cat]||"#607070"}15`,borderRadius:"3px",padding:"2px 7px"}}>{tm.cat}</span>
                </td>
                <td style={{padding:"10px 12px",fontSize:"12px",color:"#8aa0a0"}}>{tm.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── CHECKLIST TAB ────────────────────────────────────────────────────────────
function ChecklistTab({accentColor}) {
  const [checked, setChecked] = useState({});
  const toggle = id => setChecked(prev => ({...prev, [id]: !prev[id]}));
  const totalItems = checklistData.flatMap(p=>p.items).length;
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((totalChecked/totalItems)*100);
  return (
    <div style={{padding:"24px",maxWidth:"820px"}}>
      <div style={{fontSize:"10px",letterSpacing:"3px",color:accentColor,textTransform:"uppercase",marginBottom:"6px"}}>Playthrough</div>
      <h2 style={{margin:"0 0 6px",fontSize:"20px",color:"#f0ead0"}}>Key Items & Progression Checklist</h2>
      <p style={{margin:"0 0 18px",fontSize:"13px",color:"#607a70"}}>Everything you need to do in order. Check off items as you go.</p>
      {/* Progress bar */}
      <div style={{marginBottom:"24px",padding:"14px 18px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"10px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
          <span style={{fontSize:"12px",color:"#8aa0a0"}}>Overall Progress</span>
          <span style={{fontSize:"14px",fontWeight:"bold",color:accentColor}}>{totalChecked} / {totalItems} ({pct}%)</span>
        </div>
        <div style={{height:"6px",background:"rgba(255,255,255,0.08)",borderRadius:"3px"}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${accentColor},${accentColor}aa)`,borderRadius:"3px",transition:"width 0.4s"}}/>
        </div>
      </div>
      {checklistData.map(phase=>{
        const phaseChecked = phase.items.filter(item=>checked[item.id]).length;
        return (
          <div key={phase.phase} style={{marginBottom:"22px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
              <div style={{fontSize:"11px",fontWeight:"bold",color:phase.color,letterSpacing:"2px",textTransform:"uppercase"}}>{phase.phase}</div>
              <div style={{fontSize:"10px",color:"#506050"}}>{phaseChecked}/{phase.items.length}</div>
              <div style={{flex:1,height:"1px",background:`${phase.color}33`}}/>
            </div>
            <div style={{display:"grid",gap:"6px"}}>
              {phase.items.map(item=>(
                <div key={item.id} onClick={()=>toggle(item.id)} style={{
                  display:"flex",alignItems:"flex-start",gap:"12px",padding:"11px 14px",
                  borderRadius:"7px",cursor:"pointer",userSelect:"none",
                  background: checked[item.id] ? `${phase.color}12` : "rgba(255,255,255,0.025)",
                  border:`1px solid ${checked[item.id] ? phase.color+"44" : "rgba(255,255,255,0.06)"}`,
                  transition:"all 0.15s",
                }}>
                  <div style={{
                    width:"18px",height:"18px",minWidth:"18px",borderRadius:"4px",marginTop:"1px",
                    border:`2px solid ${checked[item.id] ? phase.color : "rgba(255,255,255,0.2)"}`,
                    background: checked[item.id] ? phase.color : "transparent",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:"11px",color:"white",transition:"all 0.15s",
                  }}>{checked[item.id] ? "✓" : ""}</div>
                  <span style={{
                    fontSize:"13px",lineHeight:"1.5",
                    color: checked[item.id] ? "#607a70" : "#c0d0c8",
                    textDecoration: checked[item.id] ? "line-through" : "none",
                    transition:"all 0.15s",
                  }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}