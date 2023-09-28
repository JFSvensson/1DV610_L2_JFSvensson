# Testrapport - CelestialFinder
Fredrik Svensson (fs222id) - 1DV610

## Automatiska enhetstester
Ramverk: Jest.

Testerna körs efter att på lämpligt sätt plockat ner koden från GitHub genom `npm test`. Dock krävs viss modifikation av ./lib/ImportOrbitalElements.js, där importerna behöver kommenteras bort, och i filen nedanstående importer kommenteras av. Anledningen är Jests oförmåga att hantera "assert { type: 'json' }" som node.js kräver att import av json-filer förses med.


### Import av banelement
De banelement som används i beräkningarna importeras från json-filer. Det är viktigt att dessa värden är korrekta, vilket testats genom att jämföra importen av några slumpvis utvalda element med de förväntade värdena (de som finns angivna i filen och som hämtats från https://stjarnhimlen.se/comp/ppcomp.html).

Testfil: ImportOrbitalElements.test.js

|Vad som testats | Hur det testats | Resultat |
|---|---|---|
| ImportOrbitalElements('sun') - Om det i json-filen angivna värdet importeras korrekt. | Banelementen för solen importeras, det förväntade värdet på den konstanta delen av M (Mean anomaly) jämfördes med angivna. | Lyckat |
| ImportOrbitalElements('sun') - Om det i json-filen angivna värdet importeras korrekt. | Banelementen för solen importeras, det förväntade värdet på a (medelavståndet från jorden i AU, avståndet jorden-solen) jämfördes med angivna. | Lyckat |
| ImportOrbitalElements('moon') - Om det i json-filen angivna värdet importeras korrekt. | Banelementen för månen importeras, det förväntade värdet på a (medelavståndet från jorden i jordradier) jämfördes med angivna. | Lyckat |
| ImportOrbitalElements('mercury') - Om det i json-filen angivna värdet importeras korrekt. | Banelementen för merkurius importeras, det förväntade värdet på a (medelavståndet från jorden i AU) jämfördes med angivna. | Lyckat |

### Förfluten tid sedan år 2000
Avståndet i dagar räknat från midnatt mellan den 31 december 1999 och 1 januari 2000 beräknas via en formel. Jag har valt några datum och räknat ut skillnaden för att testa modulens uträkningar. 

Testfil: TimeSince2000.test.js

|Vad som testats | Hur det testats | Resultat |
|---|---|---|
| TimeSince2000('2000-01-01') | Modulens uträkning jämförs med förväntade noll dagar | Misslyckat - 1 dag fel, korrigerar formeln.* | 
| TimeSince2000('2000-01-01') | Modulens uträkning jämförs med förväntade 0 dagar | Lyckat |
| TimeSince2000('2000-01-02') | Modulens uträkning jämförs med förväntade 1 dag | Lyckat |
| TimeSince2000('1999-12-31') | Modulens uträkning jämförs med förväntade -1 dag | Lyckat |
| TimeSince2000('1999-01-01') | Modulens uträkning jämförs med förväntade -365 dagar | Lyckat |
| TimeSince2000('1000-01-01') | Modulens uträkning jämförs med förväntade -365242 dagar | Lyckat |
| TimeSince2000('2023-09-10') | Modulens uträkning jämförs med förväntade 8653 dagar | Lyckat |

*Misslyckat test berodde på att den innevarande dagen räknades med i formeln.

### Solens position
Solens position sett från solen beräknas med viss osäkerhet. Testet kontrollerar därför om resultatet ligger mellan två värden där skillnaden är ett uppskattat godtagbart fel. Jämförvärdet har tagits från https://www.suncalc.org/. 

Testfil: WhereIsTheSun.test.js

|Vad som testats | Hur det testats | Resultat |
|---|---|---|
| WhereIsTheSun('2023-09-10', 12) | Modulens beräknade värden på rektascension kontrolleras mot ett min- och ett max-värde | Lyckat |


## Testapplikation
Då jag har publicerat modulen som ett npm-paket (https://www.npmjs.com/package/celestialfinder) har jag även testat installation och funktion i en testapplikation. Appen är enklast möjliga, en javascript-fil som importerar modulen, kör några metoder och loggar resultatet till konsolen.

|Vad som testats | Hur det testats | Resultat |
|---|---|---|
| Installation | Körde kommandot "npm i celestialfinder" | Lyckat - Modulen installerades |
| Import | Använde koden "import CelestialFinder from 'CelestialFinder' | Misslyckat - Modulen hittades inte |
| Import | Använde koden "import CelestialFinder from 'celestialfinder' | Lyckat - Modulen hittades |
| CelestialFinder('2010-10-12', 16) | Få fram värden för solens position den 12 oktober 2010 | Lyckat - Objekt med värden genereras | 
| Korrekthet för genererade värden | Värden för solens position den 12 oktober 2010 jämförs med de på suncalc.org | Misslyckas - Deklinationen stämmer hyfsat, rektascension är helt fel... |

**Kommentar:** Något verkar vara fel med beräkningarna och felsökning måste göras. Förslagsvis görs fler automatiska enhetstester som det under rubriken "Solens position" för att kontrollera om det resultatet var en slump.