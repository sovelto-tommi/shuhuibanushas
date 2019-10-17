const request = require('supertest');
const app = require('../app');
const Kirja = require('../service/kirja').Kirja;

test("/api/kirjat palauttaa vähintään yhden kirjan", (done) => {
    return request(app)
        .get("/api/kirjat").then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
            done();
        });
});

test("POST /api/kirjat luo uuden kirjan", (done) => {
    const uusi = new Kirja({nimi: "Pro Git",kirjoittajat:  ["Ben Straub", "Scott Chacon"], isbn: "1430218339"});
    
    return request(app)
        .post("/api/kirjat").send(uusi.toJSON())
        .expect('Location', /api\/kirjat\/\d+$/)
        .then(response => {
            expect(response.statusCode).toBe(201);
            done();
        });
});
test('POST huonolla kirjaoliolla palauttaa statuksen 400', () => {
    return request(app)
        .post("/api/kirjat").send({nimi:"Kirja", kirjoittaja: ["DJT"]})
        .then(response => {
            expect(response.statusCode).toBe(400);
        });
});

test('GET /:isbn palauttaa kirjan', () => {
    const isbn = "951-0-20711-X";
    return request(app)
        .get(`/api/kirjat/${isbn}`).then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.nimi).toMatch(/consultants/i);
        });
});
test('GET /:isbn palauttaa 404 olemattomalla ISBN:llä', () => {
    const id = "ABC";
    return request(app)
        .get(`/api/kirjat/${id}`).then(response => {
            expect(response.statusCode).toBe(404);
        });
});
