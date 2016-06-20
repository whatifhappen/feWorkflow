import ListFolder from './list/list';
import Dropzone from './layout/dropzone';
import ContainerEmpty from './container-empty';
import ContainerFt from './layout/container-ft';
import Setting from './layout/setting';
import Aside from './layout/aside';
import { connect } from 'react-redux';

const Container = ({ lists }) => (
  <div className="container">
    <div className="container-bd">
      {lists.size ? <ListFolder /> : <ContainerEmpty />}
      <Dropzone />
    </div>
    <Setting />
    <ContainerFt />
    <Aside />
  </div>
);

const mapStateToProps = (states) => ({
  lists: states.lists
});

export default connect(mapStateToProps)(Container);
