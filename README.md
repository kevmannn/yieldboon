# soyfall [![Build Status](https://img.shields.io/travis/kevmannn/soyfall/master.svg?style=flat-square)](https://travis-ci.org/kevmannn/soyfall)

> [A React / Redux app to monitor daily rainfall in soybean-saturated locales](https://soyfall.now.sh)

## The problem (and a solution):
> Create a service that shows today's total rainfall for counties that produce a lot of soybeans. The user can choose a state to filter the results.

## Focus:
> Frontend

## Stack & Technical choices:
> React, Redux, React-vis, Reselect, Material-ui

## Challenges & Tradeoffs:
* opting for a new (simpler) way of showing (meaningful) context
* trying not to represent too much data at a given moment
* chasing down bugs related to working with cached state
* imagining what would bring the most utility to an agriculturally-minded user
* opting not to implement an [`immutable`](https://github.com/facebook/immutable-js/) store
* opting not to implement [`rheostat`](https://github.com/airbnb/rheostat) to allow the user to dynamically set `soybeanYieldBounds`

## Lessons:
* Willingness to close the laptop and just think should be commensurate with obscurity concerning the "large-scale path" of the solution.

* The interpretation of the problem will fluctuate, and given its extreme importance (with respect to how all subsequent thinking takes shape) thus demands attention to how it is "heard".

* Much thinking can be contingent on (apparent) API limitations and assumptions about their response formats.

## Future:
* The ability to retry failed forecast requests (and better error handling in general).

* Correlate the forecast with boon / doom of the crop (given the nature of soybean and the crop's history / growth stage (which should also be accomodated in the app)).

* For the sake of triage, use the mapbox API to show shortest paths (and directions) between farm locations the user cares about.

* Account for the fact of weather forecasting (possibly) being [PSPACE-hard](http://www.sigecom.org/exchanges/volume_7/3/FORTNOW.pdf)

## License

MIT © [Kevin Donahue](https://twitter.com/nonnontrivial)
