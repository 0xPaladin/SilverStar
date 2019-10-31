const FACTIONS = [
  {id:0, name:"Neutral"},
  {id:1, name:"Player", color:"royalblue"},
  {id:2, name:"Xiphir Empire", color: "darkred"},
  {id:3, name:"Star Hive", color:"limegreen"},
]

const factionManager = (app) => {
  let actions = [0,0,0]

  app.factions = {
    get all () {
      return FACTIONS.map(f => this.byId(f.id))
    },
    byId(id) {
      let F = Object.assign({},FACTIONS.find(f => f.id==id))
      F.stats = this.stats(id)
      return F
    },
    sectorsByOwner (i) {
      return app.Galaxy.sectors.filter(s => s._owner == i)
    },
    stats(i) {
      let vals = [0,0,0]
      this.sectorsByOwner(i).forEach(s => {
        //acount for sector bonus 
        s.bonus.forEach((v,j) => vals[j] += v)
      })

      return {
        v : vals,
        b : vals.map(v => v > 0 ? Math.floor((v-1)/5) : 0)
      }
    },
    availableAssets (i) {
      let D = app.data
      //asset 1-22 is everyone, 23 is Player/Xiphir
      let assets = D.siteAssets.reduce((all,a) => {
          if(a.id <= (i==3 ? 22 : 23)) all.push({
            d: ["a",a.id,...a.cost],
            text : "Asset - "+a.name
          })
          return all
        },[])
      //Units 1-8, Mecha 9-12, Mechan 13-16, Fort 17-19
      let uids = {
        1 : d3.range(12).map(i=>i+1),
        2 : d3.range(8).map(i=>i+1).concat(d3.range(5).map(i=>i+26)), //Empire 26-30
        3 : d3.range(5).map(i=>i+21), //Hive 21-25
      }
      //reduce based on above 
      let units = D.units.reduce((all,u) => {
        if(uids[i].includes(u.id)) all.push({
          d: ["u",u.id,...u.cost],
          text : "Unit - "+u.name
        })
        return all
      },[])
      //add to assets 
      assets.push(...units)
      //support 1-17 all
      let sids = {
        1 : [],
        2 : [],
        3 : [18]
      }
      let support = D.supportUnits.reduce((all,u) => {
        if(u.id <= 17 || sids[i].includes(u.id)) all.push({
          d: ["s",u.id,...u.cost],
          text : "Support - "+u.name
        })
        return all
      },[])
      //add to assets 
      assets.push(...support)

      return assets
    }
  }
}

export {factionManager}