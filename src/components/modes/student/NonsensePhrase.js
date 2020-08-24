import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Grid, Paper, Typography, Avatar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Message from './Message';
import { postAction, postAppInstanceResource } from '../../../actions';
import { ENDED, RESPONSE } from '../../../config/appInstanceResourceTypes';
import Response from './Response';
import { CLICKED } from '../../../config/verbs';

const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(),
  },
  button: {
    margin: theme.spacing(),
  },
  paper: {
    padding: theme.spacing(5),
  },
  botAvatar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  botName: {
    marginLeft: theme.spacing(2),
  },
  spin: {
    animation: `$spin 100ms infinite linear`,
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
}));

export function NonsensePhrase({
  correctPhrase,
  displayPhrase,
  dispatchPostAppInstanceResource,
  dispatchPostAction,
  userId,
  context,
  displayPrompt,
  explanation,
  reaction,
  explanationPrompt,
  conclusion,
  conclusionPrompt,
  outro,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [displayPromptResponse, setDisplayPromptResponse] = useState();
  const [
    displayPromptResponseButtonDisabled,
    setDisplayPromptResponseButtonDisabled,
  ] = useState(false);
  const [
    explanationPromptResponseButtonDisabled,
    setExplanationPromptResponseButtonDisabled,
  ] = useState(false);
  const [explanationPromptResponse, setExplanationPromptResponse] = useState(
    false,
  );
  const [conclusionPromptResponse, setConclusionPromptResponse] = useState();
  const [
    conclusionPromptResponseButtonDisabled,
    setConclusionPromptResponseButtonDisabled,
  ] = useState(false);

  const handleDone = () => {
    dispatchPostAppInstanceResource({
      data: {
        displayPhrase,
        correctPhrase,
        displayPromptResponse,
        explanationPromptResponse,
        conclusionPromptResponse,
      },
      type: RESPONSE,
      userId,
    });
    dispatchPostAppInstanceResource({
      userId,
      type: ENDED,
    });
  };

  const handleDisplayPromptResponse = (response) => {
    setStep(2);
    setDisplayPromptResponse(response);
    setDisplayPromptResponseButtonDisabled(true);
    dispatchPostAction({
      verb: CLICKED,
      data: {
        key: 'displayPromptResponse',
        value: response,
      },
    });
  };

  const handleExplanationPromptResponse = (response) => {
    setStep(3);
    setExplanationPromptResponse(response);
    setExplanationPromptResponseButtonDisabled(true);
    dispatchPostAction({
      verb: CLICKED,
      data: {
        key: 'explanationPromptResponse',
        value: response,
      },
    });
  };

  const handleConclusionPromptResponse = (response) => {
    setStep(4);
    setConclusionPromptResponse(response);
    setConclusionPromptResponseButtonDisabled(true);
    dispatchPostAction({
      verb: CLICKED,
      data: {
        key: 'conclusionPromptResponse',
        value: response,
      },
    });
  };

  return (
    <>
      <div className={classes.botAvatar}>
        <Avatar>W</Avatar>
        <Typography variant="h5" className={classes.botName}>
          WordBot
        </Typography>
      </div>
      <Grid item xs={12} className={classes.main}>
        <Paper className={classes.paper}>
          <Message text={context} position="left" typing typingDelay={3000} />
          <Message
            text={<em>{`"${displayPhrase}"`}</em>}
            position="left"
            hidden
            hiddenDelay={3000}
            typing
            typingDelay={5000}
          />
          <Message
            text={displayPrompt}
            position="left"
            hidden
            hiddenDelay={8000}
            typing
            typingDelay={2000}
          />
          {step >= 2 && (
            <>
              <Message text={displayPromptResponse} position="right" />
              <Message
                text={explanation}
                position="left"
                typing
                typingDelay={3000}
              />
              {reaction && (
                <Message
                  text={<Typography variant="h2">{reaction}</Typography>}
                  position="left"
                  hidden
                  hiddenDelay={3000}
                  typing
                  typingDelay={1000}
                />
              )}
              <Message
                text={explanationPrompt}
                position="left"
                hidden
                hiddenDelay={4000}
                typing
                typingDelay={3000}
              />
            </>
          )}
          {step >= 3 && (
            <>
              <Message text={explanationPromptResponse} position="right" />
              <Message
                text={conclusion}
                position="left"
                typing
                typingDelay={5000}
              />
              <Message
                text={<em>{`"${correctPhrase}"`}</em>}
                position="left"
                hidden
                hiddenDelay={5000}
                typing
                typingDelay={5000}
              />
              <Message
                text={conclusionPrompt}
                position="left"
                hidden
                hiddenDelay={10000}
                typing
                typingDelay={2000}
              />
            </>
          )}
          {step >= 4 && (
            <>
              <Message text={conclusionPromptResponse} position="right" />
              <Message text={outro} position="left" typing typingDelay={3000} />
            </>
          )}
        </Paper>
      </Grid>
      {step === 1 && (
        <Response delay={10} hidden>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            disabled={displayPromptResponseButtonDisabled}
            onClick={() => handleDisplayPromptResponse('Yes')}
          >
            {t('Yes')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            disabled={displayPromptResponseButtonDisabled}
            onClick={
              () => handleDisplayPromptResponse('No')
              // eslint-disable-next-line react/jsx-curly-newline
            }
          >
            {t('No')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            disabled={displayPromptResponseButtonDisabled}
            onClick={
              () => handleDisplayPromptResponse("I'm not sure.")
              // eslint-disable-next-line react/jsx-curly-newline
            }
          >
            {t('Not Sure')}
          </Button>
        </Response>
      )}
      {step === 2 && (
        <Response delay={7} hidden>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            disabled={explanationPromptResponseButtonDisabled}
            onClick={() => handleExplanationPromptResponse('Yes.')}
          >
            {t('Yes')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            disabled={explanationPromptResponseButtonDisabled}
            onClick={() => handleExplanationPromptResponse('No.')}
          >
            {t('No')}
          </Button>
          <Button
            color="primary"
            className={classes.button}
            variant="contained"
            disabled={explanationPromptResponseButtonDisabled}
            onClick={() => handleExplanationPromptResponse("I'm not sure.")}
          >
            {t('Not Sure')}
          </Button>
        </Response>
      )}
      {step === 3 && (
        <Response delay={12} hidden>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            disabled={conclusionPromptResponseButtonDisabled}
            onClick={() => handleConclusionPromptResponse('Yes.')}
          >
            {t('Yes')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            disabled={conclusionPromptResponseButtonDisabled}
            onClick={() => handleConclusionPromptResponse('No.')}
          >
            {t('No')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            disabled={conclusionPromptResponseButtonDisabled}
            onClick={() => handleConclusionPromptResponse("I'm not sure.")}
          >
            {t('Not Sure')}
          </Button>
        </Response>
      )}
      {step === 4 && (
        <Response delay={3} hidden>
          <Button color="primary" variant="contained" onClick={handleDone}>
            {t('Done')}
          </Button>
        </Response>
      )}
    </>
  );
}

NonsensePhrase.propTypes = {
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
  dispatchPostAppInstanceResource: PropTypes.func.isRequired,
  dispatchPostAction: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

NonsensePhrase.defaultProps = {
  context: '',
  displayPhrase: '',
  displayPrompt: '',
  explanation: '',
  reaction: '',
  explanationPrompt: '',
  conclusion: '',
  correctPhrase: '',
  conclusionPrompt: '',
  outro: '',
  userId: '',
};

const mapStateToProps = ({ context }) => ({
  userId: context.userId,
});

const mapDispatchToProps = {
  dispatchPostAppInstanceResource: postAppInstanceResource,
  dispatchPostAction: postAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(NonsensePhrase);
