/* 
UI 
*/
const UI = (app)=>{
  //creates the VUE js instance
  app.UI.main = new Vue({
    el: '#ui-main',
    data: {
      now: 0,
      fid: 1,
      bid: 0,
      //base id
      base: [-1, 0],
      sector: null,
      toBuild: null,
      //base hp 
      bhp: 0,
      // roll result
      R: ['', false],
      aid: -1,
      toMove: [-1, 0],
      toAttack : [-1,0],
    },
    mounted() {
      app.Galaxy.reDraw()
      this.now = Date.now() / 1000
      setInterval(()=>this.now = Date.now() / 1000, 500)
    },
    computed: {
      factions() {
        return app.factions.all
      },
      stats() {
        return this.factions[this.fid].stats
      },
      asset() {
        return this.aid > -1 ? this.sector.assets[this.aid] : null
      }
    },
    methods: {
      //expand base 
      expand(i, j) {
        if (j == 0) {
          this.base = this.sector.bases[this.bid].slice()
        } else {
          let B = this.sector._bases
          let base = B.has(this.bid) ? B.get(this.bid) : B.set(this.bid, [0, 0]).get(this.bid)
          base[i] += j
          this.base = this.sector.bases[this.bid].slice()
        }
      },
      build() {
        let fid = this.bid
        let tb = this.toBuild
        //build it 
        let a = this.sector.addAsset(fid, tb)
        if (tb == 0) {
          a.hp = a.mhp = Number(this.bhp)
        }
        this.toBuild = null
        app.Galaxy.drawUnits()
      },
      setOwner(id) {
        this.sector.owner = id
        app.Galaxy.drawSectors()
      },
      action(i, act) {
        if (act == "Move") {
          this.toMove = this.toMove[0] == i ? [-1, 0] : [i, 0]
          app.Galaxy.drawMoveText(this.sector.neighbors)
        }
        else if(act == "Attack") {
            this.toAttack = this.toAttack[0] == i ? [-1, 0] : [i, 0]
        }
      },
      attack() {
          let A = this.asset
          let atk = A.data.atk
          let stats = atk.slice(0,2).map(v => ["C","F","W"].indexOf(v))
          //target 
          let T = this.sector.assets[this.toAttack[1]]
          //stat vals 
          let sA = A.F.stats[stats[0]]
          let sT = T.F.stats[stats[1]]
          //difference - difficulty
          let d = sT>sA ? sT-sA : 0
          let R = chance.d20()+d
          //check result 
          let res = R < (9+sA)
          let text = res ? "Success!" : "Fail!"
          text += " (" + R + ")"
          //damage 
          if(res){
              let d = atk[2].split("+")
              let dmg = chance.rpg(d[0],{sum:true}) + (d[1]? Number(d[1]) : 0)
              text += ", "+dmg+" dmg"
              //reduce target
              T.hp = T.hp-dmg
          }
          //notify
          this.R = [text, res]
      },
      //roll save die , compare to trouble value
      overcome(d) {
        let T = this.sector.trouble
        let R = chance.rpg(d)[0]
        let res = R > T.lv
        let text = res ? "Success!" : "Fail!"
        text += " (" + R + ")"
        this.R = [text, res]
        //do the work 
        if (res) {
          T.t[1]--
          //last one 
          if (T.lv <= 0)
            this.sector._trouble = null
        }
        return res
      },
      colonyOvercome() {
        this.overcome(this.sector.colony.save)
      },
      assetOvercome(d) {
        if(!this.overcome(d)) {
            //increase disruption
            this.asset.raw.d++
        }
      },
      move() {
        this.sector.moveAsset(...this.toMove)
        this.toMove = [-1, 0]
        d3.select("g.move-text").html("")
        app.Galaxy.drawUnits()
      },
      //lair check if unit is produced 
      lairCheck() {
        let S = this.sector
        let L = S.lair
        let R = chance.d6()
        if (R >= L.roll) {
          let a = this.sector.addAsset(0, L.unit)
          app.Galaxy.drawUnits()
        }
      },
      reDrawUnits() {
        app.Galaxy.drawUnits()
      },
      reset() {
        app.reset()
      }
    }
  })

}

export {UI}
