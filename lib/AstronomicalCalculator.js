class AstronomicalCalculator {
  #time
  #orbitalElements

  constructor(time, orbitalElements) {
    this.#time = time
    this.#orbitalElements = orbitalElements
  }

  calculateMeanAnomaly() {
    let meanAnomaly = this.#orbitalElements.M.constant + this.#orbitalElements.M.coefficient * this.#time
    meanAnomaly = this.normalizeAngle(meanAnomaly)
    let meanAnomalyRadians = this.degreesToRadians(meanAnomaly)
    return meanAnomalyRadians
  }
  
  calculateEccentricity() {
    let eccentricity = this.#orbitalElements.e.constant + this.#orbitalElements.e.coefficient * this.#time
    return eccentricity
  }

  normalizeAngle(angle) {
    while (angle < 0 || angle > 360) {
      if (angle < 0) {
        angle += 360
      } else if (angle > 360) {
        angle -= 360
      }
    }
    return angle
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI/180
  }

}

export default AstronomicalCalculator
