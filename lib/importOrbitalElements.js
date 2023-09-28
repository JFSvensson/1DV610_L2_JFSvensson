// When running tests the "assert { type: 'json' }" needs to be removed from the import statements. 
import sunOrbitalElements from '../data/OrbitalElements/sun.json' assert { type: 'json' } 
import moonOrbitalElements from '../data/OrbitalElements/moon.json' assert { type: 'json' }
import mercuryOrbitalElements from '../data/OrbitalElements/mercury.json' assert { type: 'json' }
import venusOrbitalElements from '../data/OrbitalElements/venus.json' assert { type: 'json' }
import marsOrbitalElements from '../data/OrbitalElements/mars.json' assert { type: 'json' }
import jupiterOrbitalElements from '../data/OrbitalElements/jupiter.json' assert { type: 'json' }
import saturnOrbitalElements from '../data/OrbitalElements/saturn.json' assert { type: 'json' }
import uranusOrbitalElements from '../data/OrbitalElements/uranus.json' assert { type: 'json' }
import neptuneOrbitalElements from '../data/OrbitalElements/neptune.json' assert { type: 'json' }

class ImportOrbitalElements {
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
      case 'mercury':
        return mercuryOrbitalElements
      case 'venus':
        return venusOrbitalElements
      case 'mars':
        return marsOrbitalElements
      case 'jupiter':
        return jupiterOrbitalElements
      case 'saturn':
        return saturnOrbitalElements
      case 'uranus':
        return uranusOrbitalElements
      case 'neptune':
        return neptuneOrbitalElements
      default:
        return 'Error: celestial body not found'
    }
  }
}

export default ImportOrbitalElements
