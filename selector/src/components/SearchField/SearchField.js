import "./SearchField.css";

function SearchField({ onChange }) {
  return (
    <input
      type="text"
      id="myInput"
      className="search-field"
      placeholder="Search for select item"
      onChange={onChange}
    ></input>
  );
}

export default SearchField;
