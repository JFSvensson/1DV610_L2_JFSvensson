# CelestialFinder
A module that calculates the position of a celestial bodies in the solar system at a given time. 

The current version supports:
- The Sun

## Installation

``` js
npm install --- 
```


## Loading 

import CelestialFinder from 'CelestialFinder'

## Usage

### Find the position
CelestialFinder.whereIsTheSun('2023-09-06 10:00:00')

## Future 

Hopefully future releases will support:
- The Moon
- Mercury
- Venus
- Mars
- Jupiter
- Saturn
- Uranus
- Neptune
- Pluto and other bodies like Ceres

It will also include the ability to give time for next perihelium or aphelium.

nextPerihelion
lastPerihelion

nextAphelion
lastAphelion

timeToNextPerihelion

## Calculations 
The calculations are based on Paul Schlyters work published at https://stjarnhimlen.se/comp/ppcomp.html.

### Orbital Elements
The orbital elements for the supported celestial bodies are stored in json. The elements are:
- a: Semi-major axis of the orbit, or mean distance from the sun.
- e: Eccentricity, the elongation of the orbit compared to a circle.
- i: Inclination to the ecliptic, the plane of Earth's orbit.
- N: Longitude of the ascending node, the point of the orbit that passes the plane of reference. Often denoted with Ω (uppercase omega). 
- w: Argument of periapsis (perihelion for heliocentric orbits). Often denoted with ω (lowercase omega)
- M: Mean anomaly, fictitious "angle" that increase linear with time. The True anomaly changes faster at perihelion. 

### Time scale
Time is calculated in days since (or before) january 1 in the year 2000. The following formula is used for validity over the entire Gregorian Calendar:

 ```
 d = 367*y - 7 * ( y + (m+9)/12 ) / 4 - 3 * ( ( y + (m-9)/7 ) / 100 + 1 ) / 4 + 275*m/9 + D - 730515
 ```
All division is integer, thus rounded down.

## License
This project is part of laboration 2 in the course "1DV610 - Introduktion till mjukvarukvalitet" at Linnéuniversitetet. It's published under MIT License.