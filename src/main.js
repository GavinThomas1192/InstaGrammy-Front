import React from 'react';
import ReactDom from 'react-dom';
import App from './component/app';
import {Provider} from 'react-redux';
import appCreateStore from './lib/app-create-store';
import * as utils from './lib/utils';

let store = appCreateStore();

class AppContainer extends React.Component {
  componentDidMount() {
    let token = utils.cookieFetch('X-Sluggram-Token');
    if(token) this.props.tokenSet(token);
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById('root'));

