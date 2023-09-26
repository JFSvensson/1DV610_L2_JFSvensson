import importOrbitalElements from "../lib/importOrbitalElements"

test('Import orbital elements for the Sun - M', () => {
  let importSunOrbitalElements = new importOrbitalElements('sun')
  let sunOrbitalElements = importSunOrbitalElements.importOrbitalElements()
  expect(sunOrbitalElements.M.constant).toBe(356.0470)
})

test('Import orbital elements for the Sun - a', () => {
  let importSunOrbitalElements = new importOrbitalElements('sun')
  let sunOrbitalElements = importSunOrbitalElements.importOrbitalElements()
  expect(sunOrbitalElements.a).toBe(1.000000)
})

test('Import orbital elements for the Moon - a', () => {
  let importMoonOrbitalElements = new importOrbitalElements('moon')
  let moonOrbitalElements = importMoonOrbitalElements.importOrbitalElements()
  expect(moonOrbitalElements.a).toBe(60.2666)
})

test('Import orbital elements for Mercury - a', () => {
  let importMercuryOrbitalElements = new importOrbitalElements('mercury')
  let mercuryOrbitalElements = importMercuryOrbitalElements.importOrbitalElements()
  expect(mercuryOrbitalElements.a).toBe(0.387098)
})
