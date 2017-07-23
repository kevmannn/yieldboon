# soyfall [![Build Status](https://img.shields.io/travis/kevmannn/soyfall/master.svg?style=flat-square)](https://travis-ci.org/kevmannn/soyfall)

> [A React / Redux app to monitor daily rainfall in soybean-saturated locales](https://soyfall.now.sh)

## The problem (and a solution):
> Create a service that shows today's total rainfall for counties that produce a lot of soybeans. The user can choose a state to filter the results.

The challenge was meaningfully interpreting the problem in the light of ostensible utility that its solution could provide.
Conceptul thinking (with respect to tools, data flow, component hierarchies, and implementation) had to follow from this.

## Focus:
> Frontend

## Stack & Technical choices:
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [Reselect](https://github.com/reactjs/reselect)
* [React-router](https://github.com/ReactTraining/react-router)
* [React-vis](https://github.com/uber/react-vis)
* [Material-ui](https://github.com/callemall/material-ui)
* [Jest](https://github.com/facebook/jest)
* [Enzyme](https://github.com/airbnb/enzyme)

## Challenges & Tradeoffs:
* opting for a new (simpler) way of showing (meaningful) context
* trying not to represent too much data at a given moment
* chasing down bugs related to working with cached state
* imagining what would bring the most utility to an agriculturally-minded user
* opting not to implement an [Immutable](https://github.com/facebook/immutable-js/) store
* opting not to implement [Rheostat](https://github.com/airbnb/rheostat) to allow the user to dynamically filter by soybean yield
* opting not to implement [React-mapbox-gl](https://github.com/alex3165/react-mapbox-gl) to geographically represent counties

## Lessons:
* Willingness to close the laptop and just think should be commensurate with obscurity concerning the "large-scale path" of the solution.

* The interpretation of the problem will fluctuate, and given its extreme importance (with respect to how all subsequent thinking takes shape) thus demands attention to how it is "heard".

* Much thinking can be contingent on (apparent) API limitations and assumptions about their response formats.

## Future (in order of priority):
* The ability to retry failed forecast requests (and better error handling in general).

* Correlate the forecast with boon / doom of the crop (given the nature of soybean and the crop's history / growth stage (which should also be accomodated in the app)).

* For the sake of triage, use the mapbox API to show shortest paths (and directions) between farm locations the user cares about.

* Account for the fact of weather forecasting (possibly) being [PSPACE-hard](http://www.sigecom.org/exchanges/volume_7/3/FORTNOW.pdf)

## License

MIT © [Kevin Donahue](https://twitter.com/nonnontrivial)
