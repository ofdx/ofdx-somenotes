import React from 'react';
import NoteTextEditor from './texted/NoteTextEditor';

// Create a React component using the specified widget name, and pass along the props.
export default function NoteLauncher(props){
  let update = state => props.update(state);

  switch(props.widget){
    case 'NoteTextEditor':
      return ( <NoteTextEditor state={props.state} update={update} /> );

    // Shouldn't happen.
    default:
      alert('NoteLauncher called for unknown app: ', props.widget);
  }
}