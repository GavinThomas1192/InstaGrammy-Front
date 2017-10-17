import React from 'react';
import './_navbar.scss';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {tokenDelete} from '../../action/auth-actions';
import { AccessAlarm, ThreeDRotation } from 'material-ui-icons';
import {stringify} from 'querystring';


class Navbar extends React.Component {
  render() {
    let googleLoginBaseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    let googleLoginQuery = stringify({
      client_id: __GOOGLE_CLIENT_ID__,
      response_type: 'code',
      redirect_uri: `${__API_URL__}/oauth/google/code`,
      scope: 'openid profile email',
      prompt: __DEBUG__ ? 'consent' : undefined,
    });

    let googleLoginUrl = `${googleLoginBaseUrl}?${googleLoginQuery}`;
    console.log(googleLoginUrl);
    return (
      <header>
        {this.props.auth && this.props.profile ? 
          <div className="profile-header">
            <h2>Welcome {this.props.profile.username}</h2>
            <img src={this.props.profile.avatar} style={{'width': '15%', 'border': '1px solid grey'}}/>
          </div>
          :
          undefined
        }
        <nav>
          <ul>
            {this.props.auth ?
              <div>
                <li onClick={this.props.tokenDelete}><Link to="/">Logout</Link></li> 
                <li><Link to="/">Dashboard</Link></li> 
                <li><Link to="/settings">Settings</Link></li> 
              </div>
              :
              <div> 
                <li><Link to="/welcome/signup">Signup</Link></li>
                <li><a href={googleLoginBaseUrl}>OAuth</a></li>
                <li><Link to="/welcome/login">Login</Link></li>
              </div>
            }
          </ul>
        </nav>
      </header >
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

let mapDispatchToProps = dispatch => ({
  tokenDelete: () => dispatch(tokenDelete()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);