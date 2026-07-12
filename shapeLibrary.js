// Eingebaute SVG-Sammlung. Jede Form ist ein einzelner Pfad (bzw. eine
// Basisform), damit sie sich sauber wie die Original-Hand verhaelt.
// Keine Farben/Styles noetig - die Fuellung setzt der Generator.
const SHAPE_LIBRARY = [
    {
        name: 'Herz',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 85 C20 62 8 46 8 30 C8 16 19 8 30 8 C40 8 47 15 50 22 C53 15 60 8 70 8 C81 8 92 16 92 30 C92 46 80 62 50 85 Z"/></svg>'
    },
    {
        name: 'Stern',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 5 L61 39 L97 39 L68 61 L79 95 L50 74 L21 95 L32 61 L3 39 L39 39 Z"/></svg>'
    },
    {
        name: 'Blitz',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M62 5 L28 52 L47 52 L38 95 L74 40 L53 40 Z"/></svg>'
    },
    {
        name: 'Geist',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M20 92 L20 45 A30 30 0 0 1 80 45 L80 92 L68 82 L56 92 L44 82 L32 92 Z"/></svg>'
    },
    {
        name: 'Tropfen',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 6 C50 6 80 46 80 66 A30 30 0 0 1 20 66 C20 46 50 6 50 6 Z"/></svg>'
    },
    {
        name: 'Dreieck',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 8 L92 88 L8 88 Z"/></svg>'
    },
    {
        name: 'Raute',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 6 L90 50 L50 94 L10 50 Z"/></svg>'
    },
    {
        name: 'Sechseck',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 5 L89 27 L89 73 L50 95 L11 73 L11 27 Z"/></svg>'
    },
    {
        name: 'Kreuz',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M38 8 L62 8 L62 38 L92 38 L92 62 L62 62 L62 92 L38 92 L38 62 L8 62 L8 38 L38 38 Z"/></svg>'
    },
    {
        name: 'Kreis',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="42"/></svg>'
    },
    {
        name: 'Pfeil',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M8 40 L55 40 L55 18 L92 50 L55 82 L55 60 L8 60 Z"/></svg>'
    },
    {
        name: 'Wolke',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M28 74 A18 18 0 0 1 27 39 A22 22 0 0 1 68 34 A16 16 0 0 1 74 74 Z"/></svg>'
    }
];
