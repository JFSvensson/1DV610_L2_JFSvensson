import moonOrbitalElements from '../data/OrbitalElements/moon.json' assert { type: 'json' }
import { timeSince2000 } from './timeSince2000.js'

class whereIsTheMoon {
  #date
  #hours

  constructor(date, hours) {
    this.#date = date
    this.#hours = hours
  }

  whereIsTheMoon(date, hours) {
    let time = timeSince2000(date, hours)
  }

}