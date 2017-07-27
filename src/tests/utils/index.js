export const emptyState = {
  selectedState: '',
  soybeanProduction: {},
  forecasts: {
    errorLog: {},
    disallowedIds: [],
    precipForecasts: []
  }
}

export const fullState = {
  selectedState: 'CA',
  soybeanProduction: {
    payload: [{
      stateAbbr: 'CA',
      soybeanYield: 1e7
    }]
  },
  forecasts: {
    errorLog: {
      x: { stateAbbr: 'CA', messages: ['abyssal'] },
      y: { stateAbbr: 'CA', messages: ['doom'] }
    },
    disallowedIds: [],
    precipForecasts: [
      {
        id: 1,
        coords: {},
        countyName: 'x',
        stateAbbr: 'CA',
        lastUpdated: Date.now(),
        series: [
          { i: 0, x: Date.now(), y: 0.01 },
          { i: 1, x: Date.now(), y: 0.11 }
        ]
      },
      {
        id: 2,
        coords: {},
        countyName: 'y',
        stateAbbr: 'CA',
        lastUpdated: Date.now(),
        series: [
          { i: 0, x: Date.now(), y: 0.02 },
          { i: 1, x: Date.now(), y: 0.22 }
        ]
      },
    ]
  }
}
