import React from 'react';

class CardItem extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    initialQty: React.PropTypes.number
  };

  static defaultProps = {
    title: 'Undefined Product',
    price: 100,
    initialQty: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      qty: props.initialQty,
      total: 0
    }
  }

  componentWillMount() {
    this.recalculateTotal();
  }

  increaseQty = () => {
    this.setState(
      {
        qty: this.state.qty + 1
      },
      this.recalculateTotal
    )
  }

  decreaseQty = () => {
    let newQty = this.state.qty > 0 ? this.state.qty - 1 : 0;
    this.setState({qty: newQty}, this.recalculateTotal);
  }

  recalculateTotal () {
    this.setState({
      total: this.state.qty * this.props.price
    });
  }

  render() {
    return (
      <article className="article">
        <p>{this.state.title}</p>
        <p>{this.state.image}</p>
        <button onClick={this.increaseQty}>increase</button>
        <button onClick={this.decreaseQty}>decrease</button>
        <p>Total: ${this.state.total}</p>
      </article>

    )
  }
}

  export default CardItem;
