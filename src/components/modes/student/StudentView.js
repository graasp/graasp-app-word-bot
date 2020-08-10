import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import 'react-chat-elements/dist/main.css';
import Questions from './Questions';
import Start from './Start';
import { STARTED } from '../../../config/appInstanceResourceTypes';
import { APP_INSTANCE_RESOURCE, QUESTION } from '../../../config/propTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
}));

export function StudentView({ questions, active, startedResource }) {
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

  if (!questions.length) {
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
    <div className={classes.root}>
      <Questions questions={questions} />
    </div>
  );
}

StudentView.propTypes = {
  questions: PropTypes.arrayOf(QUESTION),
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  startedResource: APP_INSTANCE_RESOURCE,
  active: PropTypes.bool.isRequired,
};

StudentView.defaultProps = {
  questions: [],
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
