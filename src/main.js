//chance
import "../lib/chance.min.js"
//localforage 
import "../lib/localforage.1.7.1.min.js";
//Save db for Indexed DB - localforage
const DB = localforage.createInstance({
  name: "SilverDB",
  storeName: "SilverStarRPGDB"
})
import {init} from "./galaxy.js"
import {factionManager} from "./factions.js"
//UI 
import {UI} from "./UI.js"

//generic application 
const app = {
  DB,
  data : {},
  UI: {},
  games : {},
  save () {
    DB.setItem('games',this.games)
    this.Galaxy.save()
  },
  load() {
    this.Galaxy.load()
    startTick()
  },
  reset () {
    let id = this.games.current
    let i = this.games.all.indexOf(id)
    this.games.all.splice(i,1)
    this.games.current = null 
    DB.setItem('games',this.games)
    DB.removeItem(id+".sectors").then(()=>{
      window.location = ""
    })
  }
}
init(app)
factionManager(app)
UI(app)

//tick 
const startTick = () => {
  setInterval(()=>app.save(), 5000)
}

//games 
DB.getItem('games').then(val=> {
  //create
  if(!val) {
    let id = chance.hash()
    app.games.current = id 
    app.games.all = [id]
    startTick()
  }
  //load the game 
  else {
    app.games = val 
    if(!app.games.current) {
      //no current game - try to load 
      if(app.games.all.length>0) {
        app.games.current = app.games.all[0]
      }
      else {
        let id = chance.hash()
        app.games.current = id 
        app.games.all = [id]
      }
    }
    app.load()
  }
})

