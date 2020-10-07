import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'react-chat-elements/dist/main.css';
import Frame from './Frame';
import { RESPONSE } from '../../../config/appInstanceResourceTypes';
import End from './End';
import { APP_INSTANCE_RESOURCE, BOT, FRAME } from '../../../config/propTypes';
import { DEFAULT_BOT } from '../../../reducers/appInstance';

const useStyles = makeStyles((theme) => ({
  frames: {
    marginTop: theme.spacing(5),
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
}));

export function Frames({ frames, responsesResources, bot }) {
  const classes = useStyles();
  const { name: botName, avatar: botAvatar } = bot;

  // get current index from number of responses
  let currentFrameIndex = 0;
  if (responsesResources) {
    currentFrameIndex = responsesResources.length;
  }

  if (currentFrameIndex >= frames.length) {
    return <End />;
  }

  const currentFrame = frames[currentFrameIndex];

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.frames}
    >
      <div className={classes.botAvatar}>
        <Avatar>{botAvatar}</Avatar>
        <Typography variant="h5" className={classes.botName}>
          {botName}
        </Typography>
      </div>
      <Frame frame={currentFrame} />
    </Grid>
  );
}

Frames.propTypes = {
  frames: PropTypes.arrayOf(FRAME),
  responsesResources: PropTypes.arrayOf(APP_INSTANCE_RESOURCE),
  bot: BOT,
};

Frames.defaultProps = {
  frames: [],
  responsesResources: [],
  bot: DEFAULT_BOT,
};

const mapStateToProps = ({ context, appInstanceResources, appInstance }) => {
  const { userId } = context;
  const {
    content: {
      settings: { bot },
    },
  } = appInstance;
  return {
    responsesResources: appInstanceResources.content
      .filter(({ user, type }) => {
        return user === userId && type === RESPONSE;
      })
      .map((resource) => resource.data),
    bot,
  };
};

export default connect(mapStateToProps)(Frames);
