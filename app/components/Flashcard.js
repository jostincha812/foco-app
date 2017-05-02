import React from 'react'
import { View } from 'react-native'
import Markdown from 'react-native-simple-markdown'

import C from '../C'
import T from '../T'
import S, { navigationStyles, spacing } from '../styles/styles'
import Icons from '../components/Icons'

export default class Flashcard extends React.Component {
  render() {
    return (
      <Markdown styles={FlashcardMdStyles}>
        #Markdown in react-native is so cool! {'\n\n'}

        You can **emphasize** what you want, or just _suggest it_ 😏…{'\n'}

        You can even [**link your website**](http://carlito.ninja) or if you prefer: [email somebody](mailto:email@somebody.com){'\n'}

        Spice it up with some GIFs 💃:

        ![Some GIF](https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif){'\n'}

        And even add a cool video 😎!{'\n'}

        [![A cool video from YT](https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg)](http://www.youtube.com/watch?v=dQw4w9WgXcQ)

        [![Another one from Vimeo](https://i.vimeocdn.com/video/399486266_640.jpg)](https://vimeo.com/57580368)
      </Markdown>
    )
  }
}

const FlashcardMdStyles = {
  heading1: {
    color: T.textColor,
    fontSize: T.titleFontSize,
    fontWeight: T.titleFontWeight,
  },
  link: {
    color: T.accentColor2,
  },
  mailTo: {
    color: T.accentColor2,
  },
  text: {
    color: T.textColor,
    // fontSize: T.fontSize,
    // fontWeight: T.fontWeight,
  },
}
