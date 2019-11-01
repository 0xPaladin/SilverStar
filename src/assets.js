const SITEASSETS = [
{id:1,name:'University',cost:'-1,2,0',repl:-1,text:''},
{id:2,name:'DeFi Network',cost:'0,2,0',repl:-1,text:''},
{id:3,name:'MegaCorp',cost:'0,2,-1',repl:-1,text:''},
{id:4,name:'Museum',cost:'0,0,2',repl:-1,text:''},
{id:5,name:'Barracks',cost:'2,0,0',repl:-1,text:''},
{id:6,name:'War Academy',cost:'4,-1,-1',repl:-1,text:''},
{id:7,name:'NGO Incubator',cost:'0,-1,2',repl:-1,text:''},
{id:8,name:'Militia Muster',cost:'1,0,0',repl:-1,text:'Two Militia units leap to the location’s defense when needed.'},
{id:9,name:'Organized Militia',cost:'2,-1,0',repl:8,text:'Four Militia units now answer the call of need.'},
{id:10,name:'Veteran Guard',cost:'4,-2,0',repl:9,text:'The defenders are now four Heavy Infantry units.'},
{id:11,name:'Defense Infrastructure',cost:'2,0,0',repl:-1,text:'The location can build Barrier/Tower fortification units.'},
{id:12,name:'Shipyards',cost:'4,-1,-1',repl:-1,text:'The location can build Ship/Citidel/Minefield units.'},
{id:13,name:'Community Aid',cost:'0,0,0',repl:-1,text:'Converts the Wealth of the location to Social benefits.'},
{id:14,name:'Military Spending',cost:'0,0,0',repl:-1,text:'Converts the Wealth of the location to Military advantage.'},
{id:15,name:'United Efforts',cost:'0,0,0',repl:-1,text:'Converts the Social value of the location to Military or Wealth.'},
{id:16,name:'Processing Camp',cost:'0,2,0',repl:-1,text:'When built at a Resource, it turns Wealth into Military or Social.'},
{id:17,name:'Resource Extractor',cost:'0,2,0',repl:-1,text:'When built at a Resource, it improves efficiency.'},
{id:18,name:'Democratic Traditions',cost:'0,2,2',repl:-1,text:'Common voices guide the state, giving +3 to one roll per turn.'},
{id:19,name:'Merchantile',cost:'0,4,0',repl:-1,text:'The people love trade, and all Market asset benefits are doubled.'},
{id:20,name:'Public Welfare',cost:'0,0,4',repl:-1,text:'The people place a high emphasis on the wellfare of others, and all Public asset benefits are doubled.'},
{id:21,name:'Spartan Culture',cost:'4,0,0',repl:-1,text:'The people relish war, and all Barracks assets benefits are doubled.'},
{id:22,name:'Well-educated',cost:'0,2,2',repl:-1,text:'The people respect education, and all School asset benefits double.'},
{id:23,name:'Mechan Forge',cost:'0,4,0',repl:-1,text:''}
]

