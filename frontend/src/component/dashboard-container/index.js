import React from 'react';
import {connect} from 'react-redux';
import './_dashboard.scss';
import {Grid, Row, Col, Jumbotron, Button, Modal} from 'react-bootstrap';
import * as utils from '../../lib/utils';
import PhotoForm from '../photo-form';
import PhotoItem from '../photo-item';
import {photosFetchRequest, photoCreateRequest} from '../../action/photo-actions.js';
import {profileFetchRequest} from '../../action/profile-actions.js';

class DashboardContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      start: false,
      showModal: false,
    };
    this.toggleFormStart = this.toggleFormStart.bind(this);
    this.close = this.close.bind(this);
  }
  componentDidMount(){
    this.props.photoFetch()
      .then(() => console.log(this.props, '***Props after didMountFetch'));
    // this.props.profileFetch();
  }

  
  componentWillMount() {
    this.props.auth ? undefined : this.props.history.replace('/');
  }

  toggleFormStart(){
    this.setState({showModal: !this.state.showModal});
  }

  close() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <div className='jumbo'>
        <Jumbotron>
          <h1>InstyGrammy</h1>
          <p>Share what you love</p>
          <p><Button bsStyle="primary" onClick={this.toggleFormStart}>Upload a Photo</Button></p>
        </Jumbotron>

        {utils.renderIf(this.state.showModal, 
          <div className="static-modal">
            <Modal show={this.state.showModal} >
              <Modal.Header>
                <Modal.Title>Upload a Photo</Modal.Title>
              </Modal.Header>
  
              <Modal.Body>
                <PhotoForm
                  buttonText='post'
                  onComplete={(photo) =>{
                    return this.props.photoCreate(photo)
                      .catch(console.error);
                  }}
                />
              </Modal.Body> 
              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer> 
            </Modal>
          </div>
          
        )}
        
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
  profileFetch: () => dispatch(profileFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);


