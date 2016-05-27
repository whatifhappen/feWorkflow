// import MobileTearSheet from '../../../MobileTearSheet';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment';
import Colors from 'material-ui/lib/styles/colors';
import EditorInsertChart from 'material-ui/lib/svg-icons/editor/insert-chart';
import ListBtns from './list-btns';
import { parsePath } from '../parsePath';
import { addList } from '../../action/list';
import { connect } from 'react-redux';


const ListFolder = ({lists, addList}) => (
  <div className="list-folder">
    <List Subheader="Folders" >
      {
        lists.map((list, index) => (
          <ListItem
            key={index}
            leftAvatar={<Avatar icon={<FileFolder />} />}
            primaryText={list.get('name')}
            secondaryText={list.get('location')}
            rightIconButton={ <ListBtns className="btn-group btn-group__right" /> }
          />
        ))
      }
    </List>
    <Divider inset={true} />
  </div>
);

function mapStateToProps(states) {
  return {
    lists: states.lists
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addList: (index, name, location) => dispatch(addList(index, name, location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFolder);
