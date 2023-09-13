import sunOrbitalElements from './OrbitalElements/sun.json' assert { type: 'json' }

console.log(sunOrbitalElements)

whereIsTheSun('2023-09-13', 12)

function whereIsTheSun(date, hours) {
  let time = timeSince2000(date, hours)
  
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

  let eccentricity = sunOrbitalElements.e.constant + sunOrbitalElements.e.coefficient * time
  let periapsis = sunOrbitalElements.w.constant + sunOrbitalElements.w.coefficient * time
  
  // Compute eccentric anomaly in radians
  let eccentricAnomalyRadians = 
    meanAnomalyRadians + eccentricity 
    * Math.sin(meanAnomalyRadians) 
    * (1 + eccentricity * Math.cos(meanAnomalyRadians))
  
  // Compute true anomaly
  let xv = Math.cos(eccentricAnomalyRadians) - eccentricity
  let yv = Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(eccentricAnomalyRadians)
  let trueAnomaly = Math.atan2(yv, xv)
  
  // Compute distance
  let distance = Math.sqrt(xv * xv + yv * yv)
  
  // Compute true longitude, and make sure it is between 0 and 360
  let trueLongitudeRadians = trueAnomaly + (periapsis * Math.PI/180)
  console.log('True longitude: ' + trueLongitudeRadians)
  while (trueLongitudeRadians < 0 || trueLongitudeRadians > (Math.PI * 2)) {
    if (trueLongitude < 0) {
      trueLongitude = trueLongitude + Math.PI * 2
    } else if (trueLongitude > (Math.PI * 2)) {
      trueLongitude = trueLongitude - Math.PI * 2
    }
  }
  // let trueLongitudeRadians = trueLongitude * Math.PI/180

  // Compute obliquity of the ecliptic
  let obliquityOfTheEclipticRadians = (23.4393 - 3.563E-7 * time) * Math.PI/180

  // Compute equatorial coordinates
  let xEquatorial = distance * Math.cos(trueLongitudeRadians)
  let yEquatorial = distance * Math.sin(trueLongitudeRadians) * Math.cos(obliquityOfTheEclipticRadians)
  let zEquatorial = distance * Math.sin(trueLongitudeRadians) * Math.sin(obliquityOfTheEclipticRadians)
  
  // Compute position in Right Ascension and Declination
  let rightAscension = (Math.atan2(yEquatorial, xEquatorial) * 180/Math.PI) / 15
  let declination = Math.atan2(zEquatorial, Math.sqrt(xEquatorial * xEquatorial + yEquatorial * yEquatorial)) * 180/Math.PI

  console.log('The Sun is at RA: ' + rightAscension + ' hours, and Decl: ' + declination + ' degrees on ' + date + ' at ' + hours + '.')
  console.log('and at ' + xEquatorial + ', ' + yEquatorial + ', ' + zEquatorial + ' in equatorial coordinates.')

  // return { rightAscension, declination }
}

/**
 * Converts a date to number of days since (or before) 2000-01-01.
 * 
 * @param {string} date 
 * @returns int
 */
function timeSince2000(date, hours) {
  let dateArray = date.split('-')
  let year = parseInt(dateArray[0])
  let month = parseInt(dateArray[1])
  let day = parseInt(dateArray[2])
  console.log('Year: ' + year + ', month: ' + month + ', day: ' + day)
  // Formula valid over the entire Gregorian calendar, integer division only.
  //     d = 367*y - 7 * ( y + (m+9)/12 ) / 4 - 3 * ( ( y + (m-9)/7 ) / 100 + 1 ) / 4 + 275*m/9 + D - 730515
  let daysSince2000 = ((367 * year) 
    - (7 * Math.floor((year + (month + 9)/12)/4)) 
    - (3 * Math.floor(((year + (month - 9)/7)/100 + 1)/4)) 
    + (275 * Math.floor(month/9)) 
    + day 
    - 730515)

  // Add the time at day
  daysSince2000 = daysSince2000 + hours/24

  console.log('Days since 2000: ' + daysSince2000)

  return daysSince2000
}
