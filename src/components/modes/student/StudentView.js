import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import 'react-chat-elements/dist/main.css';
import Frames from './Frames';
import Start from './Start';
import { STARTED } from '../../../config/appInstanceResourceTypes';
import { APP_INSTANCE_RESOURCE, FRAME } from '../../../config/propTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 5),
    height: '100%',
    alignItems: 'flex-start',
    display: 'flex',
  },
  main: {
    padding: theme.spacing(0, 5),
    height: '100%',
    alignItems: 'flex-start',
    display: 'flex',
  },
}));

export function StudentView({ frames, active, startedResource }) {
  const { t } = useTranslation();
  const classes = useStyles();
  if (!active) {
    return (
      <div className={classes.root}>
        <Alert severity="error">
          {t('This activity is currently not active.')}
        </Alert>
      </div>
    );
  }

  if (!frames.length) {
    return (
      <div className={classes.root}>
        <Alert severity="error">{t('This activity is empty.')}</Alert>
      </div>
    );
  }

  const started = !_.isEmpty(startedResource);
  if (!started) {
    return (
      <div className={classes.root}>
        <Start />
      </div>
    );
  }

  return (
    <div className={classes.main}>
      <Frames frames={frames} />
    </div>
  );
}

StudentView.propTypes = {
  frames: PropTypes.arrayOf(FRAME),
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  startedResource: APP_INSTANCE_RESOURCE,
  active: PropTypes.bool.isRequired,
};

StudentView.defaultProps = {
  frames: [],
  startedResource: {},
};

const mapStateToProps = ({ context, appInstanceResources }) => {
  const { userId } = context;
  return {
    startedResource: appInstanceResources.content.find(({ user, type }) => {
      return user === userId && type === STARTED;
    }),
  };
};

export default connect(mapStateToProps)(StudentView);
