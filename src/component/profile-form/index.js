import React from 'react';
import * as utils from '../../lib/utils';
import './_profileForm.scss';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile ?
      {...props.profile, preview: ''} :
      {username: '', bio: '', preview: '', avatar: null};
    console.log(this.props.profile);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let {type, name} = e.target;
    if(name === 'bio') this.setState({bio: e.target.value});
    if(name === 'username') this.setState({username: e.target.value});
    if(name === 'avatar') {
      let {files} = e.target; 
      let avatar = files[0];
      this.setState({avatar});

      utils.photoToDataUrl(avatar)
        .then(preview => this.setState({preview}))
        .catch(console.error);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
  }

  render() {
    return (
      <div className='form'>
        <form 
          className="form"
          onSubmit={this.handleSubmit}>

          <img src={this.state.preview} style={{'width': '25%'}}/><br/>
          <input 
            type="file"
            name="avatar"
            onChange={this.handleChange}/><br/>

          <input
            type="text"
            name="username"
            onChange={this.handleChange}/><br/> 

          <textarea 
            name="bio" 
            cols="30" 
            rows="5"
            value={this.state.bio}
            onChange={this.handleChange}>
          </textarea><br/>

          <button type="submit">{this.props.buttonText}</button>
        </form>
      </div>
    );
  }
}

export default ProfileForm;