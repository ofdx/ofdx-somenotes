import React from 'react';

import NoteLauncher from './NoteLauncher';
import NoteAppIcon from './NoteAppIcon';

export default function NoteDesktop(props){
  const authUserName = window.ofdx.authUser?.name;

  const [runAppState, updateRunAppState] = React.useState([
    {
      widget: 'NoteTextEditor',
      desktop: {
        // TODO - store icon name here?
        label: 'Text Editor'
      }
    },
    {
      widget: 'NotePrefs',
      desktop: {
        label: 'Preferences'
      }
    }
  ]);

  const launch = (what) => updateRunAppState(runAppState.map(el => ({ ...el, active: (el.widget === what) })));
  const update = (what) => updateRunAppState(runAppState.map(el => ((el.widget === what.widget) ? what : el)));

  // Render all active apps
  const apps = runAppState
    .filter(el => el.active)
    .map((el) => (
      <NoteLauncher
        widget={el.widget}
        state={el}
        update={update}
      />
    ));

  // App tray icons
  const icons = runAppState
    .map(app => (
      <NoteAppIcon
        onClick={() => launch(app.widget)}
        state={app}
      />
    ));

  return (
    <div id="notes_desktop">
      <div id="notes_apptray">
        {icons}
      </div>
      {apps}
    </div>
  );
}