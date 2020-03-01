import React from 'react';
import TextBox from 'devextreme-react/text-box';
import ValidationGroup from 'devextreme-react/validation-group';
import Validator, { RequiredRule } from 'devextreme-react/validator';
import Button from 'devextreme-react/button';
import CheckBox from 'devextreme-react/check-box';
import './login-form.scss';
import appInfo from '../../app-info';
import { Link } from 'react-router-dom';
import be_conf from './../../be_config';
import axios from 'axios';
import Auth from './../../Authcontrol';
import locale from './../../locale'
import Lang from './../../Langcontrol'


export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      logo: '',
      color: ''
    };
  }

  render() {
    const { login, password } = this.state;
    return (
      <div >
      <ValidationGroup >
        <div className={'login-header'} >
          {/* <div className={'title'}>{appInfo.title}</div> */}

          <img src={be_conf.server + '/logo192.png'} style={{ height: '100px' }} />

          <div>{locale.Sign_In_to_your_account[Lang.getLang()]}</div>
        </div>
        <div className={'dx-field'}>
          <TextBox
            value={login}
            onValueChanged={this.loginChanged}
            placeholder={locale.Email[Lang.getLang()]}
            width={'100%'}
            rtlEnabled={Lang.getLang()==='ar'}
          >
            <Validator>
              <RequiredRule message={'Login is required'} />
            </Validator>
          </TextBox>
        </div>
        <div className={'dx-field'}>
          <TextBox
            mode={'password'}
            value={password}
            onValueChanged={this.passwordChanged}
            placeholder={locale.Password[Lang.getLang()]}
            width={'100%'}
            rtlEnabled={Lang.getLang()==='ar'}
          >
            <Validator>
              <RequiredRule message={'Password is required'} />
            </Validator>
          </TextBox>
        </div>
        <div className={'dx-field'}>
          <CheckBox defaultValue={false} text={locale.Remember_me[Lang.getLang()]} />
        </div>
        <div className={'dx-field'}>
          <Button
            type={'default'}
            text={locale.Login[Lang.getLang()]}
            onClick={this.onLoginClick}
            width={'100%'}
          />
        </div>
        {/* <div className={'dx-field'}>
          <Link to={'/recovery'} onClick={e => e.preventDefault()}>Forgot password ?</Link>
        </div> */}
        {/* <div className={'dx-field'}>
          <Button type={'normal'} text={'Create an account'} width={'100%'} />
        </div> */}
      </ValidationGroup>
      </div>
    );
  }

  componentDidMount() {
    var int = this;
    axios.post(be_conf.server + '/userinfo', {}, { headers: { "Authorization": 'Bearer ' + Auth.getToken() } })
      .then(function (response) {
        // alert(JSON.stringify(response));
        if (response.data) {
          int.setState({
            logo: response.data.data.logo
          });
        }
      })


  }

  loginChanged = e => {
    this.setState({ login: e.value });
  };

  passwordChanged = e => {
    this.setState({ password: e.value });
  };

  onLoginClick = args => {
    if (!args.validationGroup.validate().isValid) {
      return;
    }

    const { login, password } = this.state;
    this.props.onLoginClick(login, password);

    args.validationGroup.reset();
  };
}
