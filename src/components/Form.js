// TODO - Delete this; example file.

import React from 'react';

export default function Form(props){
  // Read with name, set with setName()
  const [name, setName] = React.useState('');

  function handleSubmit(e){
    e.preventDefault();

    // Takes the state, which is wired directly to the input field.
    props.addTaskFn(name);
    setName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={(e) => {setName(e.target.value);}}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}
