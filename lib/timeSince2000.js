class timeSince2000 {
  #date
  #hours

  constructor(date, hours) {
    this.#date = date
    this.#hours = hours
  }

  /**
   * Converts a date to number of days since (or before) 2000-01-01.
   * 
   * @param {string} date
   * @param {int} hours 
   * @returns int
   */
  timeSince2000(date, hours) {

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
}

export default timeSince2000
