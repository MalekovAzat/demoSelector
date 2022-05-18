require("dotenv").config({ path: ".env" });

const cors = require("cors");
var bodyParser = require("body-parser");

const { arrayMove } = require("../tools/arrayMove");
const { findPositionById } = require("../tools/findPositionById");

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

let items = [];

for (let i = 0; i < 120; i++) {
  items.push({
    text: `item ${i}`,
    id: i,
    selected: false,
  });
}

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.get("/items", (req, res) => {
  if (!("count" in req.query) || !("offset" in req.query)) {
    res.statusCode = 400;
    res.json({
      message: "Add count and offset to query param",
    });
    return;
  }
  const offset = parseInt(req.query.offset);
  const count = parseInt(req.query.count);

  const searchStr = req.query.search;

  const foundedItems = searchStr
    ? items.filter((item) => item.text.startsWith(searchStr))
    : items;

  res.statusCode = 200;
  res.json({
    items: foundedItems.slice(offset, count + offset),
    count: foundedItems.length,
  });
});

app.post("/update-item-position", (req, res) => {
  const { oldPos, newPos } = req.body;

  items = arrayMove(items, oldPos, newPos);

  res.statusCode = 201;
  res.json({
    message: "success",
  });
});

app.post("/update-item-state", (req, res) => {
  const { id, state } = req.body;

  const pos = findPositionById(id, items);
  items[pos].selected = state;

  res.statusCode = 201;
  res.json({
    message: "success",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
