import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { postAppInstanceResource } from '../../../actions';
import { STARTED } from '../../../config/appInstanceResourceTypes';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  text: {
    textAlign: 'center',
  },
  button: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  emojis: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(4),
  },
}));

export function Start({
  dispatchPostAppInstanceResource,
  userId,
  instructions,
}) {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h2">Instructions</Typography>
      </Grid>
      <Grid item xs={12} className={classes.text}>
        <Typography variant="p">{instructions}</Typography>
      </Grid>
      <Grid item xs={12} className={classes.button}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => {
            dispatchPostAppInstanceResource({
              userId,
              type: STARTED,
            });
          }}
        >
          Start
        </Button>
      </Grid>
    </Grid>
  );
}

Start.propTypes = {
  dispatchPostAppInstanceResource: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  instructions: PropTypes.func.isRequired,
};

const mapStateToProps = ({ context, appInstance }) => ({
  userId: context.userId,
  instructions: appInstance.content.settings.instructions,
});

const mapDispatchToProps = {
  dispatchPostAppInstanceResource: postAppInstanceResource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
