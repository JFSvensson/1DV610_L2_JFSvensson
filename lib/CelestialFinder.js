import WhereIsTheSun from './WhereIsTheSun.js'
import WhereIsTheMoon from './WhereIsTheMoon.js'
import TimeSince2000 from './TimeSince2000.js'

class CelestialFinder {
  #date
  #hours
  #solarPosition
  #lunarPosition

  constructor(date, hours) {
    this.#date = date
    this.#hours = hours
    this.#solarPosition = new WhereIsTheSun(this.#date, this.#hours)
    this.#lunarPosition = new WhereIsTheMoon(this.#date, this.#hours)
  }

  positionOfTheSun() {
    return this.#solarPosition.whereIsTheSun()
  }

  distanceToTheSun() {
    return this.#solarPosition.getDistance()
  }

  periapsisOfTheSun() {
    return this.#solarPosition.getPeriapsis()
  }

  positionOfTheMoon() {
    return this.#lunarPosition.whereIsTheMoon()
  }

  timeSince2000() {
    let timeSince2000 = new TimeSince2000(this.#date, this.#hours)
    return timeSince2000.getTimeSince2000()
  }

}

export default CelestialFinder
