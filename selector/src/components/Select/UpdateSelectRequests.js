import {
  selectItems,
  updateItemPos,
  updateItemState,
} from "../../tools/routes";

import { BACKEND_URL } from "../../tools/envVariables";
import fetchData from "../../tools/fetchData";

export async function updateSelectedItem(id, state) {
  const url = new URL(BACKEND_URL + updateItemState);
  const request = await fetchData(url.toString(), "POST", { id, state });
  return request.status === 201;
}

export async function fetchSelectItems(count, offset, search) {
  const url = new URL(BACKEND_URL + selectItems);
  url.searchParams.append("count", count);
  url.searchParams.append("offset", offset);
  if (search !== "") {
    url.searchParams.append("search", search);
  }

  const request = await fetchData(url.toString(), "GET");
  const selectorData = await request.json();

  return selectorData;
}

export async function updateSelectItemPosition(oldPos, newPos) {
  const url = new URL(BACKEND_URL + updateItemPos);
  const request = await fetchData(url.toString(), "POST", { oldPos, newPos });

  return request.status === 201;
}
