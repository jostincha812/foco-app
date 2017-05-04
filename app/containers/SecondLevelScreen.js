import React from 'react'
import { ScrollView, TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'

import FlipCard from 'react-native-flip-card'

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

        <FlipCard
          style={{margin:40, padding:30, alignSelf:'center'}}
          friction={10}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          flip={false}
          clickable={true}
          alignHeight={true}
          alignWidth={true}
          onFlipped={(isFlipped)=>{console.log('isFlipped', isFlipped)}}
        >
          {/* Face Side */}
          <View style={{width:200}}>
            <Text>Wider front side</Text>
          </View>
          {/* Back Side */}
          <View style={{height:300}}>
            <Text>Taller back side</Text>
          </View>
        </FlipCard>

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
