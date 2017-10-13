import React from 'react';
import ReactDOM from 'react-dom';
import './_heroContainer.scss';
import {Button, Image} from 'react-bootstrap';
import assetPicture from '../../assets/mountains.jpg';
import scrollToComponent from 'react-scroll-to-component';


class Hero extends React.Component {
  constructor(props){
    super(props);
    this.state = { 

    };
  }

  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this.refs.hello);
    if (elem) {
      elem.scrollIntoView(false);
    }
  }
 
  
  render() {
    return (
      <section>
        <div className='hero'>
          <Image ref='hello' className='uploadedImages' src={assetPicture} responsive />
          <div className="bar"></div>
        </div>
      </section>
    );
  }
}


export default Hero;