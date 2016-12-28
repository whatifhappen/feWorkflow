import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ListBtns from './list-btns';
import { connect } from 'react-redux';
import ListOperations from './list-operations';
import { toggleListHoverState } from '../../action/list';

const ListFolder = ({ lists, toggleListHoverState }) => (
  <div className="list-folder">
    <List Subheader="Folders" >
      {
        lists.map((list, index) => (
          <ListItem
            className={list.get('showOperation') ? 'list-item show-list-operation' : 'list-item'}
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
            onMouseEnter={() => toggleListHoverState(list.get('id'), true)}
            onMouseLeave={() => toggleListHoverState(list.get('id'), false)}
          >
            <ListOperations
              id={list.get('id')}
              location={list.get('location')}
              btns={list.get('operationBtns')}
            />
          </ListItem>
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
    toggleListHoverState: (id, showOperation) => dispatch(toggleListHoverState(id, showOperation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFolder);
