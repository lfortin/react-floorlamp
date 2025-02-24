# react-floorlamp

[![install and test](https://github.com/lfortin/react-floorlamp/actions/workflows/node.js.yml/badge.svg?branch=master&event=push)](https://github.com/lfortin/react-floorlamp/actions/workflows/node.js.yml)

Straightforward state management for React. Released under the [MIT License](https://opensource.org/license/mit).

## Installation

To install the latest stable version of `react-floorlamp`:

    npm install react-floorlamp

# React State Management in 2 Easy Steps

Manage state efficiently across your React components in two easy steps.

## Step 1: Bind a functional component using the useFloorLamp hook

First, bind a functional component using the `useFloorLamp` hook.

```jsx
import { useFloorLamp } from "react-floorlamp";

function LightBulb() {
  const [ state, setState ] = useFloorLamp("LightBulb", { on: false, caption: "Light is off" });

  const toggleLight = () => {
    setState(prevState => ({
      on: !prevState.on,
      caption: prevState.on ? "Light is off" : "Light is on",
    }));
  };

  return (
    <div>
      <button onClick={toggleLight}>
        {state.on ? "Turn off" : "Turn on"} the light
      </button>
      <p>{state.caption}</p>
    </div>
  );
}
```

## Step 2: Update the State from Anywhere

You can update the state from anywhere in your application by calling setState using the `floorLamp` instance.

```javascript
import { floorLamp } from "react-floorlamp";

// passing an object
floorLamp.setState("LightBulb", { on: true, caption: "Light is on" }, () => {
  // optional callback
});

// passing an updater function
floorLamp.setState("LightBulb", prevState => {
  let count = prevState.count || 0;
  count++;

  return {
    on: !prevState.on,
    caption: prevState.on ? "Light is off" : "Light is on",
    count: count
  };
});
```

# Binding a React.Component Instance

`react-floorlamp` also supports binding a React.Component instance in its lifecycle methods. You can do this in the `componentDidMount` method, where you register the component, and in the `componentWillUnmount` method to ensure proper cleanup.

```jsx
import React from "react";
import { floorLamp } from "react-floorlamp";

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

# License

`react-floorlamp` is released under the [MIT License](https://github.com/lfortin/react-floorlamp/blob/master/LICENSE).

**100% Free:** `react-floorlamp` can be used freely in both proprietary and open-source projects.

**Attribution is required:** You must retain the author's name and the license information in any distributed code. These items do not need to be user-facing and can remain within the codebase.
