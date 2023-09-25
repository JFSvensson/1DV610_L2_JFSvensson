import importOrbitalElements from "../lib/importOrbitalElements"

test('Import orbital elements for the Sun', () => {
  let importSunOrbitalElements = new importOrbitalElements('sun')
  let sunOrbitalElements = importSunOrbitalElements.importOrbitalElements()
  expect(sunOrbitalElements.M.constant).toBe(356.0470)
})
