import React from 'react'
import { View, Text, ScrollView } from 'react-native'

import T from '../T'
import PillsList from '../lib/PillsList'
import { localize } from '../locales'

export default class TagsSelector extends React.Component {
  render() {
    const props = this.props
    const tags = props.tags
    const selected = props.selected
    const onToggle = props.onToggle

    const items = []
    if (tags) {
      tags.map(tag => {
        items.push({
          key: tag,
          label: localize(`tags.${tag}`),
        })
      })
    }

    return (
      <PillsList
        style={props.style}
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
