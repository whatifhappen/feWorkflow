import { List, ListItem } from 'material-ui/List';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Subheader from 'material-ui/Subheader';
import Colors from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
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
            className="list-item"
            key={index}
            leftAvatar={<Avatar icon={<FileFolder />} />}
            primaryText={list.get('name')}
            secondaryText={list.get('location')}
            rightIconButton={
              <ListBtns
                btns={list.get('btns')}
                listId={list.get('id')}
                listLocation={list.get('location')}
                snackbar={list.get('snackbar')}
                className="btn-group btn-group__right"
              />
            }
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
