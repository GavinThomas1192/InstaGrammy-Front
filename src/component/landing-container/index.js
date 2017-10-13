import React from 'react';
import AuthForm from '../auth-form';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils';
import {Button, Modal} from 'react-bootstrap';
import {signupRequest, loginRequest} from '../../action/auth-actions';

class LandingContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: true,
    };
    this.close = this.close.bind(this);
  }
  close() {
    this.setState({ showModal: !this.state.showModal });
  }
  render() {
    let {params} = this.props.match;
    let handleComplete = params.auth === 'login' ?
      this.props.login  : 
      this.props.signup;
    
    let redirect = path => this.props.history.replace(path);


    return (
      <section>
        <div className="static-modal">
          <Modal show={this.state.showModal}>
            <Modal.Header>
              <Modal.Title>Please Log in</Modal.Title>
            </Modal.Header>
  
            <Modal.Body>
              <AuthForm 
                auth={params.auth}
                redirect={redirect}
                onComplete={handleComplete}/>

            </Modal.Body> 
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>  
          </Modal>
        </div>
      </section>
    );
  }
}

let mapStateToProps = () => ({});
let mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signupRequest(user)),
  login: user => dispatch(loginRequest(user)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
