const kirja = require('./kirja');
const Kirja = kirja.Kirja;

let kjat = [
    new Kirja({nimi: "Git for Dummies", kirjoittajat:"Samu", isbn: "0-14-007621-2"}),
    new Kirja({nimi: "Node for Consultants",kirjoittajat:  ["Toni", "Tommi"], isbn: "951-0-20711-X"}),
    new Kirja({nimi: "C Programming Language, 2nd Edition",kirjoittajat:  [" Brian W. Kernighan", "Dennis M. Ritchie"], isbn: "0-13-110362-8"}),
    new Kirja({nimi: "Compilers: Principles, Techniques, and Tools",kirjoittajat:  ["Alfred V. Aho", "Ravi Sethi", "Jeffrey D. Ullman"], isbn: "0201100886"}),
    new Kirja({nimi: "Learning Node.js Development", kirjoittajat:"Andrew Mead", isbn: "1-78-8395549-"}),
    new Kirja({nimi: "React Quickly: Painless web apps with React, JSX, Redux, and GraphQL", kirjoittajat:"Azat Mardan", isbn: "1617293342"}),
];

class Kirjat {
    constructor() {
        this.kirjalista = kjat;
    }
    // Missä kaikki() on?
    lisää(kirja) {
        for (let i = 0 ; i < this.kirjalista.length ; ++i) {
            if (this.kirjalista[i].hasISBN(kirja.isbn)) {
                throw new Error(`Kirja, jolla isbn ${kirja.isbn} löytyy jo listalta"`);
            }
        }
        this.kirjalista.push(new Kirja(kirja));
    }
    poista(isbn) {
        for (let i = 0 ; i < this.kirjalista.length ; ++i) {
            if (this.kirjalista[i].hasISBN(isbn)) {
                return this.kirjalista.splice(i, 1)[0];
            }
        }
    }
    haeYksi(isbn) {
        const kirjat = this.kirjalista.filter(kirja => kirja.hasISBN(isbn));
        if (kirjat.length === 0) return null;
        return kirjat[0];
    }
    etsi(nimi) {
        var re = new RegExp(nimi, 'i');
        const kirjat = this.kirjalista.filter(kirja => kirja.nimi.match(re));
        return kirjat;
    }
    kirjailijanKirjat(kirjailija) {
        const kirjat = this.kirjalista.filter(kirja => {
            return kirja.kirjoittajat.filter(nimi => {
                return nimi.includes(kirjailija);
            }).length > 0;
        });
        return kirjat;
    }
}

module.exports = new Kirjat();