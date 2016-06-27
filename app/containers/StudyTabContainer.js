import { connect } from 'react-redux';
import StudyTab from '../components/StudyTab';
import { push, pop } from '../actions/NavigationActions';

function mapStateToProps(state) {
  return {
    navigation: state.get('studyTab'),
    dataSource: state.get('studyTab').dataSource,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    pushRoute: route => dispatch(push(route)),
    popRoute: () => dispatch(pop()),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudyTab);
