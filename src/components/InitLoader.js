import React, { PureComponent } from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';

export default class InitLoader extends PureComponent {
  constructor() {
    super();
    this.state = {
      currentResourceIndex: 0
    };
  }

  longevity = 1200;
  resources = ['forecasts', 'crop data', 'counties', 'etc.'];

  componentDidMount() {
    this.interval = setInterval(() => {
      let nextIndex = this.state.currentResourceIndex;
      if (!this.resources[++nextIndex]) {
        nextIndex = 0
      }
      this.setState({ currentResourceIndex: nextIndex })
    }, this.longevity)
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  willEnter = () => {
    return {
      opacity: 0,
      translation: 70
    }
  };

  willLeave = () => {
    return {
      opacity: spring(1),
      translation: spring(0, presets.stiff)
    }
  };

  render() {
    const { currentResourceIndex } = this.state;
    return (
      <div className="buffer">
        <h2 style={{ fontSize: '1.5em', letterSpacing: '0.05em' }}>yieldboon</h2>
        <div style={{ fontSize: '0.8em', color: '#7795f8' }}>
          <TransitionMotion
            willEnter={this.willEnter}
            willLeave={this.willLeave}
            styles={[{ key: currentResourceIndex, style: { opacity: spring(1), translation: spring(0, presets.stiff) } }]}>
            {(interpolatedStyles) => (
              <div>
                loading{' '}
                {interpolatedStyles.map(({ key, style: { opacity, translation } }) => (
                  <div
                    key={key}
                    style={{
                      opacity,
                      transform: `translateY(${translation}px)`,
                      display: 'block',
                      padding: '10px',
                      fontWeight: '600' 
                    }}>
                    {this.resources[currentResourceIndex]}
                  </div>
                ))}
              </div>
            )}
          </TransitionMotion>
        </div>
      </div>
    )
  }
}
