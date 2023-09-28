import WhereIsTheSun from "./WhereIsTheSun.js"
import WhereIsTheMoon from "./WhereIsTheMoon.js"

class CelestialFinder {
  #date
  #hours

  constructor(date, hours) {
    this.#date = date
    this.#hours = hours
  }

  theSun() {
    let sunPosition = new WhereIsTheSun(this.#date, this.#hours)
    console.log(sunPosition.whereIsTheSun())
    console.log(sunPosition.calculateTimeSinceEpoch())
  }

  theMoon() {
    let moonPosition = new WhereIsTheMoon(this.#date, this.#hours)
    console.log(moonPosition.whereIsTheMoon())
  }

}

export default CelestialFinder
