class TimeSince2000 {
  #date
  #hours
  #timeSince2000

  constructor(date, hours) {
    this.#date = date
    this.#hours = hours
    this.#timeSince2000 = this.timeSince2000(this.#date, this.#hours)
  }

  getTimeSince2000() {
    return this.#timeSince2000
  }

  timeSince2000() {
    let dateArray = this.#date.split('-')
    let year = parseInt(dateArray[0])
    let month = parseInt(dateArray[1])
    let day = parseInt(dateArray[2])

    // Formula valid over the entire Gregorian calendar, integer division only. Source: Paul Schlyter, stjarnhimlen.se
    //     d = 367*y - 7 * ( y + (m+9)/12 ) / 4 - 3 * ( ( y + (m-9)/7 ) / 100 + 1 ) / 4 + 275*m/9 + D - 730515
    let daysSince2000 = ((367 * year) 
      - (Math.floor(7 * (year + Math.floor((month + 9)/12))/4))
      - (Math.floor(3 * ((Math.floor((year + Math.floor((month - 9)/7))/100) + 1))/4)) 
      + (Math.floor((275*month)/9)) 
      + day 
      - 730515)

    // Remove one day so number of days begins at midnight
    daysSince2000 = daysSince2000 - 1

    // Add the time as fractions of a day
    daysSince2000 = daysSince2000 + this.#hours/24

    return daysSince2000
  }
}

export default TimeSince2000
