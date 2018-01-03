import React from 'react'

import T from '../T'
import S from '../styles/styles'
import Icons from '../components/Icons'

export default class NavHeaderFilterToggleButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { toggled:false }
    this.onTogglePress = this.onTogglePress.bind(this)
  }
  componentDidMount() {
    if (this.props.toggled) {
      this.setState({ toggled:true })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.toggled != this.props.toggled) {
      this.setState({ toggled:nextProps.toggled })
    }
  }
  onTogglePress() {
    this.props.onPress(!this.state.toggled)
  }
  render() {
    const props = this.props
    const paddingLeft = props.left ? S.spacing.xsmall : 0
    const paddingRight = props.right ? S.spacing.xsmall : 0

    if (this.state.toggled) {
      return Icons.filter({
        size: T.icons.smallIcon,
        color: S.navigation.headerTintColor,
        style: {top:S.spacing.xsmall/2, paddingLeft, paddingRight},
        onPress: this.onTogglePress
      })
    }

    return Icons.filterOutline({
      size: T.icons.smallIcon,
      color: T.colors.inactive,
      style: {top:S.spacing.xsmall/2, paddingLeft, paddingRight},
      onPress: this.onTogglePress
    })
  }
}
