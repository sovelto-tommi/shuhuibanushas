const kirja = require('../service/kirja');
const Kirja = kirja.Kirja;

describe('Testataan kirjoja', ()=> {
    test('voidaan luoda kirja konstruktorin avulla', () => {
        expect(new Kirja("Nimi", "kirjailija","00")).toBeDefined();
        expect(new Kirja("Nimi", ["kirjailija", "toinen"], "00"));
        let kirja = {nimi: "Nimi", kirjoittajat: "muu", isbn:"00"};
        expect(new Kirja(kirja)).toBeDefined();
        kirja.kirjoittajat = ["Dude", "Dudette"];
        expect(new Kirja(kirja)).toBeDefined();
    });
    test('konstruktori tekee tarkistuksia', () => {
        expect(() => new Kirja("Nimi", "kirjailija","01")).toThrowError();
        expect(()=>new Kirja("Nimi", null, "00")).toThrowError();
        let kirja = {nimi: "Nimi", kirjoittajat: "muu"};
        expect(() => new Kirja(kirja)).toThrowError("tietotyyppi");
    });
    test('isbn validointi toimii oikealla ISBN tunnuksella eri muodoissa', () => {
        const validiIsbnIlmanVälimerkkejä = "1530204062";
        expect(kirja.isValidISBN(validiIsbnIlmanVälimerkkejä)).toBe(true);
        const validiIsbnVäliviivoilla = "1-53-020406-2";
        expect(kirja.isValidISBN(validiIsbnVäliviivoilla)).toBe(true);
        const validiIsbnVälilyönneillä = "1 53 020406 2";
        expect(kirja.isValidISBN(validiIsbnVälilyönneillä)).toBe(true);
        const validiIsbnViivoillaJaVäleillä = "1 5302-0406 2";
        expect(kirja.isValidISBN(validiIsbnViivoillaJaVäleillä)).toBe(true);
        const validiIsbnIlmanXTarkistusnumerolla = "193020406X";
        expect(kirja.isValidISBN(validiIsbnIlmanXTarkistusnumerolla)).toBe(true);
        const validiIsbnNumerona = 1530204062;
        expect(kirja.isValidISBN(validiIsbnNumerona)).toBe(true);
    });
    test('isbn validointi heittää poikkeuksen huonolla isbn-numerolla', () => {
        const isbnVäärälläTarkistusmerkillä = "1530204063";
        expect(kirja.isValidISBN(isbnVäärälläTarkistusmerkillä)).toBe(false);
        expect(() => {kirja.isValidISBN()}).toThrowError();
    });
    test('Kirjan nimen voi muuttaa', () => {
        const kirja = new Kirja("Nimi", "kirjailija","00");
        kirja.nimi = "Toinen";
        expect(kirja.nimi).toBe("Toinen");
    })
    test('kirjailijoiden muuttaminen onnistuu merkkijonolla tai taulukolla', () => {
        const kirja = new Kirja("Nimi", "kirjailija", "00");
        kirja.kirjoittajat = "Toinen";
        expect(kirja.kirjoittajat instanceof Array).toBe(true);
        expect(kirja.kirjoittajat.length).toBe(1);
        expect(kirja.kirjoittajat).toContain("Toinen");
    });
    test('ISBN-koodin muuttaminen käyttää validointia', () => {
        const kirja = new Kirja("Nimi", "kirjailija","00");
        kirja.isbn = "012";
        expect(kirja.isbn).toBe("012");
        expect(()=>kirja.isbn="0123").toThrowError("Invalid");
        expect(()=>kirja.isbn=null).toThrowError("tietotyyppi");
    });
    test('kirjan ISBN numeron yhtäsuuruuden voi tarkistaa', () => {
        const kirja = new Kirja("Nimi", "kirjailija","1-53-020406-2");
        expect(kirja.hasISBN("1-53-020406-2")).toBe(true);
        expect(kirja.hasISBN("1530204062")).toBe(true);
        expect(kirja.hasISBN("1-53-0 20406 2")).toBe(true);
        expect(kirja.hasISBN("00")).toBe(false);
        expect(kirja.hasISBN("1-53-020406-")).toBe(false);
    })
});
