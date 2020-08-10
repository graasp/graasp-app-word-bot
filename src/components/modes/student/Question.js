import React from 'react';
import { connect } from 'react-redux';
import NonsensePhrase from './NonsensePhrase';
import { QUESTION } from '../../../config/propTypes';

export function Question({ question }) {
  const {
    displayPhrase,
    correctPhrase,
    context,
    displayPrompt,
    explanation,
    reaction,
    explanationPrompt,
    conclusion,
    conclusionPrompt,
    outro,
  } = question;
  return (
    <NonsensePhrase
      displayPhrase={displayPhrase}
      correctPhrase={correctPhrase}
      context={context}
      displayPrompt={displayPrompt}
      explanation={explanation}
      reaction={reaction}
      explanationPrompt={explanationPrompt}
      conclusion={conclusion}
      conclusionPrompt={conclusionPrompt}
      outro={outro}
    />
  );
}

Question.propTypes = {
  question: QUESTION.isRequired,
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Question);
