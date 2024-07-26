# Project setup
## Use Vite front end tooling with react, typescript and Mantine UI library
### Create a Vite project using the react-ts template
[Vite Guide/Getting Started](https://vitejs.dev/guide/)

```PS
npm create vite@latest platapi -- --template react-ts

cd platapi
npm install
npm run dev
```
### Add Mantine and required dev packages
[Mantine Getting Started](https://mantine.dev/getting-started/)

Follow the Getting started without a framework section.

Install dependancies:
```PS
npm install @mantine/core @mantine/hooks
```
Install PostCSS p;ugins and postcss-preset-mantine:
```PS
npm install --save-dev postcss postcss-preset-mantine postcss-simple-vars
```
Create postcss.config.cjs file at the root of your application with the following content:
```JS
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```
By default, VS Code does not recognize postcss syntax, you need to install PostCSS Intellisense and Highlighting to enable syntax highlighting and suppress variables ($variable) errors.

To get CSS variables autocomplete, install CSS Variable Autocomplete extension. Then create .vscode/settings.json file in the root folder of your project with the following content:

```json
{
  "cssVariables.lookupFiles": [
    "**/*.css",
    "**/*.scss",
    "**/*.sass",
    "**/*.less",
    "node_modules/@mantine/core/styles.css"
  ]
}
```
Delete the app.css and index.css files.
```PS
del src/*.css
```
Make the folowing changes to main.tsx
```TSX
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'index.css' <---Delete
import '@mantine/core/styles.css' <---Add
```

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

Replace the contents of the App.tsx.
```TS
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider defaultColorScheme="auto">
      {/* Your app here */}
    </MantineProvider>
  );
}
