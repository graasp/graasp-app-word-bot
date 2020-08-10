import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: 'center',
    margin: theme.spacing(),
  },
}));

const MILLIS_PER_SECOND = 1000;

export function Response({ children, delay, hidden }) {
  const classes = useStyles();
  const [isHidden, setIsHidden] = useState(hidden);
  if (hidden) {
    setTimeout(() => {
      setIsHidden(false);
    }, delay * MILLIS_PER_SECOND);
  }

  if (isHidden) {
    return null;
  }

  return (
    <Grid item xs={12} className={classes.main}>
      {children}
    </Grid>
  );
}

Response.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  hidden: PropTypes.bool,
};

Response.defaultProps = {
  delay: 0,
  hidden: false,
};

export default Response;