const UNITS = [
{id:1,name:'Militia',cost:'1,0,0',stats:'1,9,120,6',dmg:'1d6',extras:'Garrison',text:'The locals have been trained and outfitted to defend themselves. Usually traditional terestrial military units that may be supported by a handful of older mecha. They take their job seriously, but they muster only when needed, and cannot be moved out of sector.'},
{id:2,name:'Ranger',cost:'1,1,0',stats:'1,7,120,8',dmg:'1d6',extras:'Ranger,Skirmisher',text:'A mixed group of units trained to be mobile, strike fast, and then disappear.'},
{id:3,name:'Archer',cost:'1,1,0',stats:'1,7,120,8',dmg:'1d4',extras:'Reach',text:''},
{id:4,name:'Light Infantry',cost:'1,1,0',stats:'1,7,120,7',dmg:'1d6',extras:'AntiCharge',text:''},
{id:5,name:'Heavy Infantry',cost:'2,2,0',stats:'2,4,90,9',dmg:'1d8',extras:'',text:''},
{id:6,name:'Light Cavalry',cost:'2,2,0',stats:'2,6,240,8',dmg:'1d8',extras:'Chase',text:'Fast, agile, and ruthlessly effective in chasing down their opponents, light cavalry excel at close strikes.'},
{id:7,name:'Assault Cavalry',cost:'2,2,0',stats:'2,6,240,8',dmg:'1d6',extras:'Reach,Chase',text:''},
{id:8,name:'Heavy Cavalry',cost:'2,3,0',stats:'2,4,120,9',dmg:'1d8',extras:'Charger,Chase',text:'Using better armored equipment makes them harder to hit, but they sacrifice theri speed.'},
{id:9,name:'Infantry Mecha',cost:'3,2,1',stats:'3,4,60,9',dmg:'1d10',extras:'Scarce,Skilled',text:''},
{id:10,name:'Strike Mecha',cost:'3,3,1',stats:'3,3,240,9',dmg:'1d10',extras:'Charger,Scarce,Skilled',text:''},
{id:11,name:'Armored Mecha',cost:'3,4,1',stats:'3,2,120,10',dmg:'1d8',extras:'Reach,Scarce,Skilled',text:''},
{id:12,name:'Longbow Mecha',cost:'3,3,1',stats:'3,4,90,9',dmg:'1d8',extras:'Reach,Scarce,Skilled',text:''},
{id:13,name:'Mechan Warrior',cost:'2,1,1',stats:'1,4,90,9',dmg:'1d8',extras:'',text:''},
{id:14,name:'Mechan Longbow',cost:'2,1,1',stats:'1,4,90,9',dmg:'1d6',extras:'Reach',text:''},
{id:15,name:'Mechan Sapper',cost:'2,1,2',stats:'1,3,60,9',dmg:'1d8',extras:'Wallcrusher',text:''},
{id:16,name:'Mechan Hero',cost:'3,3,2',stats:'3,2,60,10',dmg:'1d10',extras:'Hardened,Scarce,Skilled',text:''},
{id:17,name:'Barrier',cost:'0,2,0',stats:'2,null,null,12',dmg:'1d4',extras:'Fortification,Reach',text:''},
{id:18,name:'Tower',cost:'1,4,0',stats:'4,null,null,12',dmg:'1d8',extras:'Fortification,Reach',text:''},
{id:19,name:'Citadel',cost:'3,6,0',stats:'8,null,null,12',dmg:'3d6',extras:'Fortification,Reach',text:''},
{id:20,name:'Bandit',cost:'0,1,1',stats:'1,7,120,8',dmg:'1d6',extras:'Reach',text:''},
{id:21,name:'Hiveling',cost:'1,0,0',stats:'1/2,7,60,12',dmg:'1d4',extras:'',text:''},
{id:22,name:'Bombardier',cost:'2,1,0',stats:'2,6,120,9',dmg:'1d6',extras:'Reach',text:''},
{id:23,name:'Chameleon',cost:'2,2,0',stats:'2,6,120,8',dmg:'1d8',extras:'Stealth',text:''},
{id:24,name:'Kaiju',cost:'4,4,0',stats:'4,6,150,9',dmg:'2d6',extras:'',text:''},
{id:25,name:'Daikaiju',cost:'9,5,2',stats:'8,4,120,10',dmg:'2d8',extras:'Wallcrusher,Hardened,Diehard',text:''},
{id:26,name:'Seax',cost:'1,0,0',stats:'1,6,90,7',dmg:'1d6',extras:'Stealth',text:''},
{id:27,name:'Spatha',cost:'1,1,0',stats:'1,6,120,8',dmg:'1d8',extras:'',text:''},
{id:28,name:'Falchion',cost:'4,2,1',stats:'3,5,90,9',dmg:'2d4',extras:'Stealth',text:''},
{id:29,name:'Maul',cost:'1,2,4',stats:'4,5,90,10',dmg:'1d10',extras:'',text:''},
{id:30,name:'Sabre',cost:'3,1,0',stats:'2,6,240,9',dmg:'1d6',extras:'Charge,Chase,Reach',text:''},
{id:31,name:'Ebon Strider',cost:'2,1,0',stats:'2,4,120,12',dmg:'1d8',extras:'Diehard',text:''},
{id:32,name:'Night Swarm',cost:'1,1,0',stats:'2,8,90,12',dmg:'1d6',extras:'Diehard, Stupid',text:''},
]

