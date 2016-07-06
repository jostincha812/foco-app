import { connect } from 'react-redux';

import C from '../constants';
import StudyTab from '../components/StudyTab';
import { push, pop } from '../actions/NavigationActions';
import { selectSection } from '../actions/StudyTabActions';

function mapStateToProps(state) {
  return {
    navigation: state.get(C.S_STUDYTAB_NAV),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, stateProps, dispatchProps, {
    pushRoute: (route,data) => {
      dispatchProps.dispatch(Object.assign(push(route), {
        scope: stateProps.navigation.key,
        title: data.title,
        data: data,
      }));
    },
    popRoute: () => {
      dispatchProps.dispatch(Object.assign(pop(), {
        scope: stateProps.navigation.key,
      }));
    },
	});
})(StudyTab);
