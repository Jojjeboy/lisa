# Sakai19

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.



## Länkar
[https://sakai.primeng.org/ Template](https://sakai.primeng.org/)
[PrimeNG Components](https://primeng.org/autocomplete)



## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Inklistrat


## Bygg 
```bash
npm run build --output-path="docs" --base-href=""
```
## Ändra
```bash
<base href="/">
```

Till: 
```bash
<base href="">
```
# Länkar

https://github.com/Codemelia/basic-todo-app/blob/master/src/app/services/storage.service.ts
https://github.com/Jojjeboy/doneit/tree/master/src/app
https://primeng.org/autocomplete
https://github.com/Jojjeboy/lisa/actions


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