# use-window-size-hook

> React Hook to monitor window size &amp; layout according to Bootstrap 4 breakpoints.

[![NPM](https://img.shields.io/npm/v/use-window-size-hook.svg)](https://www.npmjs.com/package/use-window-size-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-window-size-hook
```

or

```bash
yarn add use-window-size-hook
```

## Usage

### Updates only when user stops resizing

```jsx
import React from 'react'

import { useWindowSize } from 'use-window-size-hook'

const App = () => {
  const {
    width,
    height,
    screenLayout,
  } = useWindowSize();

  return (
    <>
      <p>
        {`Window width: ${width}`}
      </p>
      <p>
        {`Window height: ${height}`}
      </p>
      <p>
        {`Screen layout according to Bootstrap 4: ${screenLayout}`}
      </p>
    </>
  )
}
```

### Updates continuously, at every resize event

```jsx
import React from 'react'

import useWindowSize from 'use-window-size-hook'

const App = () => {
  const {
    width,
    height,
    screenLayout,
  } = useWindowSize(false);

  return (
    <>
      <p>
        {`Window width: ${width}`}
      </p>
      <p>
        {`Window height: ${height}`}
      </p>
      <p>
        {`Screen layout according to Bootstrap 4: ${screenLayout}`}
      </p>
    </>
  )
}
```

### Easily compare layout breakpoints

```jsx
import React from 'react'

import useWindowSize, { layout } from "use-window-size-hook";

const App = () => {
  const { screenLayout } = useWindowSize();

  const isBiggerThanMd = screenLayout > layout.md;

  return (
    <>
      <p>
        {isBiggerThanMd ? "Layout is bigger than md" : "Layout is md or smaller"}
      </p>
    </>
  )
}
```

## License

MIT © [pedro-lb](https://github.com/pedro-lb)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
