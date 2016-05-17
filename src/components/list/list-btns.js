import RaisedButton from 'material-ui/lib/raised-button';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
// import actionListBtns from '../../action/action-list-btns';
// import spawn from 'child_process';

const spawn = require('child_process').spawn;
// const spawn = require('electron-spawn')
// import spawn from 'electron-spawn';

console.log(__dirname);
function runGulp() {
  var child = spawn('gulp')
  child.stderr.on('data', function (data) {
    console.log(data.toString())
  })
  child.stdout.on('data', function (data) {
    console.log(data.toString())
  })
}

const style = {
  margin: 4
}

class ListBtns extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    primary: false,
    secondary: false
  }

  render() {
    return (
      <div className="btn-group btn-group__right">
        {
          this.props.btns.map((btn, i) => (
            <RaisedButton
              key={i}
              label={btn}
              primary={this.state.primary}
              secondary={this.state.secondary}
              style={style}
              onClick={()=> {
                this.setState({primary: !this.state.primary});
                runGulp();
              }}
            />
          ))
         }
      </div>
    );
  }
}

export default ListBtns;
