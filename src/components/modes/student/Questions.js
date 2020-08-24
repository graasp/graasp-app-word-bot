import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'react-chat-elements/dist/main.css';
import Question from './Question';
import { RESPONSE } from '../../../config/appInstanceResourceTypes';
import End from './End';
import { APP_INSTANCE_RESOURCE, QUESTION } from '../../../config/propTypes';

const useStyles = makeStyles((theme) => ({
  questions: {
    marginTop: theme.spacing(5),
  },
}));

export function Questions({ questions, responsesResources }) {
  const classes = useStyles();

  // get current index from number of responses
  let currentQuestionIndex = 0;
  if (responsesResources) {
    currentQuestionIndex = responsesResources.length;
  }

  if (currentQuestionIndex >= questions.length) {
    return <End />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.questions}
    >
      <Question question={currentQuestion} />
    </Grid>
  );
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(QUESTION),
  responsesResources: PropTypes.arrayOf(APP_INSTANCE_RESOURCE),
};

Questions.defaultProps = {
  questions: [],
  responsesResources: [],
};

const mapStateToProps = ({ context, appInstanceResources }) => {
  const { userId } = context;
  return {
    responsesResources: appInstanceResources.content
      .filter(({ user, type }) => {
        return user === userId && type === RESPONSE;
      })
      .map((resource) => resource.data),
  };
};

export default connect(mapStateToProps)(Questions);
