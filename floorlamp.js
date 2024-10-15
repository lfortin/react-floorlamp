"use strict";
// react-floorlamp
// Straightforward state management for React
// Copyright (c) 2024 lfortin
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

class FloorLamp {
  #components;

  constructor() {
    this.#components = new Map();
  }

  addComponent(componentName, component) {
    this.#components.set(componentName, component);
  }

  removeComponent(componentName) {
    this.#components.delete(componentName);
  }

  getComponent(componentName) {
    return this.#components.get(componentName);
  }

  setState(componentName, state, cb) {
    if (Array.isArray(componentName)) {
      for (const name of componentName) {
        this.setState(name, state, cb);
      }
    } else if (this.#components.has(componentName)) {
      const component = this.#components.get(componentName);
      if (component.setState) {
        // Update the component's state with optional callback
        component.setState(state, cb);
      } else {
        throw new Error(
          `Component "${componentName}" does not have a setState method.`
        );
      }
    } else {
      throw new Error(`Component "${componentName}" not found.`);
    }
  }

  // Get the state of a specific component
  getState(componentName) {
    return this.#components.get(componentName)?.state || null;
  }

  // Optional: List all components
  listComponents() {
    return Array.from(this.#components.keys());
  }
}

module.exports = {
  FloorLamp,
};
