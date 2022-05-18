import "./SelectItem.css";

function SelectItem({ id, text, selected }) {
  const selectItemDom = (
    <div
      draggable="true"
      id={id}
      className={selected ? "select-item select-item-selected" : "select-item"}
    >
      <p> {text}</p>
    </div>
  );

  return selectItemDom;
}

export default SelectItem;
