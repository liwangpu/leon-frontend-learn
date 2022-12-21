import './index.scss';
import { NavLink, Outlet } from "react-router-dom";
import { memo } from 'react';

const routes: { title: string; path: string }[] = [
  {
    title: 'Home',
    path: '/app/home',
  },
  {
    title: 'Test',
    path: '/app/test',
  }
];

const RouterLinks = routes.map(r => (
  <NavLink key={r.title} to={r.path} className={({ isActive }) => isActive ? "item actived" : "item"}>
    <p>{r.title}</p>
  </NavLink >
));

const App: React.FC = memo((props) => {

  return (
    <div className='tutorial-app'>
      <div className="navs">
        <div className="header">
          <p className='title'>学习里程</p>
        </div>
        <div className="content">
          {RouterLinks}
        </div>
      </div>
      <div className="page">
        <Outlet />
      </div>
    </div>
  );
});

export default App;