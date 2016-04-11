import React form 'react';

class HellowWorld extends React.Component {
  render () {
    return <h1>hello from {this.props.phrase}!</h1>
  }
}

export default HellowWorld;