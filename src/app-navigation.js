import locale from './locale'
import Lang from './Langcontrol'
export const navigation = [
  {
    text: locale.Home[Lang.getLang()],
    path: '/home',
    icon: 'home'
  },
  {
    text: locale.Directories[Lang.getLang()],
    icon: 'folder',
    items: [
      // {
      //   text: 'Profile',
      //   path: '/profile'
      // },
      {
        text: locale.Employee[Lang.getLang()],
        path: '/display-data'
      }
    ]
  }
  ];
