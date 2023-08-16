export default function NoteTextEditor(props){
  const hide = () => props.update({ ...props.state, active: false });

  return (
    <div className="note_texted" onClick={hide}>
      <p>FIXME - text editor</p>
    </div>
  );
}