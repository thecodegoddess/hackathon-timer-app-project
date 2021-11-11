import * as React from 'react';

const { useRef } = React;

const AddTask = ( props ) => {
  const {
    className, onSubmitCallback,
  } = props;

  const taskInput = useRef( null );

  function handleOnSubmit( ev ) {
    ev.preventDefault();
    const { value } = taskInput.current;
    onSubmitCallback( value );
  }

  return (
    <div>
      <form
        className={ className }
        onSubmit={ handleOnSubmit }
      >
        <input
          type="text"
          ref={ taskInput }
        />
        <button type="submit"> Add Something Here</button>
      </form>
    </div>
  );
};

export default AddTask;
