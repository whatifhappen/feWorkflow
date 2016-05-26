import ListFolder from './list/list';

const Container = ({name, loc}) => (
  <div>
    <ListFolder
      name={name}
      loc={loc}
    />
  </div>
);

export default Container;
