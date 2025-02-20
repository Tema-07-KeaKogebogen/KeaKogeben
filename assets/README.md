# Teknisk dokumentation for Tema 7 gruppeprojekt

Når man er flere der bidrager til en kodebase, lærer man hurtigt, at ens sædvanlige måder at gøre tingene på ikke nødvendigvis er logisk for alle.

Skriv derfor jeres fælles retningslinjer for punkterne herunder(tilføj gerne flere selv), sådan som det giver bedst mening for jer som gruppe. Dokumentationen sikre, at jeres fælles kodebase forbliver overskuelig, er let at arbejde med og til at forstå for alle, og at I undgå konflikter, og har nemmere ved at hjælpe hinanden undervejs.

## Projektstruktur:

Beslut, hvordan I vil organisere jeres projekt – struktur for mapper og filer.

- Hvordan organiserer I billeder, fonte og andre ressourcer?
- Hvor placerer I boilerplate?(fx CSS- og JavaScript-filer, der bruges på tværs af projektet) - er placeret i Assets mappen i form af base filer.
- Hvor placerer I HTML, CSS- og JavaScript-filer til fx detaljevisning og listevisning?

—- Vi har lavet mapper til alle de forskellige filtyper - og billeder/fonte har vi placeret i en undermappe inde i vores assets mappe, dog ligger vores html'er frit

## Navngivning:

Beslutte hvordan i vil navngive filer og mapper for at sikre en ensartet struktur og undgå forvirring.

- Hvordan navngiver I filnavne? (fx små bogstaver, ingen mellemrum, brug af - eller \_)

- Hvordan sikre I at det er til at forstå hvilke HTML-, CSS- og JavaScript-filer der høre sammen?

  —- Vi benytter os af snakecase og små bogstaver til billeder/filnavne. Alle filer der høre sammen hedder det samme f.eks:
  detalje.html - detalje.css - detalje.js

## Link til scripts:

- Hvor placerer I script referencer i HTML'en? (fx i <head> med defer attribute, eller sidst i <body>)

—- Vi linker det i <head> med defer attribute.

## Git branches:

- Hvordan navngiver I branches, så alle kan forstår hvem der arbejder i branchen og på hvad?(fx feature-lotte-formular)

—- Vi skriver “feature-produktliste/index/singleview”, vi skriver ikke navn på da vi har uddelt en specifik side til hver og derfor ved hvem der laver hvad.

## Arbejdsflow:

- Hvordan fordeler I arbejdet, så I undgår at flere arbejder i de samme filer samtidigt?
- Hvordan sikrer I, at commit-beskeder er beskrivende?
- Hvordan kommunikerer i om ændringer i main branchen når feature merges?

—- Vi har uddelt én side til hver person, så hver person har sin egen html, css og js fil og retter kun i dem. I vores commit-beskeder skriver vi “add” eller “remove” alt efter hvad der bliver gjort og skriver så det der enten er added eller removed. Vi har aftalt at der kun er en som retter i main, så undgår vi problemer.

## Kode:

- Hvordan skriver i funktioner i JavaScript?(fx med function keyword eller som arrow functions)
- Beslut hvilken CSS selector i benyttes til referener i henholdsvis CSS og JavaScript(fx. id'er til JavaScript og Classes til CSS)
- Skal filer have korte forklaringer som kommentarer?

—- Vi har brugt både function keyword og arrow functions. I forhold til selector bruger vi “classes” i CSS og “id” til javascript, det kan blandt andet ses i vores filter hvor vi referere til button’s id. Vi har valgt at bruge kommentarer der hvor vi føler der er brug for en ekstra forklaring.

# Funktionalitet

Dette afsnit skal forklare hvad I konkret har arbejde med, for at udvikle websitet. Tænk over hvilke interaktioner brugeren kan foretage på sitet? Eller hvordan websitet håndterer og præsenterer data? Eksempler på funktionalitet, der kan beskrives:

- Hentning af produkter fra API.
- Filtrering af produkter baseret på brugerens valg.
- Dynamisk visning af produkter i HTML.

# API endpoints

Dette afsnit skal liste de endpoints fra API'et i har benyttet:

-- https://dummyjson.com/recipies
-- https://dummyjson.com/recipes/“id”

# Dokumentation af Funktion

Dette afsnit skal beskrive en funktion I selv har udviklet. Det kunne eksempelvis være en funktion der generere en listen over fx. produkter:

- Beskrivelse: Hvad gør funktionen? Hvordan spiller den sammen med resten af koden?
- Parametre: Hvilke input forventes (fx en værdi fra en dropdown eller URL'en)?
- Returnerer: Beskriv, om funktionen returnerer en værdi eller blot manipulerer DOM’en.
- Eksempel på brug: Indsæt funktions-koden herunder(der hvor koden er i eksemplet) og vis, hvordan funktionen kaldes:

-- Vi har lavet denne funktion som laver en liste af opskrifter udfra den valgte "cuisine" og viser derefter filtrerede resultater.
Den henter værdierne fra et dropdown element, er der valgt fx. asiatisk filtreres opskrifterne og viser kun dem der matcher. Funktionens afhænger af "cuisineSelect.value" som giver værdien fra dropdown-elementet og af allRecipes som laver en liste hvor hver opskrift har en cuisine-egenskab. Som retunering manipuleres DOM'en ved at kalde "showList(filteredRecipes)" som opdatere visningen af opskrifterne

```javascript
function filterRecipes() {
  const selectedCuisine = cuisineSelect.value;

  let filteredRecipes = allRecipes;

  if (selectedCuisine !== "All") {
    filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === selectedCuisine);
  }

  showList(filteredRecipes);
}
```
