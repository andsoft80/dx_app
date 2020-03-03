import React from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import UserPanel from '../user-panel/user-panel';
import './header.scss';
import { Template } from 'devextreme-react/core/template';
import Lang from './../../Langcontrol';

import ReactDOM from 'react-dom';
import App from './../../App';
import { useHistory } from "react-router"


// function ch_lang(lang) {
//   let history = useHistory();
//   Lang.setLang(lang);
//   history.push("/home");
//   // window.location.reload();

 

// }

export default ({ menuToggleEnabled, title, toggleMenu, userMenuItems, backgroundColor,change_lang }) => {

let history = useHistory();
function ch_lang(lang) {
 
  Lang.setLang(lang);
  // history.push("/");
   window.location.reload();

}

return (

  <header className={'header-component'} >
    <Toolbar className={'header-toolbar'} style={{ backgroundColor: backgroundColor }}>
      <Item
        visible={menuToggleEnabled}
        location={'before'}
        widget={'dxButton'}
        cssClass={'menu-button'}
      >
        <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
      </Item>
      <Item
        location={'before'}
        cssClass={'header-title'}
        text={title}
        visible={!!title}
      />

      <Item
        location={'after'}
        locateInMenu={'auto'}
        menuItemTemplate={'userPanelTemplate'}
      >
        <Button
          className={'user-button authorization'}
          width={170}
          height={'100%'}
          stylingMode={'text'}
        >
          <UserPanel menuItems={userMenuItems} menuMode={'context'} />
        </Button>
      </Item>

      <Template name={'userPanelTemplate'}>
        <UserPanel menuItems={userMenuItems} menuMode={'list'} />
      </Template>
      <Item
         location={'after'}
        // locateInMenu={'auto'}
        menuItemTemplate={'userPanelTemplate'}
      >
        
        <Button

          width={30}
          height={30}
          stylingMode={'text'}
          style={{ paddingTop: 10 }}
          onClick={() => ch_lang('en')}
           //onClick={()=>change_lang('en')}

        >
          en
        </Button>
      </Item>
      <Item
        location={'after'}
        // locateInMenu={'auto'}
        menuItemTemplate={'userPanelTemplate'}
      >
        
        <Button
          onClick={() => ch_lang('ar')}
           //onClick={()=>change_lang('ar')}
          width={30}
          height={30}
          stylingMode={'text'}
          style={{ paddingTop: 10 }}
        >
          ar
        </Button>

      </Item>
    </Toolbar>
  </header>
)};

