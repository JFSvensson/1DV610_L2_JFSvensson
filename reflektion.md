## Reflektioner - CelestialFinder
Fredrik Svensson (fs222id) - 1DV610
 
### Reflektion: Namngivning


|Namn | Reflektion |
|---|---|
|CelestialFinder - Modulens ingång, klassnamn | **Use Intention-Revealing Names:** Finder - något som hittar något. Celestial är starkt förknippat astronomiska objekt. Alternativen Star- eller Planet- hade varit begränsande för framtida expansion, och inbegriper inte månen. **Class Name:** Ett substantiv. **Use pronounceable names:** Uttalbart i teorin, kanske inte helt lätt i praktiken.  |
|whereIsTheSun - Klass/Metod för att beräkna solens position | **Avoid Disinformation:** Var är solen? Ja, det är väl det som modulen ska berätta. Onödigt med en fråga, bättre med "hereIsTheSun" eller ännu tydligare "positionOfTheSun". Men då bryter det mot **Method Names** tanke om ett verb för metod. Behöver skilja på klass och metod, kanske "SolarCalculator" och getSolarPosition. | 
|TimeSince2000 - Klass som beräknar tidsavstånd | **Use Problem Domain Name** Inom astronomin finns tydligt definierade perioder att beräkna tid mot (epoch) och skiftet till år 2000 är en sådan. För den som inte kan domänspråket är det dock risk för **Don't Be Cute**. Dit hade definitivt TimeSinceY2K räknats. |
|distanceToTheSun() - Metod som ger avståndet mellan solen och jorden | **Method Names** Inget verb, låter mer som en variabel. I den underliggande klassen WhereIsTheSun finns metoden getDistance, kanske byta till getDistanceToTheSun, eller getSolarDistance. **Use Searchable Names:** Sun är troligen mer sökbart än solar.|
|periapsisOfTheSun() - Metod som ger periapsis, närmsta läget i banan | **Use Solution Domain Name:** Ett exempel på ett namn inom problemområdet, som dessutom inte är den vanligaste benämningen (perigeum för kroppar kring jorden, perihelium runt solen och periastron för stjärnor). Ett närmande till lösningsdomänen kunde vara getClosestApproachOfTheSun. |


### Reflektion: Kapitel 2
Personligen föredrar jag definitivt längre namn än enstaka bokstäver eller förkortningar. Kanske har det med min bakgrund som journalist att göra, där förkortningar oftast ses som läsförstörande otyg. Jag tar mycket lättare till mig "button" jämfört med "btn". På samma sätt blir det svårare att läsa när namnen blir för långa, . 

Att boken förespråkar uttalbara namn ser jag som ytterligare ett sätt att öka läsbarhet och möjlighet att prata om. Det blir mer uppenbart att det verkligen handlar om språk.

Jag tycker dock att bokens korta avsnitt som avhandlar namn på klasser resonerar märkligt. Varför skulle inte klasser blir lättare att förstå om de har lite längre, beskrivande namn? Kanske krockar mina tidigare erfarenheter med Javascripts kortare moduler och komponenter med Javas, ofta långa, klasser.

Min kod innehåller många exempel på metoder och variabler som tillhör problemområdet. Samtidigt är det matematiska termer som behöver vara specifika för att inte riskera att fel värden används i beräkningarna. Viktigt då att jag tillhandhåller bra dokumentation där jag delvis kan tillåta mig lämna kraven på exakthet för att öka förståelsen för vad modulen kan göra för användaren.

När det gäller att ge meningsfull kontext åt namnen har jag exempel som börjar med god tanke, men möjligen slutar lite överdrivet. I beräkningarna finns metoden "calculateEquatorialCoordinates" där tre koordinater beräknas. För att inte kalla dem bara X, Y och Z gav jag dem namnen equatorialX, equatorialY och equatorialZ. Men när dessa senare används ingår de i argumentet equatorialCoordinates, och det får följande konsekvens:

```js
    let declinationRadians = Math.atan2(equatorialCoordinates.equatorialZ, 
      Math.sqrt(equatorialCoordinates.equatorialX * equatorialCoordinates.equatorialX 
        + equatorialCoordinates.equatorialY * equatorialCoordinates.equatorialY))
```

Fem stycken kaka-på-kaka. I efterhand kanske argumentet skulle kallats enbart coordinates.

### Reflektion: Funktioner

