import React, { PureComponent } from 'react';

export default class Loader extends PureComponent {
  render() {
    return (
      <div className="buffer load">
        <span style={{ color: '#bdccfc', fontSize: '1.1em' }}>loading...</span>
      </div>
    )
  }
}
