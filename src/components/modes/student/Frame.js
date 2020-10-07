import React from 'react';
import { connect } from 'react-redux';
import { FRAME } from '../../../config/propTypes';
// import Exchanges from './Exchanges';

export function Frame({ frame }) {
  const { exchanges } = frame;
  return 'hello'; //<Exchanges exchanges={exchanges} />;
}

Frame.propTypes = {
  frame: FRAME.isRequired,
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Frame);
