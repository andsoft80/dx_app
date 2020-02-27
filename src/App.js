import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import appInfo from './app-info';
import { navigation } from './app-navigation';
import routes from './app-routes';
import './App.scss';
import be_conf from './be_config';
import axios from 'axios';

import './dx-styles.scss';
import { Footer, LoginForm } from './components';
import {
  SideNavOuterToolbar as SideNavBarLayout,
  SingleCard
} from './layouts';
import { sizes, subscribe, unsubscribe } from './utils/media-query';

const LoginContainer = ({ logIn }) => <LoginForm onLoginClick={logIn} />;

const NotAuthPage = (props) => (
  <SingleCard>
    <Route render={() => <LoginContainer {...props} />} />
  </SingleCard>
);

const AuthPage = (props) => (
  <SideNavBarLayout menuItems={navigation} title={appInfo.title} {...props}>
    <Switch>
      {routes.map(item => (
        <Route
          exact
          key={item.path}
          path={item.path}
          component={item.component}
        />
      ))}
      <Redirect to={'/home'} />
    </Switch>
    <Footer>
      Copyright © 2011-2020 Developer Express Inc.
      <br />
      All trademarks or registered trademarks are property of their
      respective owners.
    </Footer>
  </SideNavBarLayout>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      screenSizeClass: this.getScreenSizeClass()
    };

    this.userMenuItems = [
      {
        text: 'Profile',
        icon: 'user'
      },
      {
        text: 'Logout',
        icon: 'runner',
        onClick: this.logOut
      }
    ];
  }

  componentDidMount() {
    subscribe(this.screenSizeChanged);
  }

  componentWillUnmount() {
    unsubscribe(this.screenSizeChanged);
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <div className={`app ${this.state.screenSizeClass}`}>
        <Router>{loggedIn ? <AuthPage userMenuItems={this.userMenuItems} /> : <NotAuthPage logIn={this.logIn} />}</Router>
      </div>
    );
  }

  getScreenSizeClass() {
    const screenSizes = sizes();
    return Object.keys(screenSizes).filter(cl => screenSizes[cl]).join(' ');
  }

  screenSizeChanged = () => {
    this.setState({
      screenSizeClass: this.getScreenSizeClass()
    });
  }



  logIn = (email,password) => {
    var int = this;
    axios.post(be_conf.server + '/signin', {
      email: email,
      password: password
    })
    .then(function (response) {
      // alert(response.data);
      if(response.data==='fail'){
        alert('Login fail!');

      }
      else if(response.data.indexOf('err')>-1){
        alert(JSON.stringify(response.data));
      }
      else{

        var token = response.data;
        int.setState({ loggedIn: true });
        
      }
    })
    .catch(function (error) {
      
      alert(JSON.stringify(error));
    });
    
    
    
    
  };

  logOut = () => {
    this.setState({ loggedIn: false });
  };
}

export default App;
