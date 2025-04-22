# Tankar

## Komponenter
Hanterar data inom komponenten och skickar komponent data och eventuella id till Data-Service


## Data-Service
Tar emot komponentdata och skickar strängdata till Persistens-Service
- Ska inte hantera logik för komponenter
- Ska transformera sträng <> Typ


## Persistens-Service
Tar emot strängdata och returnerar sträng.
- Har ingen kunskap om datatyp eller. 