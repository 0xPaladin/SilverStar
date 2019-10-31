//asset data 
import {data as DATA} from "./assets.js"

const circlePack = ()=>{
  let rng = new Chance("SilverStarRPG")
  //get data 
  let h = d3.hierarchy({
    //once for each plane 
    "children": d3.range(100).map(_=>{
      return {
        A: rng.pickone([1, 2, 3]) + (rng.d10() - 1) / 10
      }
    }
    )
  })
  h.sum(d=>d.A)

  let pack = d3.pack().size([800, 800])(h)
  //first is always full circle 
  return h.descendants().slice(1)
}

// Spiral Galaxy Simulation
const galaxyGen = () => {
  let rng = new Chance("SilverStarRPG")
  const PI = Math.PI
  const nS = 10000 // only ...
  const Rmax = 425 // galaxy radius
  //initial galaxy rotation 
  const ia = rng.random()*2*PI
  // stars follow elliptic orbits around the center
  let eratio = .875 // ellipse ratio
  let etwist = 8.0 / Rmax // twisting factor (orbit axes depend on radius)
  //each star 
  let stars = []

  // begin in the center
  const cx = 400
  const cy = 400
  // itit stars
  let a, r, x, y, b, s, c;
  for (let i = 0; i < nS; i++) {
    a = ia + rng.random() * 2 * PI 
    r = 1 + rng.random() * Rmax
    x = r * Math.sin(a)
    y = r * eratio * Math.cos(a)
    b = r * etwist
    s = Math.sin(b)
    c = Math.cos(b)
    stars[i] = [cx + s * x + c * y, cy + c * x - s * y] // trigonometry
  }

  return stars
}

const COLONY = {
  origin : ["Ancestral Land","Ancient Industry","Defensible","Ethnocentrists",
  "Innovators","Outcasts","Rebels","Religious Community","Survivors","Trading Hub"],
  originBonus : ["W","W","M","S","W","S","M","S","M","W"],
  activity : ["Councils","Destined Conquerors","Educational Tradition","Expert Artisans",
  "Martial Tradition","Missionary Zeal","Mutual Defense","Production Center","Strong Society",
  "Vigorous Trade"],
  activityBonus : ["S","M","W","W","M","S","M","W","S","W"]
} 

const RUIN = {
  nature : ["Abandoned Colony","Ancient Colony","Broken Temple","Abandoned Fortress",
  "Mechan Forge World","Empty Tower","Failed Colony","Forsaken Outpost","Lost Mine",
  "Plundered Colony","Cosmic Ruins","Shattered School"],
  natureBonus : ["W","W","S","M","W","M","W","M","W","W","W","W"],
  trait : ["Ancient Armory","Buried Treasure","Commanding Location","Forgotten Cosmic Methods",
  "Beneficient Cosmic AI","Great Art","Lost Techniques","Pre-Hive Relics","Rich Resources",
  "Scattered Heirs","Seat of Legitimacy","Willing Recruits"],
  traitBonus : ["M","W","M","W","M","S","W","S","W","S","S","M"]
}  

const RESOURCE = {
  nature :["Garden World","Rock World","Asteroid Belt","Gas Giant","Medicinal Chemicals","Old Industry",
"Cosmic"],
  p : [3,3,3,3,1,1,0.1]
}

