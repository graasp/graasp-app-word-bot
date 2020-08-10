import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(),
  },
}));

export function PhraseResponse({ phrase, onSubmit }) {
  const classes = useStyles();
  const [response, setResponse] = useState('');
  const [indexesUsed, setIndexesUsed] = useState([]);
  const handleWordClick = (word, i) => {
    setIndexesUsed([...indexesUsed, i]);
    setResponse(`${response} ${word}`);
  };
  const handleResetClick = () => {
    setIndexesUsed([]);
    setResponse('');
  };

  return (
    <>
      <ButtonGroup>
        {phrase.split(' ').map((word, i) => (
          <Button
            onClick={() => handleWordClick(word, i)}
            disabled={indexesUsed.includes(i)}
          >
            {word}
          </Button>
        ))}
      </ButtonGroup>
      <br />
      <TextField value={response} fullWidth disabled />
      <br />
      <Button
        className={classes.button}
        variant="contained"
        disabled={response === ''}
        onClick={handleResetClick}
      >
        Reset
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disabled={phrase.split(' ').length !== indexesUsed.length}
        onClick={() => onSubmit(response)}
      >
        Submit
      </Button>
    </>
  );
}

PhraseResponse.propTypes = {
  phrase: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PhraseResponse;
