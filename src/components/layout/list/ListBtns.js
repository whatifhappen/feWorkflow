import RaisedButton from 'material-ui/lib/raised-button';

const style = {
  margin: 12
}



const ListBtns = ({btns}) => (
  <div className="btn-group">
    {
      btns.map((btn, i) => {
        <RaisedButton key={i} label={btn} primary={false} secondary={false}  onClick={()=>alert(`Button ${i} pressed`)}/>
      })
    }
  </div>
);


export default ListBtns;
