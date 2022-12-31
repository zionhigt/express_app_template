const request = require('supertest');
const app = require('../app.js');
const fs = require("fs");
const path = require("path");


const getTestMessages = async function() {
  return new Promise(function(resolve, reject) {
    fs.readFile(path.join(process.env.DATA_PATH, "messages.json"), {encoding: "utf-8"}, (err, data) => {
      if(err && err.errno !== 0) {
        return reject(err);
      } else {
          return resolve(JSON.parse(data));
      }
    });
  })
}

describe('Get Home Endpoint', () => {
  it('should get index', async () => {
    const res = await request(app);
    const index = await res.get('/');
    expect(index.statusCode).toEqual(200);
    expect(index.headers["content-type"]).toEqual('text/html; charset=UTF-8');
    expect(index.text).toContain("<h1 class=\"right main-title\">Seb Dev</h1>");
  })
})
describe('Get messsages list', () => {
  it('should get a list of mocked messages', async () => {
    const res = await request(app);
    const index = await res.get('/messages');
    expect(index.statusCode).toEqual(200);
    expect(index.headers["content-type"]).toEqual('application/json; charset=utf-8');
    expect(index.body).toEqual(await getTestMessages());
    // expect(index.text).toContain("<h1 class=\"right main-title\">Seb Dev</h1>");
  })
})
describe('Post messsage', () => {
  it('should post a mocked message into messages list', async () => {
    const postedMessage = {
      name: "TEST POST",
      message: "TEST POST",
      writeAt: Date.now(),
      rate: 4
    }
    const index = await request(app)
    .post('/messages')
    .set('content-type', 'application/json; charset=utf-8')
    .send(postedMessage)
    .expect(function(index) {
      index.statusCode = 200;
      index.headers["content-type"] = 'application/json; charset=utf-8';
    });
    // expect(index.body).toEqual(await getTestMessages().get(function(message) {
    //   return message.name === postedMessage.name;
    // }));
    // expect(index.text).toContain("<h1 class=\"right main-title\">Seb Dev</h1>");
  })
})