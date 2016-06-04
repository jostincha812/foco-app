import { StyleSheet} from 'react-native'

// http://www.flatuicolorpicker.com/

const theme = {
  PRIMARY: "#333",
  ACCENT_1: "#D35400",     // orange - burnt orange
  ACCENT_2: "#3A539B",      // blue - chambray
  BG: "#D9D9D9",
  NAVBG: "#EEEEEE",       // gray - gallery
  NAVCOLOR: "#AAA",
  INACTIVE: "#AAA",
}

export default styles = StyleSheet.create({
  appContainer: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.NAVBG,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: theme.NAVCOLOR,
    height: 0
  },
  tabTitleSelected: {
    color: "#D35400",
  },
  tabIcon: {
    color: theme.NAVCOLOR,
    paddingBottom:1
  },
  tabIconSelected: {
    color: theme.ACCENT_1,
    paddingBottom:1
  }
});

export {
  theme,
}
