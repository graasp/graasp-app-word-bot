import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EXCHANGE } from '../../../config/propTypes';
import { useTranslation } from 'react-i18next';
import { ENDED, RESPONSE } from '../../../config/appInstanceResourceTypes';
import { CLICKED } from '../../../config/verbs';
import { Avatar, Button, Grid, Paper, Typography } from '@material-ui/core';
import Message from './Message';
import Response from './Response';

const Exchanges = ({ exchanges }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [exchangeIndex, setExchangeIndex] = useState(0);

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
      <Grid item xs={12} className={classes.main}>
        <Paper className={classes.paper}>
          <Message text={context} position="left" typing typingDelay={3000} />
          {displayPhrase && (
            <Message
              text={<em>{`"${displayPhrase}"`}</em>}
              position="left"
              hidden
              hiddenDelay={3000}
              typing
              typingDelay={5000}
            />
          )}
          <Message
            text={displayPrompt}
            position="left"
            hidden
            hiddenDelay={displayPhrase ? 8000 : 3000}
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
              {correctPhrase && (
                <Message
                  text={<em>{`"${correctPhrase}"`}</em>}
                  position="left"
                  hidden
                  hiddenDelay={5000}
                  typing
                  typingDelay={5000}
                />
              )}
              <Message
                text={conclusionPrompt}
                position="left"
                hidden
                hiddenDelay={correctPhrase ? 10000 : 5000}
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
        <Response delay={displayPhrase ? 10 : 5} hidden>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            disabled={displayPromptResponseButtonDisabled}
            onClick={() => handleDisplayPromptResponse('Yes.')}
          >
            {t('Yes')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            disabled={displayPromptResponseButtonDisabled}
            onClick={
              () => handleDisplayPromptResponse('No.')
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
        <Response delay={correctPhrase ? 12 : 7} hidden>
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
};

Exchanges.propTypes = {
  exchanges: PropTypes.arrayOf(EXCHANGE),
};

Exchanges.defaultProps = {
  exchanges: [],
};

export default Exchanges;
