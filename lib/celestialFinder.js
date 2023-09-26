import whereIsTheSun from "./whereIsTheSun.js"
import whereIsTheMoon from "./whereIsTheMoon.js"

class CelestialFinder {
  #date
  #hours

  constructor(date, hours) {
    this.#date = date
    this.#hours = hours
  }

  theSun() {
    let sunPosition = new whereIsTheSun(this.#date, this.#hours)
    console.log(sunPosition.whereIsTheSun())
    console.log(sunPosition.calculateTimeSinceEpoch())
  }

  theMoon() {
    let moonPosition = new whereIsTheMoon(this.#date, this.#hours)
    console.log(moonPosition.whereIsTheMoon())
    console.log(moonPosition.calculateTimeSinceEpoch())
  }

}

export default CelestialFinder
