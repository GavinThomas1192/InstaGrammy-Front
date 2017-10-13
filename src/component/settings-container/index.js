import React from 'react';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils';
import ProfileForm from '../profile-form';
import ProfileItem from '../profile-item';
import {Button} from 'react-bootstrap';
import {profileFetchRequest, profileCreateRequest, profileUpdateRequest} from '../../action/profile-actions';


class SettingsContainer extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      editProfile: false,
      username: '',
      bio: '',
    };
    this.handleToggle = this.handleToggle.bind(this);
  }


  componentWillMount() {
    if(!this.props.profile) this.props.profileFetch()
      .then(() => console.log('********componentWillMount******', this.props));

  }

  
  handleToggle(){
    this.setState({editProfile: !this.state.editProfile});
  }

  render() {
    return (
      <div className="settings-container">
        {utils.renderIf(this.props.auth && !this.props.profile, 
          <div className="profile-form-container">
            <h2>Create your profile!</h2>
            <ProfileForm 
              buttonText="Create"
              onComplete={this.props.profileCreate}/>
          </div>
        )}

        {utils.renderIf(this.props.auth && this.props.profile, 
          <ProfileItem />
        )}
      </div>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

let mapDispatchToProps = dispatch => ({
  profileCreate: profile => dispatch(profileCreateRequest(profile)),
  profileFetch: () => dispatch(profileFetchRequest()),
  profileUpdate: profile => dispatch(profileUpdateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);