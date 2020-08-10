import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, Divider } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { Add } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withTranslation } from 'react-i18next';
import { closeSettings, patchAppInstance } from '../../../actions';
import Loader from '../../common/Loader';
import {
  DEFAULT_QUESTION,
  DEFAULT_SETTINGS,
} from '../../../reducers/appInstance';

const styles = (theme) => ({
  fullScreen: {
    position: 'absolute',
    height: '100vh',
    width: '100wh',
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    padding: theme.spacing(5),
  },
  title: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(),
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(3),
    float: 'right',
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

class Settings extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      paper: PropTypes.string,
      button: PropTypes.string,
      textField: PropTypes.string,
      title: PropTypes.string,
      fullScreen: PropTypes.string,
      divider: PropTypes.string,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    activity: PropTypes.bool.isRequired,
    settings: PropTypes.shape({
      headerVisible: PropTypes.bool,
      active: PropTypes.bool,
      instructions: PropTypes.string,
      endText: PropTypes.string,
      endTitle: PropTypes.string,
      endRedirectUrl: PropTypes.string,
      questions: PropTypes.arrayOf(PropTypes.shape(DEFAULT_QUESTION)),
    }).isRequired,
    t: PropTypes.func.isRequired,
    dispatchCloseSettings: PropTypes.func.isRequired,
    dispatchPatchAppInstance: PropTypes.func.isRequired,
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
    }).isRequired,
  };

  state = { settings: {} };

  componentDidMount() {
    const { settings } = this.props;
    this.setState({
      settings: {
        ...DEFAULT_SETTINGS,
        ...settings,
      },
    });
  }

  componentDidUpdate({ settings: prevSettings }) {
    const { settings } = this.props;
    if (!_.isEqual(settings, prevSettings)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        settings: {
          ...DEFAULT_SETTINGS,
          ...settings,
        },
      });
    }
  }

  handleSave = () => {
    const { dispatchPatchAppInstance, dispatchCloseSettings } = this.props;
    const { settings } = this.state;
    dispatchPatchAppInstance({
      data: settings,
    });
    dispatchCloseSettings();
  };

  handleChangeSwitch = (key) => ({ target: { checked } }) => {
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        [key]: checked,
      },
    }));
  };

  handleClose = () => {
    const { dispatchCloseSettings, settings } = this.props;
    this.setState({ ...DEFAULT_SETTINGS, ...settings });
    dispatchCloseSettings();
  };

  handleChangeTextField = (key) => ({ target: { value } }) => {
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        [key]: value,
      },
    }));
  };

  handleChangeQuestionTextField = (key, index) => ({ target: { value } }) => {
    this.setState((prevState) => {
      const newQuestions = _.cloneDeep(prevState.settings.questions);
      newQuestions[index][key] = value;
      return {
        settings: {
          ...prevState.settings,
          questions: [...newQuestions],
        },
      };
    });
  };

  handleAddQuestion = () => {
    this.setState((prevState) => {
      const newQuestions = _.cloneDeep(prevState.settings.questions);
      newQuestions.push(DEFAULT_QUESTION);
      return {
        settings: {
          ...prevState.settings,
          questions: [...newQuestions],
        },
      };
    });
  };

  renderQuestionForm = (question, index) => {
    const { t, classes } = this.props;
    const keys = [
      'context',
      'displayPhrase',
      'displayPrompt',
      'explanation',
      'reaction',
      'explanationPrompt',
      'conclusion',
      'correctPhrase',
      'conclusionPrompt',
      'outro',
    ];
    return (
      <div key={`question-${index}`}>
        <Typography variant="h6">{`${t('Question')} #${index + 1}`}</Typography>
        {keys.map((key) => {
          return (
            <TextField
              key={key}
              id={key}
              className={classes.textField}
              label={t(_.startCase(key))}
              value={question[key]}
              onChange={this.handleChangeQuestionTextField(key, index)}
              rows={2}
              variant="outlined"
              multiline
              fullWidth
            />
          );
        })}
      </div>
    );
  };

  renderModalContent() {
    const { t, activity, classes, settings: settingsProp } = this.props;
    const { settings } = this.state;
    const {
      headerVisible,
      instructions,
      endText,
      endTitle,
      endRedirectUrl,
      active,
      questions = [],
    } = settings;

    const hasChanged = !_.isEqual(settingsProp, settings);

    if (activity) {
      return <Loader />;
    }

    const headerVisibleSwitchControl = (
      <Switch
        color="primary"
        checked={headerVisible}
        onChange={this.handleChangeSwitch('headerVisible')}
        name="headerVisible"
      />
    );

    const activeSwitchControl = (
      <Switch
        color="primary"
        checked={active}
        onChange={this.handleChangeSwitch('active')}
        name="active"
      />
    );

    return (
      <>
        <FormControlLabel
          control={headerVisibleSwitchControl}
          label={t('Show Header to Students')}
        />
        <FormControlLabel control={activeSwitchControl} label={t('Active')} />
        <TextField
          id="instructions"
          className={classes.textField}
          label={t('Instructions')}
          value={instructions}
          onChange={this.handleChangeTextField('instructions')}
          rows={4}
          variant="outlined"
          multiline
          fullWidth
        />
        <TextField
          id="endTitle"
          className={classes.textField}
          label={t('End Title')}
          value={endTitle}
          onChange={this.handleChangeTextField('endTitle')}
          variant="outlined"
          fullWidth
        />
        <TextField
          id="endText"
          className={classes.textField}
          label={t('End Text')}
          value={endText}
          onChange={this.handleChangeTextField('endText')}
          rows={4}
          variant="outlined"
          multiline
          fullWidth
        />
        <TextField
          id="endRedirectUrl"
          className={classes.textField}
          label={t('Redirect URL')}
          value={endRedirectUrl}
          onChange={this.handleChangeTextField('endRedirectUrl')}
          variant="outlined"
          fullWidth
        />
        <Divider className={classes.divider} />
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="h5" className={classes.title}>
              {t('Questions')}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={this.handleAddQuestion}
              disabled={questions?.length}
              style={{ float: 'right' }}
            >
              <Add />
            </IconButton>
          </Grid>
        </Grid>
        {questions.map((question, index) =>
          this.renderQuestionForm(question, index),
        )}
        <Divider className={classes.divider} />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleSave}
          disabled={!hasChanged}
        >
          {t('Save')}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={this.handleClose}
        >
          {t('Cancel')}
        </Button>
      </>
    );
  }

  render() {
    const { open, classes, t } = this.props;

    return (
      <div>
        <Dialog
          aria-labelledby="settings"
          aria-describedby="settings"
          open={open}
          onClose={this.handleClose}
          fullScreen
        >
          <div className={classes.fullScreen}>
            <Typography variant="h5" id="modal-title">
              {t('Settings')}
            </Typography>
            {this.renderModalContent()}
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ layout, appInstance }) => {
  return {
    open: layout.settings.open,
    settings: appInstance.content.settings,
    activity: Boolean(appInstance.activity.length),
  };
};

const mapDispatchToProps = {
  dispatchCloseSettings: closeSettings,
  dispatchPatchAppInstance: patchAppInstance,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
const TranslatedComponent = withTranslation()(ConnectedComponent);

export default withStyles(styles)(TranslatedComponent);
