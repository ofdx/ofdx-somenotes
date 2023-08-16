export default function NoteAppIcon(props){
  const displayText = (props.state?.desktop?.label || 'Unknown') + (props.state?.active ? '*' : '');
  const icon = (props.state?.desktop?.icon || '/floppy-1.png');

  return (
    <div
      class="notes_app_icon"
      onClick={(e) => { props.onClick?.(e) }}
    >
      <img class="img_pixelated" src={icon} alt="" />
      <h3>{displayText}</h3>
    </div>
  );
}
