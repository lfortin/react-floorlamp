# react-floorlamp

[![install and test](https://github.com/lfortin/react-floorlamp/actions/workflows/node.js.yml/badge.svg?branch=master&event=push)](https://github.com/lfortin/react-floorlamp/actions/workflows/node.js.yml)

Straightforward state management for React. Released under the [MIT License](https://opensource.org/license/mit).

## Installation

To install the latest stable version of `react-floorlamp`:

    npm install react-floorlamp

# React State Management in 3 Easy Steps

Manage state efficiently across your React components in three easy steps.

## Step 1: Create Your Instance of FloorLamp

First, create an instance of `FloorLamp` in a module.

```javascript
// in a file: floor-lamp.js
import { FloorLamp } from "react-floorlamp";

export const floorLamp = new FloorLamp();
```

## Step 2: Bind a React.Component Instance

Next, bind a React component instance in its lifecycle methods. You can do this in the `componentDidMount` method, where you register the component, and in the `componentWillUnmount` method to ensure proper cleanup.

```jsx
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
    // Bind the component instance
    floorLamp.addComponent("CaptionDisplay", this);

    // Optionally manage a collection of instances using props
    floorLamp.addComponent(`CaptionDisplay${this.props.id}`, this);
  }

  componentWillUnmount() {
    // Unbind the component instance on unmount
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

## Step 3: Update the State from Anywhere

You can update the state from anywhere in your application by calling setState using the `FloorLamp` instance.

```javascript
import { floorLamp } from "./floor-lamp.js";

// passing an object
floorLamp.setState("CaptionDisplay", { caption: "hello world" }, () => {
  // optional callback
});

// passing an updater function
floorLamp.setState("CaptionDisplay", prevState => {
  let count = prevState.count || 0;
  count++;

  return {
    caption: "hello world",
    count: count
  };
});
```

## Binding a Mock Component Using a State Hook

You can also bind a mock component using a state hook for functional components.

```jsx
import { useState, useEffect } from "react";
import { floorLamp } from "./floor-lamp.js";

function CaptionDisplay(props) {
  const [caption, setCaption] = useState("Default Caption");

  const mockComponent = {
    setState: (state) => {
      if (typeof state === 'function') {
        // state might be an updater function :)
      }
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
