
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
      bid : 0, //base id
      base : [-1,0],
      sector : null,
      toBuild : null,
      bhp : 0 , //base hp 
      R : [0,false],
      aid : -1,
      toMove : [-1,0]
    },
    mounted() {
      app.Galaxy.reDraw()
      this.now = Date.now() / 1000
      setInterval(()=>this.now = Date.now() / 1000, 500)
    },
    computed: {
      factions () { return app.factions.all },
      stats () { return this.factions[this.fid].stats },
      asset () { return this.aid>-1 ? this.sector.assets[this.aid] : null }
    },
    methods: {
      //expand base 
      expand(i,j){
        if(j == 0) {this.base = this.sector.bases[this.bid].slice() }
        else {
          let B = this.sector._bases
          let base = B.has(this.bid) ? B.get(this.bid) : B.set(this.bid,[0,0]).get(this.bid)
          base[i] += j         
          this.base = this.sector.bases[this.bid].slice()
        }
      },
      build() {
        let fid = this.bid 
        let tb = this.toBuild
        //build it 
        let a = this.sector.addAsset(fid,tb)
        if(tb == 0){
          a.hp = a.mhp = Number(this.bhp)
        }
        this.toBuild = null
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
        //else if(act == "Solve Trouble")this.solveTrouble(i)
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
