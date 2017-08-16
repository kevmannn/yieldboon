import React, { PureComponent } from 'react';

export default class Loader extends PureComponent {
  render() {
    return (
      <div className="buffer load">
        <span style={{ color: '#7795f8', fontSize: '1.2em' }}>loading...</span>
      </div>
    )
  }
}
