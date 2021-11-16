import * as React from 'react';
import {createID} from 'utils';

const {
  createContext,
  useReducer,
  useContext,
} = React;

const STATUS_ENUM = {
  DONE: 'DONE',
  STARTED: 'STARTED',
  NOT_STARTED: 'NOT_STARTED',
};

const PRIORITY = {
  NONE: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 4,
};

const initialStateForDebug = {
  _yx89jjqpy_LOW: {
    text: 'Study for Finals',
    status: 'NOT_STARTED',
    timer: 2000,
    priority: PRIORITY.LOW,
  },
  _0uiit5u6r_MED: {
    text: 'Finish Essay Outline',
    status: 'NOT_STARTED',
    timer: 100000,
    priority: PRIORITY.MEDIUM,
  },
  _rbs05g3g3_HIGH: {
    text: 'Pick up groceries ',
    status: 'NOT_STARTED',
    timer: 150000,
    priority: PRIORITY.HIGH,
  },
};
const DEFAULT_TIMER_LENGTH_MS = 1000 * (60 * 5);
// const DEFAULT_TIMER_LENGTH_MS = 1500000; // 25 minutes

const initialState = {};
const TimerContext = createContext();

const TIMER_ACTION_TYPES = {
  ADD: 'ADD',
  DELETE: 'DELETE',
  EDIT: 'EDIT',
  UPDATE_STATUS: 'UPDATE_STATUS',
  UPDATE_TIMER_STATUS: 'UPDATE_TIMER_STATUS',
};

export const createTaskAction = (text) => ({
  type: TIMER_ACTION_TYPES.ADD,
  payload: {text},
});

export const deleteTaskAction = (key) => ({
  type: TIMER_ACTION_TYPES.DELETE,
  payload: {key},
});

export const editTaskAction = (key, text) => ({
  type: TIMER_ACTION_TYPES.EDIT,
  payload: {
    key,
    text,
  },
});

// export const updateTaskStatus = (key, status) => ({
//   type: TIMER_ACTION_TYPES.UPDATE_STATUS,
//   payload: {
//     key,
//     status,
//   },
// });

export const updateTimerStatus = (key, status) => ({
  type: TIMER_ACTION_TYPES.UPDATE_STATUS,
  payload: {
    key,
    status,
  },
});

function timerReducer(state = initialState, action) {
  const {
    type, payload,
  } = action;
  switch (type) {
  case TIMER_ACTION_TYPES.ADD: {
    const newItem = {[createID()]: {
      text: payload.text,
      status: STATUS_ENUM.NOT_STARTED,
      timer: DEFAULT_TIMER_LENGTH_MS,
      priority: PRIORITY.NONE,
    }};

    return {
      ...state,
      ...newItem,
    };
  }

  case TIMER_ACTION_TYPES.UPDATE_STATUS: {
    const {
      key, status,
    } = payload;

    if (!STATUS_ENUM[status]) {
      throw new Error(`Status Type ${status} is not a valid Task status`);
    }
    const taskToEditStatus = state[key];

    if (!taskToEditStatus) {
      throw new Error(`Invalid key provided: ${key}`);
    }

    const updatedTask = {
      ...taskToEditStatus,
      status: STATUS_ENUM[status],
    };

    return {
      ...state,
      [key]: {
        ...state[key],
        ...updatedTask,
      },
    };
  }
  // case TIMER_ACTION_TYPES.UPDATE_TIMER_STATUS: {
  //   const {
  //     key, status,
  //   } = payload;
  //
  //   if (!STATUS_ENUM[status]) {
  //     throw new Error(`Status Type ${status} is not a valid Task status`);
  //   }
  //   const taskToEditStatus = state[key];
  //
  //   if (!taskToEditStatus) {
  //     throw new Error(`Invalid key provided: ${key}`);
  //   }
  //
  //   const timerStatusTask = {
  //     ...taskToEditStatus,
  //     timer: {
  //       ...taskToEditStatus.timer,
  //       status,
  //     },
  //   };
  //
  //   return {
  //     ...state,
  //     ...timerStatusTask,
  //   };
  // }

  case TIMER_ACTION_TYPES.EDIT: {
    const {
      key, text,
    } = payload;

    if (!key || !state[key] || !text) {
      return state;
    }

    const updatedItem = {
      ...state[key],
      text,
    };

    return {
      ...state,
      [key]: updatedItem,
    };
  }

  case TIMER_ACTION_TYPES.DELETE: {
    const {key} = payload;
    if (!key) {
      return state;
    }

    const currentState = {...state};

    delete currentState[key];

    return {...currentState};
  }

  default: {
    throw new Error(`Unhandled action type: ${type}`);
  }
  }
}

function TimerProvider({children}) {
  const [
    state,
    dispatch,
  ] = useReducer(timerReducer, initialStateForDebug);

  const value = {
    state,
    dispatch,
  };

  return (
    <TimerContext.Provider value={ value }>{children}</TimerContext.Provider>
  );
}

function useTimerItems() {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error('useTimer must be used with in the Timer Provider');
  }

  return context;
}

export {
  useTimerItems,
  TimerProvider,
  TIMER_ACTION_TYPES,
  STATUS_ENUM,
};
