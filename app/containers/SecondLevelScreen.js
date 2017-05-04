import React from 'react'
import { ScrollView, TouchableOpacity, Text, Button } from 'react-native'
import { connect } from 'react-redux'

import C from '../C'
import S, { navigationStyles, spacing } from '../styles/styles'
import Icons from '../components/Icons'

class SecondLevelScreen extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Second Screen`,
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      left: (
        <TouchableOpacity
          style={{top:spacing.xsmall/2, paddingLeft: spacing.small}}
          onPress={() => navigation.goBack() }>
          {Icons.back({tintColor: navigationStyles.header.tintColor})}
        </TouchableOpacity>
      ),
    }),
  }

  render() {
    const navigation = this.props.navigation
    const options = 'some options'

    return (
      <ScrollView style={S.container}>
        <Text>
          Second Level
        </Text>

        <Button
          style={{top:spacing.xsmall/2, paddingRight: spacing.small}}
          onPress={() => navigation.navigate(C.NAV_ABOUT_APP_ICONS) }
          title='Icons Preview'
        />

      </ScrollView>
    )
  }
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondLevelScreen)
