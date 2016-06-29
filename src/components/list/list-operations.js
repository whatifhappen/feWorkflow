import { deleteList } from '../../action/list';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ContentLink from 'material-ui/svg-icons/content/link';
import { connect } from 'react-redux';
import { shell } from 'electron';

const iconButtonStyle = {
  padding: '5px',
  width: '38px',
  height: '38px'
};

const getCurrentIcon = (name) => {
  switch (name) {
    case 'folder':
      return <FileFolder color="#ECEFF1" hoverColor="#78909C"/>;
    case 'link':
      return <ContentLink color="#ECEFF1" hoverColor="#78909C" />;
    case 'delete':
      return <ActionDelete color="#ECEFF1" hoverColor="#78909C" />;
    default:
      return false;
  }
};

const ListOperations = ({ id, location, url, btns, deleteList }) => (
  <div className="list-operation">
    {
      btns.map((btn, i) => (
        <IconButton
          className="icon-btn"
          style={iconButtonStyle}
          tooltip={btn.get('desc')}
          tooltipPosition="top-center"
          key={i}
          onClick={() => {
            switch (btn.get('name')) {
              case 'delete':
                return deleteList(id);
              case 'openUrl':
                return shell.openExternal(url || 'about:blank');
              case 'openFolder':
                return shell.showItemInFolder(location);
              default:
                return false;
            }
          }}
        >
          {getCurrentIcon(btn.get('icon'))}
        </IconButton>
      ))
    }

  </div>
);

const mapDispatchToProps = (dispatch) => ({
  deleteList: id => dispatch(deleteList(id))
});

export default connect('', mapDispatchToProps)(ListOperations);
