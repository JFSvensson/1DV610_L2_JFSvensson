import whereIsTheSun from '../lib/whereIsTheSun'

test('Calculate position of the Sun on 2023-09-10 at noon', () => {
  let sunPosition = new whereIsTheSun('2023-09-10', 12)
  let sun = sunPosition.whereIsTheSun()
  //Constants for checking the position of the Sun in an interval +- 10 minutes
  const minRightAscension = { hours: 11, minutes: 3, seconds: 0 }
  const maxRightAscension = { hours: 11, minutes: 23, seconds: 0 }

  expect(sun.rightAscension.minutes).toBeGreaterThanOrEqual(minRightAscension.minutes)
  expect(sun.rightAscension.minutes).toBeLessThanOrEqual(maxRightAscension.minutes)
})
