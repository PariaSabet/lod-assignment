# LOD Assignment

This project is a web application built using Vue.js, Vite, and Tailwind CSS. It integrates Firebase for backend services and uses Netlify for serverless functions.

The app is hosted on Netlify:
https://lod-assignment.netlify.app/

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Build](#build)
- [Preview](#preview)
- [Linting and Formatting](#linting-and-formatting)
- [Dependencies](#dependencies)
- [Project Structure](#project-structure)

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Development

To start the development server, run:

```bash
npm run dev
```

This will start a local server at `http://localhost:3000` where you can view the application.

## Build

To build the project for production, run:

```bash
npm run build
```

The output will be in the `dist` directory.

## Preview

To preview the production build locally, run:

```bash
npm run preview
```

## Linting and Formatting

To lint the project files, run:

```bash
npm run lint
```

To format the project files, run:

```bash
npm run format
```

## Dependencies

The project uses the following main dependencies:

- Vue.js
- Vite
- Tailwind CSS
- Firebase
- Pinia (state management)
- Vue Router
- Netlify Functions

## Project Structure

- `src/`: Contains the source code for the application.
- `public/`: Static assets.
- `netlify/`: Contains serverless functions.
- `dist/`: The production build output.
- `.vscode/`: VSCode specific settings.
- `.git/`: Git version control directory.

## Environment Variables

The project uses a `.env` file for environment variables. Ensure you have the necessary variables set up before running the application.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
