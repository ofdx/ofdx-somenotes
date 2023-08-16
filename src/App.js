import React from 'react';

import NoteDesktop from './components/NoteDesktop';

export default function App(props){
  const [inFlight, setInFlight] = React.useState(false);

  // No auth suggests the user is not logged in.
  if(!window.ofdx || !window.ofdx.authUser || !window.ofdx.authUser.name){
    function handler(e){
      e.preventDefault();

      const form_login = e.target;

      // Prevent double-submission
      if(inFlight)
        return;

      setInFlight(true);
      for(let i = 0; i < form_login.elements.length; ++ i)
        form_login.elements[i].disabled = true;

      fetch(
        form_login.action,
        {
          method: 'POST',
          headers: new Headers({
              'Authorization': 'Basic ' + btoa(
                form_login.elements['ofdx_user'].value + ':' +
                form_login.elements['ofdx_pass'].value
              )
          })
        }
      ).then(response => {
        // 204 indicates a successful login. Reload the application.
        if(response.status === 204)
          window.location.reload();
        else return response.text();
      }).then(data => {
        // Show the error message.
        if(data)
          alert(data);

        // Allow the user to try again.
        setInFlight(false);
        for(let i = 0; i < form_login.elements.length; ++ i)
          form_login.elements[i].disabled = false;
      });
    }

    return (
      <div>
        <form id="ofdx_login" method="POST" action="/aaa/login/" onSubmit={handler}>
          <label htmlFor="ofdx_user">Username: </label>
          <input id="ofdx_user" name="ofdx_user" />
          <br />
          
          <label htmlFor="ofdx_pass">Password: </label>
          <input id="ofdx_pass" name="ofdx_pass" type="password" />
          <br />

          <input type="submit" value="Login" /><br />
        </form>
      </div>
    );
  }

  return (
    <div>
      <NoteDesktop />
    </div>
  );
}
