import PropTypes from 'prop-types';

export const FRAME = PropTypes.shape({
  exchanges: [],
});

export const BOT = PropTypes.shape({
  name: PropTypes.string,
  avatar: PropTypes.string,
});

export const EXCHANGE = PropTypes.shape({
  messages: PropTypes.arrayOf(PropTypes.string),
  buttons: PropTypes.arrayOf(PropTypes.string),
  allowTextInput: PropTypes.bool,
});

export const APP_INSTANCE_RESOURCE = PropTypes.shape({
  type: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  appInstance: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});
