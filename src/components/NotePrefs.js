export default function NotePrefs(props){
  const hide = () => props.update({ ...props.state, active: false });

  const authUserName = window.ofdx.authUser?.name;

  return (
    <div className="note_prefs">
      <p>Hello, <b>{authUserName}</b>!</p>
      <p><a href="/aaa/logout/">Logout</a>.</p>

      <p onClick={hide}>TODO - Settings should appear here.</p>
    </div>
  );
}