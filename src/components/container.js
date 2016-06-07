import ListFolder from './list/list';
import Dropzone from './layout/dropzone';
import ContainerEmpty from './container-empty';
import AddListBtn from './list/add-list-btn';
import ContainerFt from './layout/container-ft';
import { connect } from 'react-redux';


const Container = ({lists}) => {
  if (!lists.size) {
    return (
      <div>
        <ContainerEmpty />
        <Dropzone />
        <ContainerFt />
      </div>
    )
  } else {
    return (
      <div className="container-bd">
        <ListFolder />
        <Dropzone />
        <ContainerFt />
      </div>
    )
  }

};

function mapStateToProps(states) {
 return {
   lists: states.lists
 }
}

export default connect(mapStateToProps)(Container);
