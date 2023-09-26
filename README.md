EXPERIMENTAL - USE AT OWN RISK

# CelestialFinder 0.2
A module that calculates the position of a celestial bodies in the solar system at a given time. 

The current version (0.2) supports:
- The Sun
- The Moon

## Installation

``` js
npm install --- 
```


## Loading 

import CelestialFinder from 'CelestialFinder'

## Usage

### Find the position
The date is input as a string. The time in hours, and fractions of hours. The time eloped since midnight between 31 december 1999 and 1 january 2000, epoch 2000, is also possible to receive by using CelestialFinder.timeSince2000('2023-09-13', 15).

#### The Sun
CelestialFinder.whereIsTheSun('2023-09-06', 10)

#### The Moon
CelestialFinder.whereIsTheMoon('2023-09-06', 10)

## Future 

Hopefully future releases will support:
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

The data stored in the json-file is in case of angles in degrees. The semi-major axis is in astronomical units, AU, except for the moon which is in earth radii.

### Time scale
Time is calculated in days since (or before) january 1 in the year 2000. The following formula is used for validity over the entire Gregorian Calendar:

 ```
 d = 367*y - 7 * ( y + (m+9)/12 ) / 4 - 3 * ( ( y + (m-9)/7 ) / 100 + 1 ) / 4 + 275*m/9 + D - 730515
 ```
All division is integer, thus rounded down.

## Versions
### 0.1
First release, supports calculating the position of the Sun.

### 0.2
CelestialFinder now supports finding the position of the Moon. It is also possible to get the time eloped since epoch 2000, that is the midnight between 31 december 1999 and 1 january 2000. Released as a npm package.

### 0.2.1
Code rewrites making it possible to call and get results from calculations such as distance, periapsis, anomalies and more for a given time. These features are undocumented.

### 0.3

## License
This project is part of "laboration 2" in the course "1DV610 - Introduktion till mjukvarukvalitet" at Linnéuniversitetet. It's published under MIT License.