const init = (app) => {
  Object.assign(app.data,DATA)

  class Sector {
    constructor (i,rng,what) {
      this.i = i
      this._owner = 0
      this._inWork = []
      this._assets = []

      let data = null
      if(what == "colony") {
        let a = d3.range(COLONY.origin.length).map(i=>i)
        let b = d3.range(COLONY.activity.length).map(i=>i)
        data = {type:[rng.pickone(a),rng.pickone(b)],r:1}
      }
      else if(what == "ruin") {
        let a = d3.range(RUIN.nature.length).map(i=>i)
        let b = d3.range(RUIN.trait.length).map(i=>i)
        data = {type:[rng.pickone(a),rng.pickone(b)]}
      }
      else if(what == "resource") {
        let ids = d3.range(RESOURCE.nature.length).map(i=>i)
        data = {type:rng.weighted(ids,RESOURCE.p)}
      }
      else if (what == "lair") {
        let lair = rng.pickone(DATA.lairs)
        data = {type:lair.id}
      }

      if(what) this["_"+what] = data
      this.genTrouble()
    }
    get poiSVGClass () {
      if(this.colony) return "colony"
      else if(this.lair) return "lair"
      else if(this.ruin) return "ruin"
      else if(this.resource) return "resource"
      return ""
    }
    get svgClass () {
      if(this._owner == 1) return "pc"
      else if(this._owner == 2) return "empire"
      else if(this._owner == 3) return "hive"
      return ""
    }
    set owner (id) { this._owner = id }
    get owner () {
      return app.factions.byId(this._owner)
    }
    get mayBuild () {
      return (this._owner != 0 && this.colony) || this._assets.length > 0 ? true : false
    }
    get bonus () {
      let vals = [0,0,0]
      let basis = []
      if (this.colony) {
        //colony provides wealth and social 
        basis.push(...["W","S"],...this.colony.bonus)
        if(this.colony.r == 2) basis.push(...["W","S"])
      }
      if(this.ruin) basis.push(...this.ruin.bonus)
      if(this.resource) basis.push("W")
      //now count the basis 
      basis.forEach(w => vals[["M","W","S"].indexOf(w)] += 2)
      return vals
    }
    get colony () {
      if(!this._colony) return null
      let t = this._colony.type
      return {
        r : this._colony.r,
        type : t,
        text : COLONY.origin[t[0]]+", "+COLONY.activity[t[1]],
        bonus : [COLONY.originBonus[t[0]],COLONY.activityBonus[t[1]]]
      }
    }
    get inWork () {
      let iw = this._inWork.map(w => {
        if(w[0] == "u") return DATA.units.find(u=>u.id==w[1]).name
        else if(w[0] == "a") return DATA.siteAssets.find(u=>u.id==w[1]).name
        else if(w[0] == "s") return DATA.supportUnits.find(u=>u.id==w[1]).name
        return ""
      })
      return iw
    }
    //local assets
    get assets () {
      let a = this._assets.map(w => {
        if(w[1] == "u") return DATA.units.find(u=>u.id==w[2]).name
        else if(w[1] == "a") return DATA.siteAssets.find(u=>u.id==w[2]).name
        else if(w[1] == "s") return DATA.supportUnits.find(u=>u.id==w[2]).name
        return ""
      })
      return a
    }
    //moves from in work to asset 
    addAsset (i) {
      let iw = this._inWork[i]
      //asset - first index is the owner, -1 for general assets
      let a = [-1].concat(iw.slice(0,2))
      //if it is a unit set the hp 
      if(a[1]=="u"){
        let U = app.data.units.find(u=>u.id==a[0])
        a.push(U.HD*8)
      }
      //add the faction 
      if(a[1]!="a") a[0] == this._owner
      //add to assets 
      this._assets.push(a)
      //remove finished
      this._inWork.splice(i,1)
    }
    get lair () {
      //let unit = l ? DATA.units.find(u=>u.id == l.unit) : null
      return this._lair ? DATA.lairs.find(l=> l.id == this._lair.type) : null 
    }
    get resource () {
      if(!this._resource) return null
      let id = this._resource.type
      return {
        id,
        text : RESOURCE.nature[id]
      }
    }
    get ruin () {
      if(!this._ruin) return null
      let t = this._ruin.type
      return {
        type : t,
        text : RUIN.nature[t[0]]+", "+RUIN.trait[t[1]],
        bonus : [RUIN.natureBonus[t[0]],RUIN.traitBonus[t[1]]]
      }
    }
    get trouble () {
      if(!this._trouble) return null
      let t = this._trouble
      return {
        text : t[0],
        save : DATA.troubleSaves[t[0]],
        lv : t[1]
      }
    }
    genTrouble = (rng = chance) => {
      //check for the basis to generate trouble 
      let basis = this._colony ? ["colony"] : []
      if(this._ruin) basis.push("ruin")
      if(this._resource) basis.push("resource")
      if(basis.length == 0) return

      let trouble = {
        "colony" : [`Bad Reputation`,`Barren Surroundings`,`Class Hatred`,`Contaminated Land`,`Corrupt Leadership`,`Crushed Spirits`,`Demagogue`,`Destructive Customs`,`Disunity`,`Ethnic Feuding`,`Exceptional Poverty`,`Exiled Lord`,`Mercenary Populace`,`Monsters`,`Natrual Destruction`,`Outsider Cult/Sinister Cult`,`Pervasive Hunger`,`Raiders`,`Recurrent Sickness`,`Riotous Thugs`,`Secret Society`,`Toxic Process`,`Xenophobia`],
        "ruin" : [`Barren Surroundings`,`Conquering Heirs`,`Contaminated Land`,`Dark Wizards`,`Disputed Possession`,`Exiled Lord`,`Harsh Conditions`,`Hazardous Resource`,`Inaccessible`,`Infested`,`Monsters`,`Murderous Heirs`,`Outsider Cult/Sinister Cult`,`Raiders`,`Ancient Cosmic Defenses`,`Sealed Evil`,`Severe Damage`,`Taboo Land`],
        "resource" : [`Bad Reputation`,`Barren Surroundings`,`Conquering Heirs`,`Contaminated Land`,`Covetous Polity`,`Disputed Possession`,`Failed Settlement`,`Harsh Conditions`,`Hazardous Resource`,`Inaccessible`,`Infested`,`Monsters`,`Natrual Destruction`,`No Workers`,`Raiders`,`Recalcitrant Locals`,`Recurrent Sickness`,`Ancient Cosmic Defenses`,`Sealed Evil`,`Taboo Land`,`Toxic Process`,`Undeveloped`,`Wasted Production`],
      }
      let base = rng.pickone(basis)
      let what = rng.pickone(trouble[base]) 
      let lv = rng.d4()+rng.d4()

      this._trouble = [what,lv]
    }
  } 

  const generate = () => {
    const allIds = d3.range(100).map(i=> i)
    //pack everything
    let pack = circlePack()
    //delaunay
    const points = pack.map(p => [p.x,p.y])
    const delaunay = d3.Delaunay.from(points)
    const voronoi = delaunay.voronoi([0, 0, 800, 800])
    const polys = [...voronoi.cellPolygons()]
    //stars
    const stars = galaxyGen()
    //rng setup 
    let rng = new Chance("abc")
    //15 random polys for flux
    let flux = rng.shuffle(allIds).slice(0,15)
    //starting positions for the hive, empire and player 
    let start = rng.shuffle([[200,200],[600,200],[600,600],[200,600]]).slice(0,3)
    //4 polys for Hive 
    let hive = [delaunay.find(...start[0])]
    hive.push(...[...delaunay.neighbors(hive[0])].slice(0,3))
    //3 polys for the "Empire"
    let empire = [delaunay.find(...start[1])]
    empire.push(...[...delaunay.neighbors(empire[0])].slice(0,2))
    //one for the player 
    let player = [delaunay.find(...start[2])]

    //neutral demographics 
    //2 cities, 8 towns, 10 ruins, 8 resources, 12 lairs
    let available = new Set(allIds)
    let used = hive.concat(empire,player)
    used.forEach(id => available.delete(id))
    let sites = rng.shuffle([...available.values()]).slice(0,40)
    let what = ["c2","c2"].concat(d3.range(8).map(_=>"c1"),d3.range(10).map(_=>"ruin"))
    what = what.concat(d3.range(8).map(_=>"resource"),d3.range(12).map(_=>"lair"))
    what = rng.shuffle(what)
    //create sectors 
    let sectors = d3.range(100).map(i=> {
      let s = null
      let ti = sites.indexOf(i)
      let tag = ti > -1 ? what[ti] : ""
      //set up object
      if(tag == "c2") {
        s = new Sector(i,rng,"colony")
        s._colony.r = 2
      }
      else if(tag == "c1") {
        s = new Sector(i,rng,"colony")
      }
      else if(tag.length>0) s = new Sector(i,rng,tag)
      else s = new Sector(i)
      //set path 
      s.svgPath = voronoi.renderCell(i)

      return s 
    })
    //add hive sites
    let hiveSites = ["colony","colony","colony","resource"]
    hiveSites.forEach((w,i)=> {
      let id = hive[i]
      let s = sectors[id] = new Sector(id,rng,w)
      s.owner = 3
      s.svgPath = voronoi.renderCell(id)
    })
    //first is r 2 colony
    sectors[hive[0]]._colony.r = 2
    //add empire sites 
    let empireSites = ["colony","colony","resource"]
    empireSites.forEach((w,i)=> {
      let id = empire[i]
      let s = sectors[id] = new Sector(id,rng,w)
      s.owner = 2
      s.svgPath = voronoi.renderCell(id)
    })
    //first is r 2 colony
    sectors[empire[0]]._colony.r = 2
    //add player site
    let pid = player[0]
    sectors[pid] = new Sector(pid,rng,"colony")
    sectors[pid].owner = 1
    sectors[pid].svgPath = voronoi.renderCell(pid)

    return {points,voronoi,polys,stars,flux,sectors}
  }

  app.Galaxy = generate()
  app.Galaxy.reDraw = function() {
    const fC = 2 * Math.PI
    let iW = window.innerWidth
    let iH = window.innerHeight
    let D = iH < iW ? iH : iW
    //set size
    let svg = d3.select("#map svg").attr("height", iH).attr("width", iW)
    svg.html("")
    //add defs
    svg.append("defs").append("clipPath").attr("id","clip-circle")
      .append("circle").attr("cx",400).attr("cy",400).attr("r",400)
    //galaxy circle
    svg.append("circle").attr("id", "galaxy")
      .attr("cx",400).attr("cy",400).attr("r",400)
    //all sectors 
    let gS = svg.append("g").attr("class", "sectors").attr("clip-path","url(#clip-circle)")
    let gF = svg.append("g").attr("class", "flux").attr("clip-path","url(#clip-circle)")

    //now display circle pack 
    gS.selectAll("path").data(this.sectors).enter()
      .append("path").attr("d", d=> d.svgPath)
      .attr("class",d => d.svgClass)
      .on("click", (d,i)=>{//update UI 
        console.log(d)
        app.UI.main.sector = d
      })
    //now display circle pack 
    gF.selectAll("path").data(this.flux).enter()
      .append("path").attr("d", d=> this.voronoi.renderCell(d))
      .attr("class","flux")

    //show stars 
    let gStars = svg.append("g").attr("class", "stars").attr("clip-path","url(#clip-circle)")
    gStars.selectAll("circle").data(this.stars).enter()
      .append("circle").attr("cx", d=> d[0]).attr("cy", d=> d[1]).attr("r", 1) 

    //show poi  
    let gC = svg.append("g").attr("class", "poi")
    gC.selectAll("circle").data(this.sectors).enter().append("circle")
      .attr("cx", d=> this.points[d.i][0])
      .attr("cy", d=> this.points[d.i][1])
      .attr("r", d=> {
        return d.colony ? d.colony.r * 3 : d.poiSVGClass.length>0 ? 3 : 0 
      }) 
      .attr("class",d=> d.poiSVGClass)

    resize()
  }

}

const resize = ()=>{
  //set svg to window 
  let iW = window.innerWidth
  let iH = window.innerHeight
  //set size
  let svg = d3.select("#map svg").attr("height", iH).attr("width", iW)
  //get bbox 
  let gS = d3.select("g.sectors").node().getBBox()
  let w = gS.width < 800 ? 800 : gS.width
  let h = gS.height < 600 ? 600 : gS.height
  let vB = [gS.x - 25, gS.y - 25, w + 25, h + 25]
  //viewBox="0 0 100 100"
  d3.select("svg").attr("viewBox", vB.join(" "))
}

window.addEventListener("resize", resize )

export {init}