const SUPPORTUNITS = [
{id:1,name:'Assassin',cost:'0,2,0',solve:'',extras:'Assassin'},
{id:2,name:'Bodyguard',cost:'1,1,0',solve:'',extras:'Protector'},
{id:3,name:'Police',cost:'1,1,0',solve:'Disorder,0',extras:''},
{id:4,name:'Guardian Shield',cost:'0,2,0',solve:'Disorder,0',extras:'Countermagic'},
{id:5,name:'Harriers',cost:'2,1,0',solve:'',extras:'Chase'},
{id:6,name:'Healer',cost:'1,1,0',solve:'',extras:'Healing'},
{id:7,name:'Inspector',cost:'0,0,2',solve:'Corruption,0',extras:''},
{id:8,name:'Inspector General',cost:'0,2,2',solve:'Corruption,2',extras:''},
{id:9,name:'Developer',cost:'0,2,0',solve:'Poverty,0',extras:''},
{id:10,name:'Philanthropist',cost:'0,3,1',solve:'Poverty,2',extras:''},
{id:11,name:'Social Worker',cost:'0,0,2',solve:'Despair,0',extras:''},
{id:12,name:'Empath',cost:'0,1,3',solve:'Despair,2',extras:''},
{id:13,name:'Teacher',cost:'0,2,0',solve:'Ignorance,0',extras:''},
{id:14,name:'Expert Teacher',cost:'0,2,2',solve:'Ignorance,2',extras:''},
{id:15,name:'Sapper Crew',cost:'2,0,0',solve:'',extras:'Wallcrusher'},
{id:16,name:'Scout Team',cost:'1,0,0',solve:'',extras:'Keen Senses'},
{id:17,name:'Veteran Sergeant',cost:'1,0,0',solve:'',extras:'Rally'},
{id:18,name:'Guardian Sword',cost:'1,2,1',solve:'Disorder,0',extras:'War Magic'},
{id:19,name:'Hive Node',cost:'0,0,1',solve:'',extras:'Berserk'},
{id:20,name:'Myr Nightlord',cost:'1,2,1',solve:'Ignorance,0',extras:'War Magic,Tamer'},
]

const LAIRS = [
{id:1,name:'Free Lord',roll:5,unit:5,guard:'3,Light Infantry,2,Archer,2,Barrier,1,Tower,1,Veteran Sergeant'},
{id:2,name:'Warlord',roll:5,unit:8,guard:'3,Light Cavalry,1,Assault Cavalry,1,Heavy Cavalry,1,Pike'},
{id:3,name:'Bandits',roll:4,unit:22,guard:'3,Bandit,1,Archer,1,Scout Team,1,Assassin'},
{id:4,name:'Mechan Warlord',roll:5,unit:15,guard:'5,Mechan Warrior,1,Veteran Sergeant'},
{id:5,name:'Hive Nest',roll:6,unit:26,guard:'2,Kaiju'},
{id:6,name:'Renegades',roll:5,unit:5,guard:'2,Light Infantry,1,Archer,1,Heavy Infantry,1,Pike'},
{id:7,name:'Renegade Imperial',roll:4,unit:29,guard:'5,Spatha,2,Barrier,1,Veteran Sergeant,1,War Mage'},
{id:8,name:'Bandit Stronghold',roll:5,unit:30,guard:'2,Bandit,2,Ranger,2,Assassin'},
{id:9,name:'Rogue Hive',roll:5,unit:23,guard:'5,Hiveling,1,Chameleon,1,Kaiju,1,Hive Node'},
{id:10,name:'Hostile Xenos',roll:5,unit:6,guard:'1,Maul,4,Light Infantry'},
{id:11,name:'Myr Blight',roll:6,unit:33,guard:'5,Light Infantry,2,Ranger,3,War Mage,1,Myr Nightlord'},
{id:12,name:'Ancient Evil',roll:6,unit:34,guard:'3,Ebon Strider,1,Night Swarm,1,Infantry Mecha,1,Myr Nightlord'},
]

