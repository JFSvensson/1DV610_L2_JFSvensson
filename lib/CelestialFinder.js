import WhereIsTheSun from './WhereIsTheSun.js'
import WhereIsTheMoon from './WhereIsTheMoon.js'
import TimeSince2000 from './TimeSince2000.js'

class CelestialFinder {
  #date
  #hours

  constructor(date, hours) {
    this.#date = date
    this.#hours = hours
  }

  theSun() {
    let sunPosition = new WhereIsTheSun(this.#date, this.#hours)
    return sunPosition.whereIsTheSun()
  }

  theMoon() {
    let moonPosition = new WhereIsTheMoon(this.#date, this.#hours)
    return moonPosition.whereIsTheMoon()
  }

  timeSince2000() {
    let timeSince2000 = new TimeSince2000(this.#date, this.#hours)
    return timeSince2000.getTimeSince2000()
  }
}

export default CelestialFinder
