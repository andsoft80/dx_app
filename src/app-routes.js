import { HomePage, DisplayDataPage, ProfilePage } from './pages';
import App from './App';

export default [
  {
    path: '/display-data',
    component: DisplayDataPage
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/home',
    component: HomePage
  }

  ];
