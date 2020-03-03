import Drawer from 'devextreme-react/drawer';
import ScrollView from 'devextreme-react/scroll-view';
import React from 'react';
import { withRouter } from 'react-router';
import { Header, SideNavigationMenu, Footer } from '../../components';
import './side-nav-outer-toolbar.scss';
import { sizes, subscribe, unsubscribe } from '../../utils/media-query';
import { Template } from 'devextreme-react/core/template';
import { menuPreInitPatch } from '../../utils/patches';
import axios from 'axios';
import Auth from './../../Authcontrol';
import Lang from './../../Langcontrol';
import be_conf from './../../be_config';
import { NavLink, Redirect, Route, Router } from "react-router-dom";
import App from './../../App'



class SideNavOuterToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpened: sizes()['screen-large'],
      temporaryMenuOpened: false,
      backgroundColor: 'white',
      change_lang : false,
      ...this.drawerConfig
    };

    this.menuPatch = menuPreInitPatch(this);
  }

  change_lang_f(lang){
    alert(lang);
    Lang.setLang(lang); this.setState({ change_lang: true})

  }
  render() {
    if (this.state.change_lang===true) {
    return <Router>{<App {...this.props}/>}</Router>;
    }

    const { menuItems, title, location, userMenuItems } = this.props;
    const {
      menuOpened,
      menuMode,
      shaderEnabled,
      menuRevealMode,
      minMenuSize
    } = this.state;

    return (
      <div className={'side-nav-outer-toolbar'} >
        <Header

          className={'layout-header'}
          menuToggleEnabled
          userMenuItems={userMenuItems}
          toggleMenu={() =>
            this.setState({ menuOpened: !this.state.menuOpened })
          }
          change_lang = {(lang)=>{this.change_lang_f(lang)}}
          title={title}
          backgroundColor={this.state.backgroundColor}

        />

        <Drawer

          className={'layout-body' + this.menuPatch.cssClass}

          position={'before'}
          closeOnOutsideClick={this.closeDrawer}
          openedStateMode={menuMode}
          revealMode={menuRevealMode}
          minSize={minMenuSize}
          maxSize={250}
          shading={shaderEnabled}
          opened={menuOpened}
          template={'menu'}
        >
          <ScrollView className={'with-footer'}>
            <div className={'content'}>
              {React.Children.map(this.props.children, item => {
                return item.type !== Footer && item;
              })}
            </div>
            <div className={'content-block'}>
              {React.Children.map(this.props.children, item => {
                return item.type === Footer && item;
              })}
            </div>
          </ScrollView>
          <Template name={'menu'}>
            <SideNavigationMenu
              items={menuItems}
              compactMode={!menuOpened}
              selectedItem={location.pathname}
              className={'dx-swatch-additional'}
              selectedItemChanged={this.navigationChanged}
              openMenu={this.navigationClick}
              onMenuReady={this.menuPatch.onReady}
            />
          </Template>
        </Drawer>
      </div>
    );
  }

  componentDidMount() {
    subscribe(this.updateDrawer);

    var int = this;
    axios.post(be_conf.server + '/userinfo', {}, { headers: { "Authorization": 'Bearer ' + Auth.getToken() } })
      .then(function (response) {
        // alert(JSON.stringify(response));
        if (response.data.data) {
          int.setState({
            backgroundColor: response.data.data.color
          });
        }
      })






  }

  componentWillUnmount() {
    unsubscribe(this.updateDrawer);
  }

  closeDrawer = () => {
    if (!this.state.shaderEnabled) {
      return false;
    }

    this.setState({ menuOpened: false });
    return true;
  }

  updateDrawer = () => {
    this.setState({ ...this.drawerConfig });
  };

  get drawerConfig() {
    const isXSmall = sizes()['screen-x-small'];
    const isLarge = sizes()['screen-large'];

    return {
      menuMode: isLarge ? 'shrink' : 'overlap',
      menuRevealMode: isXSmall ? 'slide' : 'expand',
      minMenuSize: isXSmall ? 0 : 60,
      shaderEnabled: !isLarge
    };
  }

  get hideMenuAfterNavigation() {
    const { menuMode, temporaryMenuOpened } = this.state;
    return menuMode === 'overlap' || temporaryMenuOpened;
  }

  navigationChanged = event => {
    const path = event.itemData.path;
    const pointerEvent = event.event;

    if (path && this.state.menuOpened) {
      if (event.node.selected) {
        pointerEvent.preventDefault();
      } else {
        this.props.history.push(path);
      }

      if (this.hideMenuAfterNavigation) {
        this.setState({
          menuOpened: false,
          temporaryMenuOpened: false
        });
        pointerEvent.stopPropagation();
      }
    } else {
      pointerEvent.preventDefault();
    }
  };

  navigationClick = () => {
    this.setState(({ menuOpened }) => {
      return !menuOpened
        ? {
          temporaryMenuOpened: true,
          menuOpened: true
        }
        : {};
    });
  };
}

export default withRouter(SideNavOuterToolbar);
