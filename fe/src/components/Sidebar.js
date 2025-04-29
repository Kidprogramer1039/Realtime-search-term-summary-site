import Ranking from './Ranking';
import BoardList from './BoardList';

const Sidebar = () => (
  <aside style={{ width: '250px', padding: '1rem', borderRight: '1px solid #ccc' }}>
    <Ranking />
    <BoardList />
  </aside>
);

export default Sidebar;
