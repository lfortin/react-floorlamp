import { Component } from "react";

export declare class FloorLamp {
  #components: Map<string, Component | MockComponent>;
  constructor();
  addComponent(
    componentName: string,
    component: Component | MockComponent
  ): void;
  removeComponent(componentName: string): void;
  getComponent(componentName: string): Component | MockComponent;
  setState(
    componentName: string | Array<string>,
    state:
      | Record<string, any>
      | ((prevState: Record<string, any>) => Record<string, any>),
    cb?: () => void
  ): void;
}

interface MockComponent {
  setState(
    state:
      | Record<string, any>
      | ((prevState: Record<string, any>) => Record<string, any>),
    cb?: () => void
  ): void;
}
