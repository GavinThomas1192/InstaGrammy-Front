import React from 'react';
import {connect} from 'react-redux';
// import './_dashboard.scss';
import {Grid, Row, Col, Jumbotron, Button, Modal} from 'react-bootstrap';
import * as utils from '../../lib/utils';
import PhotoForm from '../photo-form';
import PhotoItem from '../photo-item';
import {photosFetchRequest, photosFetchAllRequest, photoCreateRequest} from '../../action/photo-actions.js';
// import {profileFetchRequest} from '../../action/profile-actions.js';
import {tokenSet} from '../../action/auth-actions';

class GalleryContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
    this.toggleFormStart = this.toggleFormStart.bind(this);
    this.close = this.close.bind(this);
  }
  componentDidMount(){
    this.props.photoFetchAll();
  }
  
  
  componentWillMount() {
    let token = utils.cookieFetch('X-Sluggram-Token');
    if(token) this.props.tokenSet(token);
    this.props.auth ? undefined : this.props.history.replace('/home');
  }

  toggleFormStart(){
    this.setState({showModal: !this.state.showModal});
  }

  close() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Group Memories</h1>
          <p>Live their adventures</p>
        </Jumbotron> 
        
        <Row>
          {utils.renderIf(this.props.photos,
            this.props.photos.map(photo =>
              <Col sm={6} md={3} key={photo._id}>{
                <PhotoItem key={photo._id} photo={photo}
                />
              }<br/></Col>
            ))}
        </Row>
        
      </div>
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  photos: state.photos,
});

let mapDispatchToProps = dispatch => ({
  photoCreate: (photo) => dispatch(photoCreateRequest(photo)),
  photoFetch: () => dispatch(photosFetchRequest()),
  photoFetchAll: () => dispatch(photosFetchAllRequest()),
  // profileFetch: () => dispatch(profileFetchRequest()),
  tokenSet: token => dispatch(tokenSet(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);


