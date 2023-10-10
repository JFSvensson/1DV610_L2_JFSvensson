class AstronomicalCalculator {
  #time
  #orbitalElements

  constructor(time, orbitalElements) {
    this.#time = time
    this.#orbitalElements = orbitalElements
  }

  calculateMeanAnomaly() {
    // Compute mean anomaly and make sure it is between 0 and 360
    let meanAnomaly = this.#orbitalElements.M.constant + this.#orbitalElements.M.coefficient * this.#time
    while (meanAnomaly < 0 || meanAnomaly > 360) {
      if (meanAnomaly < 0) {
        meanAnomaly = meanAnomaly + 360
      } else if (meanAnomaly > 360) {
        meanAnomaly = meanAnomaly - 360
      }
    }
    let meanAnomalyRadians = meanAnomaly * Math.PI/180
    return meanAnomalyRadians
  }
  
  calculateEccentricity() {
    let eccentricity = this.#orbitalElements.e.constant + this.#orbitalElements.e.coefficient * this.#time
    return eccentricity
  }

}

export default AstronomicalCalculator
