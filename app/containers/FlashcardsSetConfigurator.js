import React from 'react'
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import Icons from '../components/Icons'

import api from '../data/api'

import tags from '../lib/tags'
import PillsList from '../lib/PillsList'
import LoadingIndicator from '../lib/LoadingIndicator'

class FlashcardsSetConfigurator extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: L.configureset,
    headerLeft: (
      <TouchableOpacity
        style={{top:S.spacing.xsmall/2, paddingLeft: S.spacing.small}}
        onPress={() => navigation.goBack() }>
        {Icons.back({color: S.navigation.headerTintColor})}
      </TouchableOpacity>
    ),
  })

  constructor(props) {
    super(props)
    this.state = { selected:[] }
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle(tagState) {
    const tag = tagState.tag
    const selected = tagState.val
    if (selected) {
      this.state.selected.push(tag)
    } else {
      this.state.selected.splice(this.state.selected.indexOf(tag),1)
    }
    console.log(this.state.selected)
  }

  render() {
    const items = []
    Object.keys(tags.regions).map(key => {
      items.push(tags.regions[key])
    })

    return (
      <View style={S.containers.screen}>
        <StatusBar barStyle={S.statusBarStyle} />
        <ScrollView contentContinerStyle={S.containers.flexRowWrapped}>
          <View style={[S.containers.hero, {paddingBottom:S.spacing.xsmall}]}>
            <Text style={S.text.hero}>{L.regions}</Text>
            <PillsList
              items={items}
              onToggle={this.onToggle}
              largePills={true}
              textColor={T.colors.inverseText}
              pillColor={T.colors.active}
              pillBorderColor={T.colors.active}
              disabledPillColor={T.colors.disabled}
              disabledTextColor={T.colors.inactiveText}
            />
          </View>
        </ScrollView>
        <Button
          title={L.next}
          buttonStyle={{marginLeft:0, width:'100%'}}
          raised={true}
          icon={{name:'chevron-right'}}
          iconRight={true}
          backgroundColor={T.colors.yes}
          // onPress={() => this.onYesNoAction({type:C.ACTION_YES})}
        />
      </View>
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
)(FlashcardsSetConfigurator)
