const kirjat = require('../service/kirjat');
const Kirja = require('../service/kirja').Kirja;

describe('Testataan kirjoja', ()=> {
    test('on alustettu kirjoilla', () => {
        expect(kirjat.kaikki().length).toBeGreaterThan(0);
    });
    test('kirjoja voi poistaa (ja lisätä takaisin)', () => {
        const isbn = kirjat.kaikki()[0].isbn;
        const kirjoja = kirjat.kaikki().length;
        let poistettu;
        expect(poistettu = kirjat.poista(isbn)).toBeDefined();
        expect(poistettu.isbn).toBe(isbn);
        expect(kirjat.kaikki().length).toBe(kirjoja-1);

        expect(kirjat.lisää(poistettu));
        expect(kirjat.kaikki().length).toBe(kirjoja);
    });
    test('kirjoja voi etsiä kirjailijan nimen perusteella', () => {
        expect(kirjat.kirjailijanKirjat('ni').length).toBeGreaterThanOrEqual(2);
        expect(kirjat.kirjailijanKirjat('Aho').length).toBeGreaterThanOrEqual(1);
        const löytynyt = kirjat.kirjailijanKirjat('Puppu Generaattori').length;
        const kirja = {nimi: "Harmaahatun seikkailut", kirjoittajat: "Puppu Generaattori", isbn: "00"};
        kirjat.lisää(kirja);
        expect(kirjat.kirjailijanKirjat('Puppu Generaattori').length).toBe(löytynyt + 1);
        kirjat.poista(kirja.isbn);
    });
    test('ei voi lisätä kahta kirjaa samalla ISBN-numerolla', () => {
        const ekaisbn = kirjat.kaikki()[0].isbn;
        const kirjoja = kirjat.kaikki().length;
        expect(() => kirjat.lisää(new Kirja("Aapinen", "Aapeli", ekaisbn))).toThrowError("Kirja, jolla isbn");
        expect(kirjat.kaikki().length).toBe(kirjoja);
    });
})