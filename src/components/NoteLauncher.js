import React from 'react';
import NoteTextEditor from './texted/NoteTextEditor';
import NotePrefs from './NotePrefs';

// Create a React component using the specified widget name, and pass along the props.
export default function NoteLauncher(props){
  let update = state => props.update(state);

  switch(props.widget){
    case 'NoteTextEditor':
      return ( <NoteTextEditor state={props.state} update={update} /> );
    case 'NotePrefs':
      return ( <NotePrefs state={props.state} update={update} /> );

    default:
      // NOP
  }
}