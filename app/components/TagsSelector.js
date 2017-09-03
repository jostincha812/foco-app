import React from 'react'
import { View, Text, ScrollView } from 'react-native'

import T from '../T'
import PillsList from '../lib/PillsList'

export default class TagsSelector extends React.Component {
  render() {
    const props = this.props
    const items = props.items
    const selected = props.selected
    const onToggle = props.onToggle

    return (
      <PillsList
        items={items}
        selected={selected}
        onToggle={onToggle}
        largePills={true}
        textColor={T.colors.inverseText}
        pillColor={T.colors.active}
        pillBorderColor={T.colors.active}
        disabledPillColor={T.colors.disabled}
        disabledTextColor={T.colors.inactiveText}
      />
    )
  }
}
