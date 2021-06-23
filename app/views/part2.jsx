const React = require('react');

/**
 * A React Component, that should working but it's not
 */
module.exports = class IndexPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }
  render() {
    return (
      <React.Fragment>
        <h1>Test react {this.state.page}</h1>
        <button onClick={this.setState({ page: this.state.page + 1 })}>
          click me
        </button>
      </React.Fragment>
    );
  }
};
