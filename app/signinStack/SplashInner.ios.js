import React from 'react'
import LoadingIndicator from '../components/LoadingIndicator'

const SplashInner = (props) => {
  return (
    <LoadingIndicator style={props.style} large={true} inverse={true} />
  )
}
Object.freeze(SplashInner)
export default SplashInner
