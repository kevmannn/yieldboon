# soyfall [![Build Status](https://img.shields.io/travis/kevmannn/soyfall/master.svg?style=flat-square)](https://travis-ci.org/kevmannn/soyfall)

[A React / Redux app to monitor daily rainfall in soybean-saturated locales](https://soyfall.now.sh)

## The problem (and a solution):
> Create a service that shows today's total rainfall for counties that produce a lot of soybeans. The user can choose a state to filter the results.

The challenge is meaningfully interpreting the problem in the light of ostensible utility that its solution can provide.
Given the constraints of the problem, it was therefore necessary to think in terms of extensibility from the beginning.

So, why would someone be interested in a service that shows daily rainfall for counties that produce lots of soybeans?
They likely have some sort of investment (directly _or indirectly_) in the success or failure of some crop in particular.

Rainfall is just one of the factors bearing on the success or failure of crop, so choosing an implementation that leaves open the possibility of
interfacing with other factors seems wise.

In _charting_ the value of a factor (in this case rainfall) over time, what is established is a sense of (temporal) context.
What is left open is the ability to meaningfully chart some subset of the factors (which determine the success or failure of the crop) against one another.

This means that given some concern of the user, a subset of factors determined by this concern can be rendered simultaneously so as to uncover meaning with respect to projected success or failure of crop.

## Focus:
Frontend

## Stack & Technical choices:
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [Reselect](https://github.com/reactjs/reselect)
* [React-router](https://github.com/ReactTraining/react-router)
* [React-vis](https://github.com/uber/react-vis)
* [Create-react-app](https://github.com/facebookincubator/create-react-app)
* [Material-ui](https://github.com/callemall/material-ui)
* [Jest](https://github.com/facebook/jest)
* [Enzyme](https://github.com/airbnb/enzyme)
* [Express](https://github.com/expressjs/express)

## Challenges & Tradeoffs:
### Finding a new (simpler) way of showing (meaningful) context and letting go of idealism in the process
Early on, rendering a map component appeared very desirable. However, as time wore on, picturing how everything
should meaningfully fit together became less and less clear. This fact (combined with the possibility of reckoning with the map component's not-very-well-documented API)
pushed me to reconsider my idea. Then the idea of using a prominent chart appeared.

### Chasing down bugs related to working with cached state
[Redux-persist's purge method](https://github.com/rt2zz/redux-persist#persistor-object) saw lots of use.
Early it was nearly terrifying to recall that much had changed since the last time the cache was purged.
Finding the origins of bugs that this caused became very simple as time wore on, but it still would have been wise
to make better use of [Redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) in this case.

### Not letting focus on implementation quietly overrule purpose
This was a prominent pitfall when [writing selectors](https://github.com/reactjs/reselect#creating-a-memoized-selector).
Conceptual clarity can shrink as focus on implementation detail grows, so it became important to just think (and not write anything)
when a solution didn't present itself.

## Lessons:
* Willingness to close the laptop and just think should be commensurate with obscurity concerning the "large-scale path" of a solution.

* The interpretation of the problem will fluctuate, and given its extreme importance (with respect to how all subsequent thinking takes shape) thus demands attention to how it is "heard".

* Much thinking can be contingent on (apparent) API limitations and assumptions about their response formats.

## Future (in order of priority):
* Better test coverage.

* Use [Redux-pack](https://github.com/lelandrichardson/redux-pack) or [Redux-loop](https://github.com/redux-loop/redux-loop) to bring increased neatness / extensibility / sanity to async actions.

* Overlay historical average rainfall for a given timespan onto the chart.

* Correlate the forecast with boon / doom of the crop (given the nature of soybean and the crop's history / growth stage (which should also be accomodated in the app)).

* Generalize to support other crop types.

* For the sake of triage, use the mapbox API to show shortest paths (and directions) between farm locations the user cares about.

* Account for the fact of weather forecasting (possibly) being [PSPACE-hard](http://www.sigecom.org/exchanges/volume_7/3/FORTNOW.pdf).

## License

MIT © [Kevin Donahue](https://twitter.com/nonnontrivial)
