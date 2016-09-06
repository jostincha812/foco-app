import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import * as firebase from 'firebase';

import C from '../constants';
import styles from '../styles';

class TourContainer extends React.Component {
  constructor(props) {
    super(props);
    this._onPressButton = this._onPressButton.bind(this);
    this.state = { email: '', password: '' };
  }

  render() {
    return (
      <View style={styles.tourContainer}>
        <TextInput
          style={[{height:40}, styles.stackedInput]}
          onChangeText={(text) => this.setState({email: text})}
          placeholder='email'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={true}
          returnKeyType='next'
          value={this.state.email}
        />
        <TextInput
          style={[{height:40}, styles.stackedInput]}
          onChangeText={(text) => this.setState({password: text})}
          placeholder='password'
          keyboardType='default'
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={false}
          selectTextOnFocus={true}
          secureTextEntry={true}
          returnKeyType='next'
          value={this.state.password}
        />
        <TouchableHighlight onPress={this._onPressButton}>
          <Text style={styles.title}>
            Sign In
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onPressButton() {
    const email = this.state.email.trim();
    const password = this.state.password;
    console.log(`email: ${email} password: ${password}`);

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`Error ${errorCode}: ${errorMessage}`);
    });
  }
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}
function mapStateToProps(state) {
	return {
		// needs to be the same key as reducers.js
		navigation: state.get(C.S_GLOBAL_NAV)
	};
}
export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, dispatchProps, stateProps, {
		onNavigate: (action) => {
			dispatchProps.dispatch(
				Object.assign(action, {
					scope: stateProps.navigation.key
				})
			);
		}
	});
})(TourContainer);
