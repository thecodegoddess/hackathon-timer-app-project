import Debugger from 'component/debugger';
import TaskItem from 'component/task-list/task-item';
import {useTimerItems} from 'component/timer-provider';
import * as React from 'react';
import './style/task-list.css';

function TaskList() {
  const {state: tasks = {}} = useTimerItems();
  const taskKeys = Object.keys(tasks);

  const prioritySort = (prev, next) => {
    const prevTask = tasks[prev];
    const nextTask = tasks[next];

    if (prevTask.priority > nextTask.priority) {
      return -1;
    }

    if (prevTask.priority < nextTask.priority) {
      return 1;
    }

    return 0;
  };

  return (
    <ul className="task-list">
      {
        taskKeys.sort(prioritySort)
          .map((key) => (
            <TaskItem
              key={ key }
              id={ key }
              { ...tasks[key] }
            />
          ))
      }
    </ul>
  );
}

export default TaskList;
