import {STATUS_ENUM} from 'component/timer-provider';
import * as React from 'react';

const EMOJI_ICON = {
  [STATUS_ENUM.DONE]: '✅',
  [STATUS_ENUM.STARTED]: '⌛️',
  [STATUS_ENUM.NOT_STARTED]: '✔️️',
};

// const EMOJI_ICON = {
//   [STATUS_ENUM.DONE]: 'DONE',
//   [STATUS_ENUM.STARTED]: 'STARTED',
//   [STATUS_ENUM.NOT_STARTED]: 'NOT STARTED',
// };

const TaskIcon = (props) => {
  const {status} = props;

  return (
    <span>{EMOJI_ICON[status]}</span>
  );
};

export default TaskIcon;
