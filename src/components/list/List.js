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


const ListFolder = ({name, loc}) => (
  <div>
    <List Subheader="Folders" >
      <ListItem
        leftAvatar={<Avatar icon={<FileFolder />} />}
        primaryText={name}
        secondaryText={loc}
        rightIconButton={ <ListBtns className="btn-group btn-group__right" /> }
      />
    </List>
    <Divider inset={true} />
  </div>
);

export default ListFolder;
