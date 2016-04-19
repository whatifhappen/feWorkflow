import RaisedButton from 'material-ui/lib/raised-button';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';

const style = {
  margin: 4
}

class ListBtns extends React.Component {
  static propTypes = {
    primary: React.PropTypes.number,
    secondary: React.PropTypes.number
  };

  static defaultProps = {
    primary: 0,
    secondary: 0
  };

  state = {
    primary: 0,
    secondary: 0
  };


  return (
    <div className="btn-group btn-group__right">
      {
        btns.map((btn, i) => (
          <RaisedButton
            key={i}
            abel={btn}
            primary={this.state.primary}
            secondary={this.state.secondary}
            style={style}
            onClick={()=> ( this.setState({primary: 1}); console.log(`Button ${i} pressed`))}
          />
        ))
       }
    </div>
  );
}


export default ListBtns;
