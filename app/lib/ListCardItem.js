import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles, { sizes } from './styles'
import StyledText from './StyledText'
import StyledDivider from './StyledDivider'

export default class ListCardItem extends React.Component {
  render() {
    const props = this.props
    const theme = props.theme
    const activeOpacity = props.onPress ? 0.4 : 1
    const divider = props.divider

    return (
      <View style={props.style}>
        { divider &&
          <StyledDivider location='middle' theme={theme} />
        }
        <TouchableOpacity onPress={props.onPress} activeOpacity={activeOpacity}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{flex:10}}>
              { props.title &&
                <StyledText textStyle='subtitle' theme={theme} numberOfLines={1}>
                  {props.title}
                </StyledText>
              }
              { props.subtitle &&
                <StyledText textStyle='normal' theme={theme} numberOfLines={1}>
                  {props.subtitle}
                </StyledText>
              }
            </View>
            { props.onPress &&
              <Icon style={{paddingTop:2}} name='chevron-right' size={30} color={theme.color}  />
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
