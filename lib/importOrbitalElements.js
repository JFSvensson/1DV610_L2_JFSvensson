// When running tests the "assert { type: 'json' }" needs to be removed from the import statements. 
import sunOrbitalElements from '../data/OrbitalElements/sun.json' assert { type: 'json' } 
import moonOrbitalElements from '../data/OrbitalElements/moon.json' assert { type: 'json' }

class importOrbitalElements {
  #celestialBody

  constructor(celestialBody) {
    this.#celestialBody = celestialBody
  }

  importOrbitalElements() {
    switch (this.#celestialBody) {
      case 'sun':
        return sunOrbitalElements
      case 'moon':
        return moonOrbitalElements
    }
  }
}

export default importOrbitalElements
