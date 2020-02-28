import React from 'react';
import ContextMenu, { Position } from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import './user-panel.scss';
import axios from 'axios';
import Auth from './../../Authcontrol';
import be_conf from './../../be_config';

export default class UserPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName : ''
    };




  }
  componentDidMount() {
    var int = this;
    axios.post(be_conf.server + '/userinfo',{},{ headers: { "Authorization": 'Bearer ' + Auth.getToken() } })
    .then(function (response) {
      // alert(JSON.stringify(response));
      int.setState({
        userName: response.data.data.name
      });
    })


  }
  render() {
    const { menuMode, menuItems } = this.props;
    return (
      <div className={'user-panel'}>
        <div className={'user-info'}>
          <div className={'image-container'}>
            <div className={'user-image'} />
          </div>
    <div className={'user-name'}>{this.state.userName}</div>
        </div>

        {menuMode === 'context' && (
          <ContextMenu
            items={menuItems}
            target={'.user-button'}
            showEvent={'dxclick'}
            width={170}
            cssClass={'user-menu'}
          >
            <Position my={'top center'} at={'bottom center'} />
          </ContextMenu>
        )}
        {menuMode === 'list' && (
          <List className={'dx-toolbar-menu-action'} items={menuItems} />
        )}
      </div>
    );
  }
}
