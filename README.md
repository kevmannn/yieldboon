# yieldboon [![Build Status](https://img.shields.io/travis/kevmannn/yieldboon/master.svg?style=flat-square)](https://travis-ci.org/kevmannn/yieldboon)

[A React / Redux app to monitor daily rainfall in soybean-saturated locales](https://yieldboon.now.sh)

## The problem (and a solution):
> Create a service that shows today's total rainfall for counties that produce a lot of soybeans. The user can choose a state to filter the results.

The challenge is meaningfully interpreting the problem in the light of potential utility that its solution can provide.
Given the constraints of the problem, it was therefore necessary to think in terms of extensibility / iteration from the beginning.

So, why would someone be interested in a service that shows daily rainfall for counties that produce lots of soybeans?
They likely have some sort of investment (directly _or indirectly_) in the success or failure of some crop in particular.

Rainfall is just one of the factors bearing on the success or failure of crop, so choosing an implementation that leaves open the possibility of
interfacing with other factors seems wise.

In _charting_ the value of a factor (in this case rainfall) over time, what is established is a sense of (temporal) context.
What is left open is the ability to meaningfully chart some subset of the factors (which determine the success or failure of the crop) against one another.

This means that given some concern of the user, a subset of factors determined by this concern can be rendered simultaneously so as to uncover meaning with respect to projected success or failure of crop.

Toward this end, and within the constraints of the stated problem, the app charts the 3 counties with the highest mean rainfall against the mean rainfall across all counties (within the selected state).
Further, the user can hover over the chart to get a sense of the rate of rainfall accumulation, and dynamically filter what counties are factored into the composition of the chart.

## Focus:
Frontend

## Stack:
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
Early on, rendering a map component to show the geographic context of forecasts appeared very desirable, but picturing how everything in the app
should meaningfully fit together became less and less clear. This fact (combined with the possibility of reckoning with the map component's not-very-well-documented API)
pushed me to reconsider my idea. Then the idea of using a prominent chart appeared as a simpler way to achieve a similar sense of context.

### Chasing down bugs related to working with cached state
Getting used to a workflow where the entirety of the state was cached proved unwise. This began as a way of getting around making
unnecessary fetch requests to data services, but it ended up introducing unpredictability into my workflow.
It became slightly terrifying to recall that much had changed in the codebase since the last time the cache was purged.
Finding the origins of bugs related to this became simple, but it still would have been wise
to make better use of [Redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) here.

### Not letting focus on implementation quietly overrule purpose
This was a prominent pitfall when [writing selectors](https://github.com/reactjs/reselect#creating-a-memoized-selector).
Conceptual clarity can shrink as focus on implementation detail grows, so it became important to just think (and not write anything)
when a solution didn't present itself.

### Not opting to use unfamiliar tools which had the potential to "seep through" the entire codebase
Namely, making the entire store [immutable](http://redux.js.org/docs/recipes/UsingImmutableJS.html) was appealing for performance reasons
(especially due to the bulkiness of the soybean production response), but my lack of familiarity with the API and _lack of understanding
of how to measure the perf diff that this would grant me_ caused me to turn away from this.

However, in its current state, the [forecasts reducer](https://github.com/kevmannn/yieldboon/blob/master/src/reducers/forecasts.js) holds onto
all of the forecasts that have been requested for a given day. If in the future it needed to hold forecasts for previous days, it may be wise
to revisit the possibility of using immutable.

## Lessons:
* Willingness to close the laptop and just think should be commensurate with obscurity concerning the "large-scale path" of a solution.

* The interpretation of the problem will fluctuate, and given its extreme importance (with respect to how all subsequent thinking takes shape) thus demands attention to how it is "heard".

* Much thinking can be contingent on (apparent) API limitations and assumptions about their response formats.

## Future (in order of priority):
* Better test coverage.

* Use [Redux-pack](https://github.com/lelandrichardson/redux-pack) or [Redux-loop](https://github.com/redux-loop/redux-loop) to bring increased neatness / extensibility / sanity to async actions.

* Overlay historical average rainfall for a given timespan onto the chart.

* Correlate the forecast with probable boon / doom of the crop (given the nature of soybean and the crop's history / growth stage / values of other factors (which should also be accomodated in the app)).

* For the sake of triage, use the mapbox API to show shortest paths (and directions) between farm locations the user cares about.

* Reckon with the [complexity of weather forecasting](http://www.sigecom.org/exchanges/volume_7/3/FORTNOW.pdf).

## License

MIT © [Kevin Donahue](https://twitter.com/nonnontrivial)
