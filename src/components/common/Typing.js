import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const styles = (theme) => {
  const width = '75';

  return {
    ballLoader: {
      width: `${width}px`,
      height: `${width / 3 - 10}px`,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
    },
    ballLoaderBall: {
      willChange: 'transform',
      height: `${width / 3 - 10}px`,
      width: `${width / 3 - 10}px`,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      animation: '$grow 1s ease-in-out infinite alternate',
    },
    ball1: {
      left: 0,
      transformOrigin: '100% 50%',
    },
    ball2: {
      left: '50%',
      transform: 'translateX(-50%) scale(1)',
      animationDelay: '0.33s',
    },
    ball3: {
      right: 0,
      animationDelay: '0.66s',
    },
    '@keyframes grow': {
      to: {
        transform: 'translateX(-50%) scale(0)',
      },
    },
  };
};

const Typing = ({ classes }) => (
  <div className={classes.ballLoader}>
    <div className={clsx(classes.ballLoaderBall, classes.ball1)} />
    <div className={clsx(classes.ballLoaderBall, classes.ball2)} />
    <div className={clsx(classes.ballLoaderBall, classes.ball3)} />
  </div>
);

Typing.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    ballLoader: PropTypes.string,
    ballLoaderBall: PropTypes.string,
    ball1: PropTypes.string,
    ball2: PropTypes.string,
    ball3: PropTypes.string,
  }).isRequired,
};

const StyledComponent = withStyles(styles)(Typing);

export default StyledComponent;
