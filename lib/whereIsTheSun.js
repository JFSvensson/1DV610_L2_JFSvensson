import sunOrbitalElements from '../data/OrbitalElements/sun.json' assert { type: 'json' }
import timeSince2000 from './timeSince2000.js'

class whereIsTheSun {
  #date
  #hours

  constructor(date, hours) {
    this.#date = date
    this.#hours = hours
  }

  whereIsTheSun() {
    let time = this.calculateTimeSinceEpoch()
    let meanAnomalyRadians = this.calculateMeanAnomaly(time)
    let eccentricity = this.calculateEccentricity(time)
    let periapsis = this.calculatePeriapsis(time)
    let eccentricAnomalyRadians = this.calculateEccentricAnomalyRadians(meanAnomalyRadians, eccentricity)
    let majorAxisPosition = this.calculateMajorAxisPosition(eccentricAnomalyRadians, eccentricity)
    let minorAxisPosition = this.calculateMinorAxisPosition(eccentricAnomalyRadians, eccentricity)
    let trueAnomaly = this.calculateTrueAnomaly(majorAxisPosition, minorAxisPosition)
    let distance = this.calculateDistance(majorAxisPosition, minorAxisPosition)
    let trueLongitudeRadians = this.calculateTrueLongitudeRadian(trueAnomaly, periapsis)

    // Compute obliquity of the ecliptic
    let obliquityOfTheEclipticRadians = (23.4393 - 3.563E-7 * time) * Math.PI/180

    // Compute equatorial coordinates
    let xEquatorial = distance * Math.cos(trueLongitudeRadians)
    let yEquatorial = distance * Math.sin(trueLongitudeRadians) * Math.cos(obliquityOfTheEclipticRadians)
    let zEquatorial = distance * Math.sin(trueLongitudeRadians) * Math.sin(obliquityOfTheEclipticRadians)
    
    // Compute position in Right Ascension and Declination
    let rightAscensionRadians = Math.atan2(yEquatorial, xEquatorial)
    let rightAscension = { hours: 0, minutes: 0, seconds: 0}
    rightAscension.hours = (rightAscensionRadians * 180/Math.PI) / 15
    rightAscension.minutes = (rightAscension.hours - Math.floor(rightAscension.hours)) * 60
    rightAscension.seconds = (rightAscension.minutes - Math.floor(rightAscension.minutes)) * 60

    let declinationRadians = Math.atan2(zEquatorial, Math.sqrt(xEquatorial * xEquatorial + yEquatorial * yEquatorial))
    let declination = { degrees: 0, minutes: 0, seconds: 0}
    declination.degrees = declinationRadians * 180/Math.PI
    declination.arcminutes = (declination.degrees - Math.floor(declination.degrees)) * 60
    declination.arcseconds = (declination.arcminutes - Math.floor(declination.arcminutes)) * 60


    console.log('The Sun is at RA: ' 
      + Math.floor(rightAscension.hours) + ' hours, ' 
      + Math.floor(rightAscension.minutes) + ' minutes, and '
      + Math.floor(rightAscension.seconds) + ' seconds. And Decl: ' 
      + Math.floor(declination.degrees) + ' degrees, '
      + Math.floor(declination.arcminutes) + ' arcminutes and '
      + Math.floor(declination.arcseconds) + ' arcseconds on ' 
      + this.#date + ' at ' + this.#hours + '.')
    console.log('and at ' + xEquatorial + ', ' + yEquatorial + ', ' + zEquatorial + ' in equatorial coordinates.')

    return { rightAscension, declination }
  }

  calculateTimeSinceEpoch() {
    let timeSinceEpoch = new timeSince2000(this.#date, this.#hours)
    return timeSinceEpoch.getTimeSince2000()
  }

  calculateMeanAnomaly(time) {
    // Compute mean anomaly and make sure it is between 0 and 360
    let meanAnomaly = sunOrbitalElements.M.constant + sunOrbitalElements.M.coefficient * time
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

  calculateEccentricity(time) {
    let eccentricity = sunOrbitalElements.e.constant + sunOrbitalElements.e.coefficient * time
    return eccentricity
  }

  calculatePeriapsis(time) {
    let periapsis = sunOrbitalElements.w.constant + sunOrbitalElements.w.coefficient * time
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

  // printPosition() {
  //   console.log('The Sun is at RA: ' 
  //     + Math.floor(rightAscension.hours) + ' hours, ' 
  //     + Math.floor(rightAscension.minutes) + ' minutes, and '
  //     + Math.floor(rightAscension.seconds) + ' seconds. And Decl: ' 
  //     + Math.floor(declination.degrees) + ' degrees, '
  //     + Math.floor(declination.arcminutes) + ' arcminutes and '
  //     + Math.floor(declination.arcseconds) + ' arcseconds on ' 
  //     + this.#date + ' at ' + this.#hours + '.')
  //   console.log('and at ' + xEquatorial + ', ' + yEquatorial + ', ' + zEquatorial + ' in equatorial coordinates.')
  // }


}

export default whereIsTheSun
