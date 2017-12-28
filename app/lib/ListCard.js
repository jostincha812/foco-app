import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import styles, { sizes, themes, DefaultTheme } from './styles'
import Card from './Card'
import ListCardItem from './ListCardItem'
import StyledText from './StyledText'
import StyledDivider from './StyledDivider'

export default class ListCard extends Card {
  renderInner(props) {
    const theme = themes[props.theme] ? themes[props.theme] : DefaultTheme
    const headerBackground = props.backgroundColor ? 'transparent' : theme.backgroundColor
    const innerStyle = props.innerStyle ? props.innerStyle : {}
    const max = props.max ? ((props.max>5) ? 5 : props.max) : 5

    return (
      <View style={{ flex:1, justifyContent:'space-between', backgroundColor:'transparent', overflow:'hidden' }}>
        { props.title &&
          <View style={[styles.containers.header, {backgroundColor: headerBackground}]}>
            { props.subtitle &&
              <StyledText style='subtitle' theme={theme}>
                {props.subtitle.toUpperCase()}
              </StyledText>
            }
            { props.title &&
              <StyledText style='title' theme={theme}>
                {props.title}
              </StyledText>
            }
            { props.divider &&
              <StyledDivider location='bottom' theme={theme} />
            }
          </View>
        }
        {props.toggle}
        <View style={[{justifyContent:'flex-end'}, styles.containers.normal, innerStyle]}>
          { props.list &&
            props.list.slice(0,max).map((item, index) => {
              return (
                <ListCardItem
                  key={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  onPress={item.onPress}
                  divider={true}
                  theme={theme}
                />
              )
            })
          }
        </View>
      </View>
    )
  }
}