let TROUBLESAVES = {
  "Bad Reputation": `Corruption`,
  "Barren Surroundings": `Poverty`,
  "Class Hatred": `Despair`,
  "Conquering Heirs": `Uprising`,
  "Contaminated Land": `Poverty`,
  "Corrupt Leadership": `Corruption`,
  "Covetous Polity": `Disorder`,
  "Crushed Spirits": `Despair`,
  "Dark Wizards": `Uprising`,
  "Demagogue": `Despair`,
  "Destructive Customs": `Ignorance`,
  "Disputed Possession": `Disorder`,
  "Disunity": `Despair`,
  "Ethnic Feuding": `Despair`,
  "Exceptional Poverty": `Poverty`,
  "Exiled Lord": `Uprising`,
  "Failed Settlement": `Poverty`,
  "Harsh Conditions": `Poverty`,
  "Hazardous Resource": `Ignorance`,
  "Inaccessible": `Poverty`,
  "Infested": `Uprising`,
  "Mercenary Populace": `Corruption`,
  "Monsters": `Disorder`,
  "Murderous Heirs": `Disorder`,
  "Natrual Poverty": `Poverty`,
  "No Workers": `Poverty`,
  "Outsider Cult/Sinister Cult": `Corruption`,
  "Pervasive Hunger": `Poverty`,
  "Raiders": `Uprising`,
  "Recalcitrant Locals": `Disorder`,
  "Recurrent Sickness": `Poverty`,
  "Ancient Cosmic Defenses": `Ignorance`,
  "Riotous Thugs": `Disorder`,
  "Sealed Evil": `Disorder`,
  "Secret Society": `Corruption`,
  "Severe Damage": `Poverty`,
  "Taboo Land": `Ignorance`,
  "Toxic Process": `Ignorance`,
  "Undeveloped": `Poverty`,
  "Wasted Production": `Ignorance`,
  "Xenophobia": `Disorder`,
}
const SAVESTAT = {
  "Disorder" : 0,
  "Uprising" : 0,
  "Poverty" : 1,
  "Ignorance" : 1,
  "Despair" : 2,
  "Corruption" : 2
}

let data = {
  siteAssets : SITEASSETS.map(a=> {
    a.cost = a.cost.split(",").map(Number)
    return a
  }),
  units : UNITS.map(u=> {
    //stats 
    let stats = u.stats.split(",")
    u.HD = Number(stats[0])
    u.AC = Number(stats[1])
    u.move = Number(stats[2])
    u.morale = Number(stats[3])
    u.cost = u.cost.split(",").map(Number)
    u.extras = u.extras.split(",")
    u.solve = [0,"Uprising",u.HD]
    return u 
  }),
  unitNames : UNITS.map(u=>u.name),
  supportUnits : SUPPORTUNITS.map(u=> {
    u.cost = u.cost.split(",").map(Number)
    u.extras = u.extras.split(",")
    
    if(u.solve.length>0) {
      u.solve = u.solve.split(",") 
      u.solve[1] = Number(u.solve[1])
      u.solve.unshift(SAVESTAT[u.solve[0]])
    }
    else delete u.solve

    return u
  }),
  supportNames : SUPPORTUNITS.map(u=>u.name),
  lairs : LAIRS,
  unitByName (name) {
    let ui = this.unitNames.indexOf(name)
    if(ui > -1) return UNITS[ui]
    ui = this.supportNames.indexOf(name)
    if(ui > -1) return SUPPORTUNITS[ui]
    return null
  },
  troubleSaves : TROUBLESAVES,
  saveStat : SAVESTAT
}

export {data}