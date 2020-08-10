import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MessageBox } from 'react-chat-elements';
import Typing from '../../common/Typing';

export function Message({
  typing,
  hidden,
  text,
  position,
  typingDelay,
  hiddenDelay,
}) {
  const [isTyping, setIsTyping] = useState(typing);
  const [isHidden, setIsHidden] = useState(hidden);

  if (typingDelay) {
    const totalTypingDelay = hiddenDelay
      ? typingDelay + hiddenDelay
      : typingDelay;
    setTimeout(() => {
      setIsTyping(false);
    }, totalTypingDelay);
  }

  if (hiddenDelay) {
    setTimeout(() => {
      setIsHidden(false);
    }, hiddenDelay);
  }

  if (isHidden) {
    return null;
  }

  return (
    <MessageBox
      text={isTyping ? <Typing /> : text}
      position={position}
      date=""
    />
  );
}

Message.propTypes = {
  typing: PropTypes.bool,
  hidden: PropTypes.bool,
  text: PropTypes.string,
  position: PropTypes.oneOf(['left', 'right']),
  typingDelay: PropTypes.number,
  hiddenDelay: PropTypes.number,
};

Message.defaultProps = {
  typing: false,
  hidden: false,
  text: '',
  position: 'left',
  typingDelay: 0,
  hiddenDelay: 0,
};

export default Message;
