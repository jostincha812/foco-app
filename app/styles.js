import { StyleSheet} from 'react-native'

// http://www.flatuicolorpicker.com/

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 22,
    fontWeight: "600"
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "200"
  },
  tabTitle: {
    color: "#AAA",
    height: 0
  },
  tabTitleSelected: {
    color: "#D35400",
  }

});

const theme = {
  PRIMARY: "#D35400",     // orange - burnt orange
  ACCENT: "#3A539B",      // blue - chambray
  NAVBG: "#EEEEEE",       // gray - gallery
  INACTIVE: "#AAA",
}

export {
  theme,
}
