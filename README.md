EXPERIMENTAL - USE AT OWN RISK

# CelestialFinder
A JavaScript library that calculates the position of a celestial bodies in the solar system at a given time. 

## Current Version (0.2.x)
The current version supports:
- The Sun
- The Moon

## Usage

### Installation
CelestialFinder is distributed as a npm package.

``` bash
npm i celestialfinder 
```

### Importing 
Import the CelestialFinder class in your JavaScript file.

```js
import CelestialFinder from 'celestialfinder'
```

The create an instance of the CelestialFinder class by providing a date and time in hours. The date input is a string in the format 'yy-mm-dd', and hours are given as integers or with fractions (eg. 1 hour 45 minutes as 1.75).

```js
const celestialFinder = new CelestialFinder(date, hours)
```

**Example:**
```js
const celestialFinder = new CelestialFinder('2010-10-12', 16)
```

### Find the position
Now you can use the `celestialFinder` to calculate the position of a celestial object at the given date and time. The object returned is of the form (numbers included as an example):

```js
{
  rightAscension: {
    hours: -3.875798062906315,
    minutes: 7.452116225621106,
    seconds: 27.12697353726636
  },
  declination: {
    degrees: -15.074768465809955,
    arcminutes: 55.51389205140271,
    arcseconds: 30.833523084162806
  }
}
```

#### The Sun
For the position of the Sun, as seen from Earth:

```js
celestialFinder.positionOfTheSun()
```

The distance in astronomical units, AU, between the Sun and Earth at the given time:

```js
celestialFinder.distanceToTheSun()
```

The periapsis at the given time:

```js
celestialFinder.periapsisOfTheSun()
```

#### The Moon
For the position of the Moon, as seen from Earth:
```js
celestialFinder.positionOfTheMoon()
```

#### Time since 2000
For the calculations of the position there is a need to also calculate the time eloped since midnight between 31 december 1999 and 1 january 2000, epoch 2000, in days. It is possible to get this by using CelestialFinder.
```js
celestialFinder.timeSince2000()
```

## Known Issues
The position of the celestial objects do come with errors. Do not use this library for sending real rockets into space and hope to make a soft landing. Odds are that you will end like the passengers in Aniara, science fiction poem written by Swedish Nobel laureate Harry Martinson.

## Future Features
Hopefully future releases will support:
- Mercury
- Venus
- Mars
- Jupiter
- Saturn
- Uranus
- Neptune
- Pluto and other bodies like Ceres

Other planned features include the ability to give time for next perihelium or aphelium.

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

### 0.2.2
Updated README.md with clearer instructions for installation and usage. 

### 0.2.3-0.2.4
Code cleaning and fixing som errors in README.md.

### 0.2.5
Renaming of methods for finding the position of the Sun and Moon. Adding the ability to get the distance between Earth and Sun, and also the periapsis.


## License
This project is part of "laboration 2" in the course "1DV610 - Introduktion till mjukvarukvalitet" at Linnéuniversitetet. It's published under MIT License.

## Contributing
The library is available at GitHub (https://github.com/JFSvensson/1DV610_L2_JFSvensson). Pull requests and/or suggestions for future releases are welcome. 