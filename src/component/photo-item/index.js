import React from 'react';
import './_photo-item.scss';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils.js';
import {Button, Grid, Col, Row, Image, Modal} from 'react-bootstrap';
import PhotoForm from '../photo-form';
import {photoDeleteRequest, photoUpdateRequest} from '../../action/photo-actions.js';
// import AWS from 'aws-sdk';

class PhotoItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      showModal: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.close = this.close.bind(this);
  }
  
  handleDelete() {
    // AWS.config.update({
    //   accessKeyId: `${__AWS_ACCESS_KEY_ID__}`,
    //   secretAccessKey: `${__AWS_SECRET_ACCESS_KEY__}`,
    //   'region': 'us-west-2',
    // });
    // let s3 = new AWS.S3();
    // let params = {  Bucket: 'instygrammy', Key: `${this.props.photo.url}` };
    // s3.deleteObject(params, function(err, data) {
    //   if (err) console.log(err, err.stack);
    //   else     console.log(data);  
    // });
    return this.props.deletePhoto(this.props.photo)
      .then(console.log(this.props.photo, '*******photo'))
      .catch(console.error);
  }

  handleUpdate(photo) {
    return this.props.updatePhoto(photo)
      .then(() => {
        this.setState({showModal: !this.state.showModal});
      })
      .catch(console.error);
  }


  close() {
    this.setState({ showModal: !this.state.showModal, edit: !this.state.edit });
  }
  
  render() {
    return (
   
      <div>
        {/* {utils.renderIf(!this.state.edit , */}

        <div>
          <Image className='uploadedImages' src={this.props.photo.url} responsive />
          <p> {this.props.photo.description} </p>
          <Button bsStyle="danger" onClick={this.handleDelete}>X</Button>
          <Button bsStyle="primary" onClick={() =>this.setState({showModal: !this.state.showModal, edit: !this.state.edit})}>Edit</Button>
        </div>

        {/* )} */}

        {utils.renderIf(this.state.edit,
          <div className="static-modal">
            <Modal show={this.state.showModal}>
              <Modal.Header>
                <Modal.Title>Update Your Photo</Modal.Title>
              </Modal.Header>
  
              <Modal.Body>
                <PhotoForm
                  hideUploadForm={'hideUploadForm'}
                  photo={this.props.photo}
                  buttonText='update'
                  onComplete={this.handleUpdate}
                />

              </Modal.Body> 
              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer>  
            </Modal>
          </div>
         
        )}
      </div> 

    );
  }
}

let mapStateToProps = () => ({});

let mapDispatchToProps = (dispatch) => ({
  deletePhoto: (photo) => dispatch(photoDeleteRequest(photo)),
  updatePhoto: (photo) => dispatch(photoUpdateRequest(photo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoItem);
