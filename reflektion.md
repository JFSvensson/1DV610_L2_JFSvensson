## Reflektion
Fredrik Svensson (fs222id)

### Namngivning (Kapitel 2)


|Namn | Reflektion |
|--|--|
|timeSince2000 - Klassnamn | xx |
|whereIsTheSun - funktion | xx positionOfTheSun |
|CelestialFinder - Klassnamn | xx |
|calculateObliquityOfTheEclipticRadians - funktion | Långt, radians inte nödvändigt? |
|equatorialCoordinates.equatorialY - Variabel | Långt och onödigt upprepande av equatorial. |


### 


### Funktioner (Kapitel 3)
När jag började arbeta med laborationen skrev jag i stort sett alla beräkningar i samma funktion, detta trots att jag läst bokens kapitel och borde ha fått viss erfarenhet i tidigare kurser. Men tänket att "det är bäst att få ner koden snabbt" i kombination med "jag kan fixa det senare" är svårt att arbeta bort. Jag utgick även från att det var svårt att planera strukturen innan beräkningarna blev korrekta, samt att skillnader i beräkningar mellan olika himlakroppar var sådana att det var lika bra att skriva ner koden i separata klasser. Resultatet blev en stor funktion som gjorde en mängd saker.

Med facit i hand hade det inte alls varit svårt att planera. Inte minst eftersom beräkningarna i princip sker stegvis. Istället fick jag lägga ner tid på att bryta ut till separata funktioner, för att följa bokens regler. Resultatet blev små funktioner, som i de flesta fall gör just en sak. Flödet blir också enklare att följa, inte minst då jag istället för kommentarer försökt följa bokens tankar om beskrivande namn.

Nedbrytning till funktioner som gör en sak innebär också att en användare får tillgång till många fler verktyg. Från att bara kunna beräkna en himlakropps position blev det möjligt att få ut resultat i varje enskilt steg.

Den första iterationen av koden blev också svår att felsöka i, och inte minst att testa. Efter utbrytningen är det nu möjligt att köra automatiska enhetstester på mindre delar.

Tyvärr återstår en hel del arbete, som kunnat undvikas, med att ytterligare bryta ner koden i mindre delar, minska upprepningar och inte minst göra den återanvändningsbar för framtida beräkningar av andra himlakroppar.

När det gäller antalet argument som skickas in till funktionerna har det i flera fall varit svårt att undvika tre. Ett exempel är beräkning av koordinater, och då det handlar om positioner i rummet krävs tre värden. Dessa värden beräknas dessutom på olika sätt, så jag valde att låta funktionerna för dessa vara separata, alltså göra en sak. Dock kan resultatet, koordinaterna, med fördel returneras som ett objekt för att i senare skede minska antalet argument.



## Egna erfarenheter

