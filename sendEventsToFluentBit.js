const net = require('net');
const axios = require('axios');

const FLUENT_BIT_PORT = 5170;
const FLUENT_BIT_HOST = '127.0.0.1';

const client = new net.Socket();

client.connect(FLUENT_BIT_PORT, FLUENT_BIT_HOST, () => {
  console.log(`Connected to Fluent Bit at ${FLUENT_BIT_HOST}:${FLUENT_BIT_PORT}`);
});

async function sendEvents() {
  try {
    const { data: events } = await axios.get('http://localhost:3000/api/get/events?count=5');
    events.forEach(event => {
      const json = JSON.stringify(event);
      client.write(json + '\n');
      console.log('Sent:', json);
    });
  } catch (err) {
    console.error('Error:', err.message);
  }
}

setInterval(sendEvents, 5000);




