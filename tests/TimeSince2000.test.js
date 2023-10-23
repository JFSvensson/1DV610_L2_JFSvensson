import TimeSince2000 from '../lib/TimeSince2000.js'

describe('TimeSince2000', () => {
  it('should return number of days between 2000-01-01 and a given date', () => {
    const time2000_01_01 = new TimeSince2000('2000-01-01', 0)
    expect(time2000_01_01.getTimeSince2000()).toBe(0)

    const time2000_01_02 = new TimeSince2000('2000-01-02', 0)
    expect(time2000_01_02.getTimeSince2000()).toBe(1)

    const time1999_12_31 = new TimeSince2000('1999-12-31', 0)
    expect(time1999_12_31.getTimeSince2000()).toBe(-1)

    const time1999_01_01 = new TimeSince2000('1999-01-01', 0)
    expect(time1999_01_01.getTimeSince2000()).toBe(-365)

    const time1000_01_01 = new TimeSince2000('1000-01-01', 0)
    expect(time1000_01_01.getTimeSince2000()).toBe(-365242)

    const time2023_09_10 = new TimeSince2000('2023-09-10', 0)
    expect(time2023_09_10.getTimeSince2000()).toBe(8653)
  })
})
