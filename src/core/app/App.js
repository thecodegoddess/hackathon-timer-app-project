import Debugger from 'component/debugger';
import * as React from 'react';
import AddTask from 'component/task-input';
import Layout from 'component/layout';
import createID from 'utils';

const { useState } = React;

const STATUS_ENUM = {
  DONE: 'DONE',
  STARTED: 'STARTED',
  NOT_STARTED: 'NOT_STARTED',
};

function App() {
  const [
    timerItems,
    setTimerItems,
  ] = useState( {} );

  function addItem( text ) {
    const newItem = { [ createID() ]: {
      text,
      status: STATUS_ENUM.NOT_STARTED,
      timer: null,
    } };
    const newState = {
      ...timerItems,
      ...newItem,
    };

    setTimerItems( newState );
  }

  // function getItem( id ) {
  //   return timerItems[ id ];
  // }
  //
  // function editItem( id, updatedValues ) {
  //   const itemToUpdate = timerItems[ id ];
  //
  //   if ( !itemToUpdate ) {
  //     throw new Error( `No item at index ${id}` );
  //   }
  //
  //   const updatedItem = [
  //     ...itemToUpdate,
  //     ...updatedValues,
  //   ];
  //
  //   const newState = {
  //     ...timerItems,
  //     ...updatedItem,
  //   };
  //
  //   setTimerItems( newState );
  // }
  //
  function deleteItem( id ) {
    const currentTimers = { ...timerItems };

    delete currentTimers[ id ];

    setTimerItems( currentTimers );
  }

  return (
    <Layout asideItems={ [
      'item 1',
      'item 2',
      'item 3',
    ] }
    >
      <AddTask
        onSubmitCallback={ addItem }
        className="my-class"
      />
      {Object.keys( timerItems ).map( ( key ) => (
        <div key={ key }>
          <Debugger
            { ...timerItems[ key ] }
          />
          <button
            type="button"
            onClick={ () => deleteItem( key ) }
          >delete
          </button>
        </div>
      ) )}
    </Layout>
  );
}

export default App;
