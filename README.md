# soyfall [![Build Status](https://img.shields.io/travis/kevmannn/soyfall/master.svg?style=flat-square)](https://travis-ci.org/kevmannn/soyfall)

> A React / Redux app to monitor daily rainfall in soybean-saturated locales

> [soyfall](https://soyfall.now.sh)

## The problem (and a solution):
> Create a service that shows today's total rainfall for counties that produce a lot of soybeans. The user can choose a state to filter the results.

i.e. Represent the _location_ and _magnitude_ of rainfall for soybean-producing counties within a given state.

## Focus:
> Frontend

## Stack & Technical choices:
> React, Redux, React-mapbox-gl, React-vis, Reselect, Material-ui

## Challenges & Tradeoffs:
> caching...
> not trying to represent too much at a given moment

## Lessons:
* Willingness to close the laptop and just think should be commensurate with obscurity concerning the "large-scale path" of the solution.

* The interpretation of the problem will fluctuate, and given its extreme importance (with respect to how all subsequent thinking takes shape) thus demands attention to how it is "heard".

* Much thinking can be contingent on (apparent) API limitations and assumptions about response formats.

## Future:
* Create layer of polygons representing the boundaries of each county within `ForecastMap`.

* Use [`rheostat`](https://github.com/airbnb/rheostat) to allow the user to dynamically set `soybeanYieldBounds`.

* Correlate the forecast with boon / doom of the crop (given the nature of soybean and the crop's history).

* For the sake of triage, use mapbox API to show shortest paths (and directions) between farm locations the user cares about.

* Account for the fact of weather forecasting (possibly) being [PSPACE-hard](http://www.sigecom.org/exchanges/volume_7/3/FORTNOW.pdf)

<!-- finding a path: -->
<!-- "Create a service that shows today's total rainfall for counties that produce a lot of soybeans. The user can choose a state to filter the results." -->

<!-- > Represent the _location_ and _magnitude_ of rainfall for soybean-producing counties within a given state. -->
> Chart their aggregate cumulative precipIntensity, with hint showing accumulation at that (= highlighted) point.
> Disambiguate the aggregate cumulative precipIntensity relative to the highlighted point in the Map.

## License

MIT © [Kevin Donahue](https://twitter.com/nonnontrivial)
