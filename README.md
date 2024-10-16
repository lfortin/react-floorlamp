# react-floorlamp

[![install and test](https://github.com/lfortin/react-floorlamp/actions/workflows/node.js.yml/badge.svg?branch=master&event=push)](https://github.com/lfortin/react-floorlamp/actions/workflows/node.js.yml)

Straightforward state management for React. Released under the [MIT License](https://opensource.org/license/mit).

## Installation

To install the latest stable version of `react-floorlamp`:

    npm install react-floorlamp

# React state management in 3 easy steps

## 1-create your instance of FloorLamp in a module

```javascript
// in a file floor-lamp.js
import { FloorLamp } from "react-floorlamp";

export const floorLamp = new FloorLamp();
```

## 2-bind a React.Component instance

```javascript
import React from "react";
import { floorLamp } from "./floor-lamp.js";

class CaptionDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      caption: "Default Caption",
    };
  }

  componentDidMount() {
    floorLamp.addComponent("CaptionDisplay", this);

    // or using a prop value for managing a collection of React.Component instances
    floorLamp.addComponent(`CaptionDisplay${this.props.id}`, this);
  }

  componentWillUnmount() {
    floorLamp.removeComponent("CaptionDisplay");
    floorLamp.removeComponent(`CaptionDisplay${this.props.id}`);
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
```

## 3-update the state from anywhere

```javascript
import { floorLamp } from "./floor-lamp.js";

floorLamp.setState("CaptionDisplay", { caption: "hello world" }, () => {
  // optional callback
});
```

## binding a mock component using a state hook

```javascript
import { useState, useEffect } from "react";
import { floorLamp } from "./floor-lamp.js";

function CaptionDisplay(props) {
  const [caption, setCaption] = useState("Default Caption");

  const mockComponent = {
    setState: (state) => {
      if (state.caption) {
        setCaption(state.caption);
      }
    },
  };

  useEffect(() => {
    floorLamp.addComponent("CaptionDisplay", mockComponent);
    return () => {
      floorLamp.removeComponent("CaptionDisplay");
    };
  }, []);

  return (
    <div>
      <h1>Caption Display</h1>
      <p>{caption}</p>
    </div>
  );
}
```
