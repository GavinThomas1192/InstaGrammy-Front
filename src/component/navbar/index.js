import React from 'react';
import './_navbar.scss';
import * as utils from '../../lib/utils';
import {tokenSet} from '../../action/auth-actions';
import {profileFetchRequest} from '../../action/profile-actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {tokenDelete} from '../../action/auth-actions';
import { AccessAlarm, ThreeDRotation } from 'material-ui-icons';
import {stringify} from 'querystring';


class Navbar extends React.Component {
  constructor(props){
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }


  handleLogout(){
    utils.cookieDelete('X-Sluggram-Token');
    utils.clearLocalStorageToken();

  }

  // componentWillMount() {
  //   if(!this.props.profile) this.props.profileFetch()
  //     .then(() => console.log('********componentWillMount******', this.props));
  // }

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
    console.log(googleLoginUrl, '$$$$$$$');
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
                <li onClick={this.handleLogout}><Link to="/home">Logout</Link></li> 
                <li><Link to="/home">Dashboard</Link></li> 
                <li><Link to="/settings">Settings</Link></li> 
                <li><Link to="/gallery">Public Gallery</Link></li> 
              </div>
              :
              <div> 
                <li><Link to="/welcome/signup">Signup</Link></li>
                <li><a href={googleLoginUrl}>OAuth</a></li>
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
  tokenSet: token => dispatch(tokenSet(token)),
  // profileFetch: () => dispatch(profileFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
