import React from 'React';
import { Provider } from 'react-redux';

import configureStore from './app/store';
import App from './app/app';

const store = configureStore();

export default class FocoApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
