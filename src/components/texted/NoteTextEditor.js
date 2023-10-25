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

  const [menubarState, updateMenubarState] = React.useState([
    {
      // Open a menu with other applications and preferences.
      label: 'OFDX',
      icon: '/texted.png'
    },
    {
      // Open a dialog to create a new/empty note, or load from one saved on the server.
      label: 'Notes…'
    },
    {
      // Open a dialog with info about this application and the currently open file.
      label: 'About…'
    }
  ]);

  const menuPick = (what) => updateMenubarState(menubarState.map(el => ({ ...el, active: ((el === what) && !el.active) })));

  const menuItems = menubarState
    .map((el) => (
      <span
        className={"pick" + (el.active ? " active" : "")}
        onClick={() => menuPick(el)}
      >
        <img
          className={"img_pixelated" + (el.icon ? "" : " hidden")}
          src={el.icon}
        />
        {el.label}
      </span>
    ));


  return (
    <div className="note_texted">
      <div className="note_texted_ctrlbar">
        {menuItems}
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