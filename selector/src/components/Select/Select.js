import React, { useState, useEffect } from "react";

import SearchField from "../SearchField/SearchField";
import SelectItem from "../SelectItem/SelectItem";

import "./Select.css";
import arrayMove from "../../tools/arrayMove";

import {
  updateSelectedItem,
  fetchSelectItems,
  updateSelectItemPosition,
} from "./UpdateSelectRequests";

function findPositionById(id, array) {
  return array.findIndex((element) => {
    return element.id === id;
  });
}

function getIdByEvent(event) {
  const elem = event.target.closest("div");
  const id = parseInt(elem.getAttribute("id"));
  return isNaN(id) ? -1 : id;
}

function Select() {
  const [selectorItemsArray, setSelectorItemsArray] = useState([]);
  const [searchState, setSearchState] = useState("");

  let count = 20;
  let dragElementId = -1;

  function updateSelectorItemsArray(fetchedData) {
    const prevselectorItemsArray = [...selectorItemsArray];
    prevselectorItemsArray.push(...fetchedData.items);
    count += fetchedData.count;

    setSelectorItemsArray(prevselectorItemsArray);
  }

  function resetSelectorItemsArray(fetchedData) {
    count = fetchedData.count;

    setSelectorItemsArray(fetchedData.items);
  }

  useEffect(() => {
    fetchSelectItems(20, 0, searchState).then(updateSelectorItemsArray);
  }, []);

  function onSearchStringChanged(e) {
    const searchStr = e.target.value;
    setSearchState(searchStr);
    fetchSelectItems(count, 0, searchStr).then(resetSelectorItemsArray);
  }

  function onSelectItemClicked(event) {
    const id = getIdByEvent(event);
    if (id === -1) {
      return;
    }

    const pos = findPositionById(id, selectorItemsArray);
    updateSelectedItem(id, !selectorItemsArray[pos].selected).then((succes) => {
      if (succes) {
        let prevState = [...selectorItemsArray];
        prevState[pos].selected = !prevState[pos].selected;
        setSelectorItemsArray(prevState);
      }
    });
  }

  function onDropSelectItem(event) {
    const id = getIdByEvent(event);
    if (id === -1) {
      return;
    }

    if (dragElementId !== id) {
      const oldPos = findPositionById(dragElementId, selectorItemsArray);
      const newPos = findPositionById(id, selectorItemsArray);

      updateSelectItemPosition(oldPos, newPos).then((success) => {
        if (success) {
          const newselectorItemsArray = arrayMove(
            selectorItemsArray,
            oldPos,
            newPos
          );
          setSelectorItemsArray(newselectorItemsArray);
        }
      });
    }
  }

  function onDragStart(event) {
    const id = getIdByEvent(event);
    if (id === -1) {
      return;
    }

    event.target.style.opacity = "0.4";
    dragElementId = id;
  }

  function onDragEnd(event) {
    const id = getIdByEvent(event);
    if (id === -1) {
      return;
    }
    event.target.style.opacity = "1";
  }

  function onScroll(e) {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      const lastElementIndex = selectorItemsArray.length;
      fetchSelectItems(5, lastElementIndex, searchState).then(
        updateSelectorItemsArray
      );
    }
  }

  const selectionItems = selectorItemsArray.map((item) => (
    <SelectItem key={item.id} {...item} />
  ));

  return (
    <div>
      <SearchField onChange={onSearchStringChanged} />
      <div
        className="select"
        onScroll={onScroll}
        onClick={onSelectItemClicked}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDropSelectItem}
      >
        {selectionItems}
      </div>
    </div>
  );
}

export default Select;
