import moonOrbitalElements from '../data/OrbitalElements/moon.json' assert { type: 'json' }
import timeSince2000 from './timeSince2000.js'

class whereIsTheMoon {
  #date
  #hours

  constructor(date, hours) {
    this.#date = date
    this.#hours = hours
  }

  whereIsTheMoon(date, hours) {
    let timeSinceEpoch = new timeSince2000(this.#date, this.#hours)
    let time = timeSinceEpoch.getTimeSince2000()

    // Compute mean anomaly and make sure it is between 0 and 360
    let meanAnomaly = moonOrbitalElements.M.constant + moonOrbitalElements.M.coefficient * time
    while (meanAnomaly < 0 || meanAnomaly > 360) {
      if (meanAnomaly < 0) {
        meanAnomaly = meanAnomaly + 360
      } else if (meanAnomaly > 360) {
        meanAnomaly = meanAnomaly - 360
      }
    }
    let meanAnomalyRadians = meanAnomaly * Math.PI/180

    let eccentricity = moonOrbitalElements.e.constant + moonOrbitalElements.e.coefficient * time

    // Solve Kepler's equation for eccentric anomaly (M = e * sin(E) - E)
    // First approximation: E = M + e * sin(M) * ( 1.0 + e * cos(M) )
    let eccentricAnomalyRadians = 
      meanAnomalyRadians + eccentricity 
      * Math.sin(meanAnomalyRadians) 
      * (1.0 + eccentricity * Math.cos(meanAnomalyRadians))
    if (eccentricity < 0.05) {
      // Second approximation: E1 = E0 - ( E0 - e * sin(E0) - M ) / ( 1 - e * cos(E0) )
      let eccentricAnomalyRadiansApproximation = 
        eccentricAnomalyRadians 
        - ((eccentricAnomalyRadians - eccentricity * Math.sin(eccentricAnomalyRadians) - meanAnomalyRadians)
        / (1.0 - eccentricity * Math.cos(eccentricAnomalyRadians)))
      let eccentricAnomalyRadiansDifference = Math.abs(eccentricAnomalyRadians - eccentricAnomalyRadiansApproximation)
      // Keep iterating until the difference is less than 0.00002 radians
      if (eccentricAnomalyRadiansDifference > 0.00002) {
        do {
          eccentricAnomalyRadiansApproximation = 
            eccentricAnomalyRadians 
            - ((eccentricAnomalyRadians - eccentricity * Math.sin(eccentricAnomalyRadians) - meanAnomalyRadians)
            / (1.0 - eccentricity * Math.cos(eccentricAnomalyRadians)))
          eccentricAnomalyRadiansDifference = Math.abs(eccentricAnomalyRadians - eccentricAnomalyRadiansApproximation)
          eccentricAnomalyRadians = eccentricAnomalyRadiansApproximation
        } while (eccentricAnomalyRadiansDifference < 0.00002)
      } else {
        eccentricAnomalyRadians = eccentricAnomalyRadiansApproximation
      }
    }

    // Compute true anomaly
    let xv = moonOrbitalElements.a * (Math.cos(eccentricAnomalyRadians) - eccentricity)
    let yv = moonOrbitalElements.a * (Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(eccentricAnomalyRadians))
    let trueAnomaly = Math.atan2(yv, xv)

    // Compute distance
    let distance = Math.sqrt(xv * xv + yv * yv)

    // Compute longitude of the ascending node (N or Ω)
    let longitudeOfTheAscendingNode = moonOrbitalElements.N.constant + moonOrbitalElements.N.coefficient * time
    let longitudeOfTheAscendingNodeRadians = longitudeOfTheAscendingNode * Math.PI/180

    // Compute periapsis (w or ω)
    let periapsis = moonOrbitalElements.w.constant + moonOrbitalElements.w.coefficient * time
    let periapsisRadians = periapsis * Math.PI/180

    // Compute position, geocentric, in ecliptic coordinates
    let xg = 
      distance 
      * ((Math.cos(longitudeOfTheAscendingNodeRadians)
      * Math.cos(trueAnomaly + periapsisRadians))
      - (Math.sin(longitudeOfTheAscendingNodeRadians)
      * Math.sin(trueAnomaly + periapsisRadians)
      * Math.cos(moonOrbitalElements.i * Math.PI/180)))
    let yg =
      distance
      * ((Math.sin(longitudeOfTheAscendingNodeRadians)
      * Math.cos(trueAnomaly + periapsisRadians))
      + (Math.cos(longitudeOfTheAscendingNodeRadians)
      * Math.sin(trueAnomaly + periapsisRadians)
      * Math.cos(moonOrbitalElements.i * Math.PI/180)))
    let zg = 
      distance
      * (Math.sin(trueAnomaly + periapsisRadians)
      * Math.sin(moonOrbitalElements.i * Math.PI/180))
    
    // TODO: Add longitude and latitude for perturbations
    // TIP: Use qrt(xh*xh+yh*yh+zh*zh) to test, should be equal to distance with rounding errors.

    // Convert ecliptic coordinates to equatorial coordinates
    // Compute obliquity of the ecliptic
    let obliquityOfTheEclipticRadians = (23.4393 - 3.563E-7 * time) * Math.PI/180
    let xEquatorial = xg
    let yEquatorial = 
      yg * Math.cos(obliquityOfTheEclipticRadians) 
      - zg * Math.sin(obliquityOfTheEclipticRadians)
    let zEquatorial =
      yg * Math.sin(obliquityOfTheEclipticRadians)
      + zg * Math.cos(obliquityOfTheEclipticRadians)

    // Compute right ascension and declination
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

    // Compute geocentric distance
    let geocentricDistance = Math.sqrt(xEquatorial * xEquatorial + yEquatorial * yEquatorial + zEquatorial * zEquatorial)
  
    console.log('The Moon is at RA: ' 
      + Math.floor(rightAscension.hours) + ' hours, ' 
      + Math.floor(rightAscension.minutes) + ' minutes, and '
      + Math.floor(rightAscension.seconds) + ' seconds, and Decl: ' 
      + Math.floor(declination.degrees) + ' degrees, '
      + Math.floor(declination.arcminutes) + ' arcminutes and '
      + Math.floor(declination.arcseconds) + ' arcseconds, and distance of '
      + geocentricDistance +' earth radii on ' 
      + this.#date + ' at ' + this.#hours + '.')
  
  }

}

export default whereIsTheMoon
