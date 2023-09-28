import TimeSince2000 from '../lib/TimeSince2000.js'

test('Counts number of days between 2000-01-01 and 2000-01-01', () => {
  let time = new TimeSince2000('2000-01-01', 0)
  expect(time.getTimeSince2000()).toBe(0)
})

test('Counts number of days between 2000-01-01 and 2000-01-02', () => {
  let time = new TimeSince2000('2000-01-02', 0)
  expect(time.getTimeSince2000()).toBe(1)
})

test('Counts number of days between 2000-01-01 and 1999-12-31', () => {
  let time = new TimeSince2000('1999-12-31', 0)
  expect(time.getTimeSince2000()).toBe(-1)
})

test('Counts number of days between 2000-01-01 and 1999-01-01', () => {
  let time = new TimeSince2000('1999-01-01', 0)
  expect(time.getTimeSince2000()).toBe(-365)
})

test('Counts number of days between 2000-01-01 and 1000-01-01', () => {
  let time = new TimeSince2000('1000-01-01', 0)
  expect(time.getTimeSince2000()).toBe(-365242)
})

test('Counts number of days between 2000-01-01 and 2023-09-10', () => {
  let time = new TimeSince2000('2023-09-10', 0)
  expect(time.getTimeSince2000()).toBe(8653)
})
