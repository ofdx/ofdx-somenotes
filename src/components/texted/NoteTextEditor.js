import React from 'react';

import './texted.css';


export default function NoteTextEditor(props){
  // Retrieve the last used text from local storage.
  const lsname = 'note_texted_field_value';
  const [fieldState, setFieldState] = React.useState(localStorage.getItem(lsname));

  // When the textarea is changed, we can save that value to local storage so it's not easily lost.
  function updateTextedFieldValue(value){
    localStorage.setItem(lsname, value);
    setFieldState(value);
  }

  return (
    <div className="note_texted">
      <div className="note_texted_ctrlbar">
        {/* This is the UI for the text editor. It should allow you to do things
        like save to a file on the server, load a file, etc. */}

        <span>FIXME</span>
        <span>Load&hellip;</span>
        <span>Save&hellip;</span>
        <span>About&hellip;</span>
      </div>

      <input
        className="note_texted_doc_title"
        placeholder="Untitled"
        maxLength={128}
        autoComplete='off'
      ></input>

      <textarea
        className="note_texted_field"
        onChange={ e => updateTextedFieldValue(e.target.value) }
        autoComplete='off'
      >{fieldState}</textarea>
    </div>
  );
}