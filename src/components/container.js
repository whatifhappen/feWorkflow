import ListFolder from './list/list';
import Dropzone from './layout/dropzone';
import AddListBtn from './list/add-list-btn';
import ContainerFt from './layout/container-ft';
import { connect } from 'react-redux';

const Container = ({items, ondragover, ondrop, ondragleave}) => (
  <div
    className="container-bd"
    ondragover={() => {
      console.log('this', this);
      ondragover();
    }}
    ondrop={ondrop}
    ondragleave={ondragleave}
  >
    <ListFolder />
    {/*<Dropzone />*/}
    <ContainerFt />
  </div>
);

function mapStateToProps(states) {
  return {
    items: states.container
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onDragover: () => { dispatch(onDragover()) },
    onDragleave: () => { dispatch(onDragleave()) },
    onDrop: () => { dispatch(onDrop()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
