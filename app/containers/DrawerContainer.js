import React from 'react'
import { Dimensions, ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'

import T from '../T'
import S, { spacing } from '../styles/styles'
import Icons from '../components/Icons'

class DrawerContainer extends React.Component {
  componentDidMount() {
  }

  render() {
    const props = this.props

    // need device height to pin bottom view by allowing 'children' view to flex to max size
    const {height: heightOfDeviceScreen} = Dimensions.get('window')

    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}
      >
        <View style={{height: 160, backgroundColor: T.activeColor, justifyContent:'flex-end'}}>
          <Text style={{padding: spacing.standard, fontSize: T.titleFontSize, fontWeight: T.titleFontWeight, color: T.inverseTextColor}}>
            Drawer Header
          </Text>
        </View>

        <View style={{flex: 1}}>
          {props.children}
        </View>

        <View>
          <Text style={{padding: spacing.standard, color: T.shadowColor, fontWeight: T.titleFontWeight}}>
            About FocoApp
          </Text>
        </View>
      </ScrollView>
    );
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
)(DrawerContainer)
