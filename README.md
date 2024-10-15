# react-floorlamp

[![Node.js (install and test)](https://github.com/lfortin/react-floorlamp/actions/workflows/node.js.yml/badge.svg?event=push)](https://github.com/lfortin/react-floorlamp/actions/workflows/node.js.yml)

Straightforward state management for React. Released under the [MIT License](https://opensource.org/license/mit).

## Installation

To install the latest stable version of `react-floorlamp`:

    npm install react-floorlamp

# React state management in 3 easy steps

## 1-create your instance of FloorLamp in a module

```javascript
// in a file floor-lamp.js
import { FloorLamp } from "react-floorlamp";

const floorLamp = new FloorLamp();

export floorLamp;
```

## 2-bind a React.Component instance

```javascript
import React from 'react';
import { floorLamp } from './floor-lamp.js'

class CaptionDisplay extends React.Component {
  constructor(props) {
    super(props);

    floorLamp.addComponent('CaptionDisplay', this);

    // or using a prop value for managing a collection of React.Component instances
    // floorLamp.addComponent(`CaptionDisplay${props.id}`, this);

    this.state = {
      caption: 'Default Caption',
    };
  }

  render() {
    return (
      <div>
        <h1>Caption Display</h1>
        <p>{this.state.caption}</p>
      </div>
    );
  }
}

export default CaptionDisplay;
```

## 3-update the state from anywhere

```javascript
import { floorLamp } from './floor-lamp.js'

floorLamp.setState('CaptionDisplay', {caption: 'hello world'}, () => {
  // optional callback
});
```