|Metod | Antal rader | Reflektion |
|---|---|---|
| whereIsTheMoon() | 100+ | **Small!:** Bryter definitivt mot regeln, mer om det i stycket "Reflektion: Egna erfarenheter". **Do One Thing:** Bryter ordentligt, gör en mängd beräkningar. **Function Arguments:** Dyadisk då den via konstruktorn tar datum och tid på dagen. Skulle kunna göras monadisk om argumentet istället var en kombination av datum och tid, eller ett objekt. **No Side Effects:** Följer, allt den gör har som syfte att beräkna position. **DRY:** Bryter, på så vis att de flesta beräkningar även görs i andra metoder (whereIsTheSun).  |
| importOrbitalElements() | 21 | **Do One Thing:**: Följer då den returnerar banelement beroende på angiven himlakropp. Men enligt boken bryter den regeln då varje fall räknas. **Function Arguments:** Monadisk då den kräver namnet på himlakropp. (Känslig för stor/liten bokstav och stavfel) **Prefer Exceptions:** Bryter, ger felmeddelande, borde kasta undantag men samtidigt återkoppla till användaren. **Structured Programming:** Följer, även om den innehåller flera return så är boken förlåtande i fallet med små funktioner - gränsfall. |
| timeSince2000() | 17 | **Do One Thing:** Bryter, delar både upp datum och beräknar antal dagar. Kan delas upp i två metoder. **Function Arguments:** Dyadisk då konstruktorn tar datum och tid. **Övrigt:** Innehåller kommentarer för att visa formel och förklara "magiska siffror". |
| whereIsTheSun() | 16 | **Small!:** Bryter, men var tidigare nästan lika lång som förstaplatsens whereIsTheMoon, delades sedan upp i ytterligare 15 metoder. **Do One Thing:** Bryter, sätter en mängd variabler som sedan används i andra metoder för att returnera nya variabler, för att till slut räkna ut de två värden som efterfrågas. Kräver en viss eftertanke kring hur det ska lösas. **Function Arguments:** Dyadisk då konstruktorn tar datum och tid. |
| calculateMeanAnomaly(time) | 11 | **Do One Thing:** Bryter, räknar ut medelanomalin, kontrollerar om den är inom intervallet 0-360 grader (annars räknar om den) och räknar om till radianer. Kontrollen kan läggas i egen metod, då samma kontroll görs i annan metod (calculateTrueLongitudeRadian). Omvandlingen till radianer kan göras direkt i uträkningen. **Use Descriptive Name:** Bryter, då den returnerar meanAnomalyRadians och inte meanAnomaly i grader. **Function Arguments:** Monadisk då den kräver tidpunkt för att beräkna. |

### Reflektion: Kapitel 3
Enligt kurslitteraturen ska en funktion vara kort, helst två-tre, möjligen fyra, rader. Det kallas den första, och den andra, regeln. Men för att nå dit tycker jag att "Do One Thing" borde upphöjas till den nollte regeln. För om en följer tanken att en funktion ska göra en sak, och göra den bra, så borde resultatet i de flesta fall bli korta funktioner. Dessutom finns det en viss risk att den som inriktar sig på kortast möjliga funktion skriver funktioner som kanske inte ens gör en sak, eller gör en sak som en annan funktion redan gör, bara på ett till synes annorlunda sätt.

Noterar att det inte framgår hur korta eller långa klasser som är Clean Code. Efter ett år med uppmaningar att dela upp koden i korta moduler eller komponenter, åtminstone vad gäller Javascript, känns bokens exempel, som avslutas med två sidor kod, ganska tungt. Möjligen är det en följd av The Stepdown Rule, att koden ska läsas från början till slut, som gör att så många funktioner samlas i samma modul. Tycker mig se möjligheter att dela upp i delar, kanske setup, include och update, för att ytterligare öka läsbarheten.

Nackdelen blir dock att antalet filer ökar, men med bra namngivning bör inte det blir något större problem.

Delen om antalet lämpliga argument är intressant. Exempelvis har jag inte tidigare funderat kring Flag Arguments, och att det bryter mot Do One Thing. Att det är bättre med två funktioner är något jag definitivt ska försöka ta med mig. Detsamma gäller att minska antalet argument genom att använda objekt, något som är aktuellt i min egen kod.

### Reflektion: Egna erfarenheter
När jag började arbeta med laborationen skrev jag i stort sett alla beräkningar i samma funktion, detta trots att jag läst bokens kapitel och borde ha fått viss erfarenhet genom utbildningens tidigare kurser. Men tänket att "det är bäst att få ner koden snabbt" i kombination med "jag kan fixa det senare" är svårt att arbeta bort. Jag utgick även från att det var svårt att planera strukturen innan beräkningarna blev korrekta, samt att skillnader i beräkningar mellan olika himlakroppar var sådana att det var lika bra att skriva ner koden i separata klasser. Resultatet blev två stora funktion som gjorde en mängd saker, till stora delar på samma sätt.

Med facit i hand hade det inte alls varit svårt att planera. Inte minst eftersom beräkningarna i princip sker stegvis. Istället fick jag lägga ner tid på att bryta ut till separata funktioner, för att följa bokens regler. Resultatet blev små funktioner, som i de flesta fall gör just en sak. Flödet blir också enklare att följa, inte minst då jag istället för kommentarer försökt följa bokens tankar om beskrivande namn.

Nedbrytning till funktioner som gör en sak innebär också att en användare får tillgång till många fler verktyg. Från att bara kunna beräkna en himlakropps position blev det möjligt att få ut resultat i varje enskilt steg.

Den första iterationen av koden blev också svår att felsöka i, och inte minst att testa. Efter utbrytningen är det nu möjligt att köra automatiska enhetstester på mindre delar.

Tyvärr återstår en hel del arbete, som kunnat undvikas, med att ytterligare bryta ner koden i mindre delar, minska upprepningar och inte minst göra den återanvändningsbar för framtida beräkningar av andra himlakroppar.

När det gäller antalet argument som skickas in till funktionerna har det i flera fall varit svårt att undvika tre. Ett exempel är beräkning av koordinater, och då det handlar om positioner i rummet krävs tre värden. Dessa värden beräknas dessutom på olika sätt, så jag valde att låta funktionerna för dessa vara separata, alltså göra en sak. Dock kan resultatet, koordinaterna, med fördel returneras som ett objekt för att i senare skede minska antalet argument.
