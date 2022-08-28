const request = require('supertest')
const app = require('../app')
describe('Get Endpoint', () => {
  it('should get index', async () => {
    const res = await request(app);
    const index = await res.get('/');
    expect(index.statusCode).toEqual(200)
    expect(index.headers["content-type"]).toEqual('text/html; charset=UTF-8')
    expect(index.text).toContain("<h1>Templated APP</h1>")
})
})
{/* <h1>Templated APP</h1> */}