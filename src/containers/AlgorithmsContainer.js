import { connect } from 'react-redux';
import AlgorithmsPanel from 'components/AlgorithmsPanel';

import {
  createSet,
  selectSet,
  addAlgorithm,
  deleteSet,
} from '../actions/sets';

const mapStateToProps = (state) => ({
  sets: state.sets,
  selectedSet: state.selectedSet,
});

const mapDispatchToProps = (dispatch) => ({
  createSet: (name) => {
    dispatch(createSet(name));
  },

  addAlgorithm: (algorithm, set) => {
    dispatch(addAlgorithm(algorithm, set));
  },

  selectSet: (id) => {
    dispatch(selectSet(id));
  },

  deleteSet: (id) => {
    dispatch(deleteSet(id));
  },
});

const AlgorithmsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlgorithmsPanel);

export default AlgorithmsContainer;