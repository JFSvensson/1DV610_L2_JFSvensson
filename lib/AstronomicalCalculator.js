import ImportOrbitalElements from "./ImportOrbitalElements"
import TimeSince2000 from "./TimeSince2000"

class AstronomicalCalculator {
  #date
  #hours
  #orbitalElements

  constructor(date, hours, celestialBody) {
    this.#date = date
    this.#hours = hours
    const celestialBodiesOrbitalElements = new ImportOrbitalElements(celestialBody)
    this.#orbitalElements = celestialBodiesOrbitalElements.importOrbitalElements()
  }

}
