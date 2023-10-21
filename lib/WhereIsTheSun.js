import ImportOrbitalElements from './ImportOrbitalElements.js'
import TimeSince2000 from './TimeSince2000.js'
import AstronomicalCalculator from './AstronomicalCalculator.js'

class WhereIsTheSun {
  #time
  #orbitalElements
  #periapsis
  #distance
  #calculator
  
  constructor(date, hours) {
    const timeSince2000 = new TimeSince2000(date, hours)
    this.#time = timeSince2000.getTimeSince2000()

    const sunsOrbitalElements = new ImportOrbitalElements('sun')
    this.#orbitalElements = sunsOrbitalElements.importOrbitalElements()

    const astronomicalCalculator = new AstronomicalCalculator(this.#time, this.#orbitalElements)
    this.#calculator = astronomicalCalculator
  }

  getPeriapsis() {
    return this.#periapsis
  }

  getDistance() {
    return this.#distance
  }

  whereIsTheSun() {
    let meanAnomalyRadians = this.#calculator.calculateMeanAnomaly()
    let eccentricity = this.#calculator.calculateEccentricity()

    let periapsis = this.calculatePeriapsis(this.#time)
    this.#periapsis = periapsis
    let eccentricAnomalyRadians = this.calculateEccentricAnomalyRadians(meanAnomalyRadians, eccentricity)
    let majorAxisPosition = this.calculateMajorAxisPosition(eccentricAnomalyRadians, eccentricity)
    let minorAxisPosition = this.calculateMinorAxisPosition(eccentricAnomalyRadians, eccentricity)
    let trueAnomaly = this.calculateTrueAnomaly(majorAxisPosition, minorAxisPosition)
    let distance = this.calculateDistance(majorAxisPosition, minorAxisPosition)
    this.#distance = distance
    let trueLongitudeRadians = this.calculateTrueLongitudeRadian(trueAnomaly, periapsis)
    let obliquityOfTheEclipticRadians = this.calculateObliquityOfTheEclipticRadians(this.#time)
    let equatorialCoordinates = this.calculateEquatorialCoordinates(distance, trueLongitudeRadians, obliquityOfTheEclipticRadians)
    let rightAscension = this.calculateRightAscension(equatorialCoordinates)
    let declination = this.calculateDeclination(equatorialCoordinates)

    return { rightAscension, declination }
  }

  calculatePeriapsis(time) {
    let periapsis = this.#orbitalElements.w.constant + this.#orbitalElements.w.coefficient * time
    return periapsis
  }

  calculateEccentricAnomalyRadians(meanAnomalyRadians, eccentricity) {
    let eccentricAnomalyRadians = 
      meanAnomalyRadians + eccentricity 
      * Math.sin(meanAnomalyRadians) 
      * (1 + eccentricity * Math.cos(meanAnomalyRadians))
    return eccentricAnomalyRadians
  }

  calculateMajorAxisPosition(eccentricAnomalyRadians, eccentricity) {
    let majorAxisPosition = Math.cos(eccentricAnomalyRadians) - eccentricity
    return majorAxisPosition
  }

  calculateMinorAxisPosition(eccentricAnomalyRadians, eccentricity) {
    let minorAxisPosition = Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(eccentricAnomalyRadians)
    return minorAxisPosition
  }

  calculateTrueAnomaly(majorAxisPosition, minorAxisPosition) {
    let trueAnomaly = Math.atan2(minorAxisPosition, majorAxisPosition)
    return trueAnomaly
  }

  calculateDistance(majorAxisPosition, minorAxisPosition) {
    let distance = Math.sqrt(majorAxisPosition * majorAxisPosition + minorAxisPosition * minorAxisPosition)
    return distance
  }

  calculateTrueLongitudeRadian(trueAnomaly, periapsis) {
    let trueLongitudeRadians = trueAnomaly + (periapsis * Math.PI/180)
    while (trueLongitudeRadians < 0 || trueLongitudeRadians > (Math.PI * 2)) {
      if (trueLongitudeRadians < 0) {
        trueLongitudeRadians = trueLongitudeRadians + Math.PI * 2
      } else if (trueLongitudeRadians > (Math.PI * 2)) {
        trueLongitudeRadians = trueLongitudeRadians - Math.PI * 2
      }
    }
    return trueLongitudeRadians
  }

  calculateObliquityOfTheEclipticRadians(time) {
    let obliquityOfTheEclipticRadians = (23.4393 - 3.563E-7 * time) * Math.PI/180
    return obliquityOfTheEclipticRadians
  }
  
  calculateEquatorialCoordinates(distance, trueLongitudeRadians, obliquityOfTheEclipticRadians) {
    let equatorialX = distance * Math.cos(trueLongitudeRadians)
    let equatorialY = distance * Math.sin(trueLongitudeRadians) * Math.cos(obliquityOfTheEclipticRadians)
    let equatorialZ = distance * Math.sin(trueLongitudeRadians) * Math.sin(obliquityOfTheEclipticRadians)
    return { equatorialX, equatorialY, equatorialZ }
  }

  calculateRightAscension (equatorialCoordinates) {
    let rightAscensionRadians = Math.atan2(equatorialCoordinates.equatorialY, equatorialCoordinates.equatorialX)
    let rightAscension = { hours: 0, minutes: 0, seconds: 0}
    rightAscension.hours = (rightAscensionRadians * 180/Math.PI) / 15 // 15 degrees per hour
    rightAscension.minutes = (rightAscension.hours - Math.floor(rightAscension.hours)) * 60
    rightAscension.seconds = (rightAscension.minutes - Math.floor(rightAscension.minutes)) * 60
    return rightAscension
  }

  calculateDeclination(equatorialCoordinates) {
    let declinationRadians = Math.atan2(equatorialCoordinates.equatorialZ, 
      Math.sqrt(equatorialCoordinates.equatorialX * equatorialCoordinates.equatorialX 
        + equatorialCoordinates.equatorialY * equatorialCoordinates.equatorialY))
    let declination = { degrees: 0, arcminutes: 0, arcseconds: 0}
    declination.degrees = declinationRadians * 180/Math.PI
    declination.arcminutes = (declination.degrees - Math.floor(declination.degrees)) * 60
    declination.arcseconds = (declination.arcminutes - Math.floor(declination.arcminutes)) * 60
    return declination
  }
}

export default WhereIsTheSun
