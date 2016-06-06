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
          <ContainerFt />
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
