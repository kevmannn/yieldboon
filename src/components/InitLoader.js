import React, { PureComponent } from 'react';

export default class InitLoader extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  render() {
    return (
      <div className="buffer">
        <h2 style={{ fontSize: '1.2em', letterSpacing: '0.02em' }}>yieldboon</h2>
        <p className="load">loading...</p>
      </div>
    )
  }
}
