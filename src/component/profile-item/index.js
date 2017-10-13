import React from 'react';
import {Jumbotron, Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils';
import ProfileForm from '../profile-form';
import {profileFetchRequest, profileCreateRequest, profileUpdateRequest} from '../../action/profile-actions';


class ProfileItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editProfile: false,
      showModal: false,
    };
    this.toggleFormStart = this.toggleFormStart.bind(this);
    this.close = this.close.bind(this);
  }

  toggleFormStart() {
    this.setState({editProfile: !this.state.editProfile, showModal: !this.state.showModal});
  }

  close() {
    this.setState({ showModal: !this.state.showModal, edit: !this.state.edit, editProfile: !this.state.editProfile });
  }
  render() {
    return(
      <div>
        <Jumbotron>
          <h3>{this.props.profile.username}</h3>
          <h4>{this.props.profile.bio}</h4>
          <Button bsStyle="primary" onClick={this.toggleFormStart}>Edit Profile</Button>
        </Jumbotron>
        <div>
          {utils.renderIf(this.state.editProfile,
            <div className="static-modal">
              <Modal show={this.state.showModal}>
                <Modal.Header>
                  <Modal.Title>Update Your Profile</Modal.Title>
                </Modal.Header>
  
                <Modal.Body>
                  <ProfileForm
                    buttonText="Update"
                    onComplete={this.props.profileUpdate}
                    profile={this.props.profile} />

                </Modal.Body>  
                <Modal.Footer>
                  <Button onClick={this.close}>Close</Button>
                </Modal.Footer> 
              </Modal>
            </div>
          )}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
});
let mapDispatchToProps = dispatch => ({
  profileUpdate: profile => dispatch(profileUpdateRequest(profile)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem);