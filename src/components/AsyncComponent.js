import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class AsyncComponent extends PureComponent {
  static propTypes = {
    loader: PropTypes.func.isRequired,
    renderPlaceholder: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      Component: null
    }
  }

  componentDidMount() {
    this.props.loader().then(Component => this.setState({ Component }));
  }

  render() {
    const { Component } = this.state;
    const { renderPlaceholder, ...rest } = this.props;
    return (
      Component
        ? <Component {...rest} />
        : renderPlaceholder()
    )
  }
}
