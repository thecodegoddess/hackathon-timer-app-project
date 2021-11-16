import TaskIcon from 'component/task-icon';
import * as React from 'react';
import {
  deleteTaskAction,
  STATUS_ENUM,
  updateTimerStatus,
  // STATUS_ENUM,
  // updateTimerStatus,
  useTimerItems,
} from 'component/timer-provider';
import {
  Timer, convertMilliseconds,
} from 'utils';
import Debugger from 'component/debugger';
import './style/task-item.css';

const {
  useRef, useState,
} = React;

function TaskItem(props) {
  const {
    text, status, timer, id, priority,
  } = props;

  const {dispatch} = useTimerItems();

  const {formatted} = convertMilliseconds(timer);
  const [
    timeRemainingState,
    setTimeRemainingState,
  ] = useState(formatted);

  const taskTimer = useRef(new Timer({
    lengthInMs: timer,
    onStop: () => {
      dispatch(updateTimerStatus(id, STATUS_ENUM.DONE));
    },
    onTick: ({
      timeRemaining,
      msRemaining,
    }) => {
      setTimeRemainingState(msRemaining < 0 ? '00:00:00' : timeRemaining);
    },
  }));

  const handleDelete = () => {
    dispatch(deleteTaskAction(id));
  };

  const handleTimerStart = () => {
    if (!taskTimer.current) {
      console.warn('no task timer');
      return;
    }

    taskTimer.current.starTimer();

    dispatch(updateTimerStatus(id, STATUS_ENUM.STARTED));
  };

  function getCSSModifierClass() {
    if (status === STATUS_ENUM.STARTED) {
      return 'task-item--started';
    }
    if (status === STATUS_ENUM.DONE) {
      return 'task-item--done';
    }

    return '';
  }

  return (
    <li className={ `task-item ${getCSSModifierClass()}` }>
      <div className="task-item__task-name">
        <span>{Array.prototype.fill(priority).map(() => '❗️')}</span>
        <strong>{text}</strong> Timer: <em>{timeRemainingState}</em>
        <TaskIcon status={ status } />
        <Debugger { ...props } />
      </div>

      <div className="task-item__button-group">
        <button
          className="task-item__action_button"
          type="button"
          onClick={ handleDelete }
        >Delete Task
        </button>

        <button
          className="task-item__action_button"
          type="button"
          onClick={ () => (handleTimerStart()) }
        >Start Task
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
