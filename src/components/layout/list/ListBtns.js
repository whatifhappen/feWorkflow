import RaisedButton from 'material-ui/lib/raised-button';

const style = {
  margin: 12
}



const ListBtns = ({btns}) => (
  <div className="btn-group">
    {
      btns.forEach((btn, i) => {
        console.log('btn， i', btn, i);
        <RaisedButton label="default" primary={false} secondary={false}  onClick={()=>alert(`Button ${i} pressed`)}/>
      })
    }
  </div>
);


export default ListBtns;
