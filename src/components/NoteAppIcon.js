export default function NoteAppIcon(props){
  const displayText = (props.state?.desktop?.label || 'Unknown');
  const icon = (props.state?.desktop?.icon || '/floppy-1.png');

  const classnames = "notes_app_icon" + (props.state?.active ? ' notes_app_icon_active' : '');

  return (
    <div
      class={classnames}
      onClick={(e) => { props.onClick?.(e) }}
    >
      <img class="img_pixelated" src={icon} alt="" />
      <span>{displayText}</span>
    </div>
  );
}
