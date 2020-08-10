import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const QUESTION = PropTypes.shape({
  context: PropTypes.string,
  displayPhrase: PropTypes.string,
  displayPrompt: PropTypes.string,
  explanation: PropTypes.string,
  reaction: PropTypes.string,
  explanationPrompt: PropTypes.string,
  conclusion: PropTypes.string,
  correctPhrase: PropTypes.string,
  conclusionPrompt: PropTypes.string,
  outro: PropTypes.string,
});

export const APP_INSTANCE_RESOURCE = PropTypes.shape({
  type: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  appInstance: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});
