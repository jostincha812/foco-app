import { StyleSheet } from 'react-native';
import T from '../T';

export const spacing = {
  standard: 16,
  small: 8,
  xsmall: 4,
  large: 16,
  xlarge: 32,
  none: 0,
}

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.containerBackgroundColor,
    paddingBottom: spacing.xsmall,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowWrapped: {
    flexDirection: 'row',
    flexWrap:'wrap',
    alignItems:'flex-start'
  },
});

export const navigationStyles = {
  header: {
    backTitle: null,
    titleStyle: {
      fontWeight: T.titleFontWeight,
      color: T.inverseTextColor,
    },
    style: {
      backgroundColor: T.activeColor,
    }
  },
};
