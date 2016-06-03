import ListFolder from './list/list';
import Dropzone from './layout/dropzone';
import AddListBtn from './list/add-list-btn';
import ContainerFt from './layout/container-ft';
import { connect } from 'react-redux';

const Container = ({container, lists, ondragover, ondrop, ondragleave}) => {
    if (!lists.size) {
      console.log('there\'s no list')
      return (
        <div>
          <Dropzone />
          <containerFt />
        </div>
      )
    } else {
      return (
        <div className="container-bd">

          <ListFolder />

          {/*<Dropzone />*/}
          <ContainerFt />
        </div>
      )
    }

};

function mapStateToProps(states) {
  return {
    container: states.container,
    lists: states.lists
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onDragover: () => dispatch(onDragover()),
    onDragleave: () => dispatch(onDragleave()),
    onDrop: () => dispatch(onDrop())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
