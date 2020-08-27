/* eslint-disable no-param-reassign */
const express = require('express');
const path = './data.json';
const app = express();
function checkHttps(request, response, next) {
  // Check the protocol — if http, redirect to https.
  if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    response.redirect("https://" + request.hostname + request.url);
  }
}

app.all("*", checkHttps)

const fs = require('fs').promises;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('../client/build/index'));

app.get('/api/tickets/', async (req, res) => {
  const script = await fs.readFile('./data.json');
  const json = JSON.parse(script);
  if (req.query.searchText) {
    const text = req.query.searchText;
    const filtered = json.filter((value) => value.title.toLowerCase().includes(text.toLowerCase()));
    res.send(filtered);
  } else {
    res.send(json);
  }
});

app.post('/api/tickets/:ticketId/done', async (req, res) => {
  const tickets = JSON.parse(await fs.readFile('./data.json'));
  const ticketsTemp = tickets.map((ticket) => {
    if (ticket.id === req.params.ticketId) {
      ticket.done = true;
    }
    return ticket;
  });
  fs.writeFile('./data.json', JSON.stringify(ticketsTemp));
  res.send({ updated: true });
});

app.post('/api/tickets/:ticketId/undone', async (req, res) => {
  const tickets = JSON.parse(await fs.readFile('./data.json'));
  const ticketsTemp = tickets.map((ticket) => {
    if (ticket.id === req.params.ticketId) {
      ticket.done = false;
    }
    return ticket;
  });
  fs.writeFile('./data.json', JSON.stringify(ticketsTemp));
  res.send({ updated: true });
});

module.exports = app;


let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});

