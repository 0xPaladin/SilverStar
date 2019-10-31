
/* 
UI 
*/
const UI = (app)=> {
  //creates the VUE js instance
  app.UI.main = new Vue({
    el: '#ui-main',
    data: {
      now : 0,
      id : null,
      loadId : null,
      sector : null,
      toBuild : null,
      R : [0,0]
    },
    mounted() {
      app.Galaxy.reDraw()
      this.now = Date.now() / 1000
      setInterval(()=>this.now = Date.now() / 1000, 500)
    },
    computed: {
      factions () { return app.factions.all },
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
        this.R = [v,R]
        //check if success
        if(R>=v) {
          tb[j] = "c" 
          //last one 
          if(j==4) this.sector.addAsset(i)
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
        app.Galaxy.reDraw()
      },
      reset () {}
    }
  })

}

export {UI}
