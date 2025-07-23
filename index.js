const express = require('express');
const faker = require('faker');

const app = express();
const PORT = 3000;

function generateFakeEvent() {
  const eventTypes = ['LOGIN_FAILURE', 'MALWARE_DETECTED', 'PORT_SCAN', 'UNAUTHORIZED_ACCESS'];
  const severities = ['low', 'medium', 'high', 'critical'];

  return {
    id: faker.datatype.uuid(),
    timestamp: new Date().toISOString(),
    eventType: faker.random.arrayElement(eventTypes),
    sourceIP: faker.internet.ip(),
    destinationIP: faker.internet.ip(),
    username: faker.internet.userName(),
    severity: faker.random.arrayElement(severities),
  };
}

app.get('/api/get/events', (req, res) => {
  const count = parseInt(req.query.count) || 5;
  const events = Array.from({ length: count }, generateFakeEvent);
  res.json(events);
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
