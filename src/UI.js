
/* 
UI 
*/
const UI = (app)=> {
  //creates the VUE js instance
  app.UI.main = new Vue({
    el: '#ui-main',
    data: {
      now : 0,
      fid : 1,
      sector : null,
      toBuild : null,
      R : [0,false],
      toMove : [-1,0]
    },
    mounted() {
      app.Galaxy.reDraw()
      this.now = Date.now() / 1000
      setInterval(()=>this.now = Date.now() / 1000, 500)
    },
    computed: {
      factions () { return app.factions.all },
      stats () { return app.factions.stats(this.fid) },
      allBuild () {
        return app.factions.availableAssets(this.sector._owner)
      }
    },
    methods: {
      workRoll(i,j) {
        let F = this.sector.owner
        let tb = this.sector._inWork[i]
        //do the work 
        let v = 12+tb[j]
        let R = chance.d20()+F.stats.b[j-2]
        this.R = [R,R>=v]
        //check if success
        if(R>=v) {
          tb[j] = "c" 
          //last one 
          if(j==4) {
            this.sector.addAsset(i)
            app.Galaxy.drawUnits()
          }
        }
        //reduce if fail
        else tb[j]--
      },
      build() {
        let w = this.sector._inWork
        let i = w.length
        //push to work 
        w.push(this.toBuild.slice())
        //do the work 
        this.workRoll(i,2)
      },
      work(i) {
        let tb = this.sector._inWork[i]
        let j = tb[2] != "c" ? 2 : tb[3] != "c" ? 3 : 4 
        //do the work 
        this.workRoll(i,j)
      },
      setOwner(id) {
        this.sector.owner = id
        app.Galaxy.drawSectors()
      },
      action(i,act) {
        if(act == "Move"){
          this.toMove = [i,0]
          app.Galaxy.drawMoveText(this.sector.neighbors)
        }
        else if(act == "Solve Trouble")this.solveTrouble(i)
      },
      solveTrouble (i) {
        let u = this.sector.assets[i]
        let T = this.sector.trouble
        let stat = app.data.saveStat[T.save]
        //difficulty is multiplied if the unit type is not right
        let diff = T.lv * (T.save == u.data.solve[1] ? 1 : stat == u.data.solve[0] ? 2 : 3)
        //bonus based upon faction stats and unit 
        let b = u.F.stats.b[stat] + u.data.solve[2]
        //do the work 
        let v = 16+diff
        let R = chance.d20()+b
        this.R = [R,R>=v]
        //check if success
        if(R>=v) {
          T.lv -= chance.d4()
          //last one 
          if(T.lv <= 0) this.sector._trouble = null
        }
        //add disruption
        else u.a.d++
      },
      move() {
        this.sector.moveAsset(...this.toMove)
        this.toMove = [-1,0]
        d3.select("g.move-text").html("")
        app.Galaxy.drawUnits()
      },
      //lair check if unit is produced 
      lairCheck() {
        let S = this.sector
        let L = S.lair
        let R = chance.d6()
        if(R>=L.roll) {
          let foe = S.setAsset(["u",L.unit])
          //neutral owner 
          foe.o = 0
          app.Galaxy.drawUnits()
        }
      },
      reDrawUnits() {  app.Galaxy.drawUnits() },
      reset () {
        app.reset()
      }
    }
  })

}

export {UI}
