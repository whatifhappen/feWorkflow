import React from 'react';
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

const ListFolder = ({name, loc}) => (
  <div>
    <List Subheader="Folders" >
      <ListItem
        leftAvatar={<Avatar icon={<FileFolder />} />}
        rightIcon={<NavigationChevronRight />}
        primaryText={name}
        secondaryText={loc}
      />
    </List>
    <Divider inset={true} />
  </div>
);

export default ListFolder;