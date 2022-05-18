async function fetchData(url, method, data) {
  return await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(method !== "GET" && { body: JSON.stringify(data) }),
  });
}

export default fetchData;
