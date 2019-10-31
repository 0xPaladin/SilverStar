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
  save () {
  }
}
init(app)
factionManager(app)
UI(app)

setInterval(()=>app.save(), 5000)