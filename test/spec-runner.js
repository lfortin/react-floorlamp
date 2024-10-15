const assert = require("node:assert");
const { FloorLamp } = require("../floorlamp");

const floorLamp = new FloorLamp();

// TODO: add more tests

describe("react-floor-lamp", () => {
  describe("addComponent", () => {
    it("should add component", async () => {
      const component = {};
      floorLamp.addComponent("component", component);
      assert.strictEqual(floorLamp.getComponent("component"), component);
    });
  });
  describe("removeComponent", () => {
    it("should remove component", async () => {
      const component = {};
      floorLamp.addComponent("component", component);
      floorLamp.removeComponent("component");
      assert.strictEqual(floorLamp.getComponent("component"), undefined);
    });
  });
  describe("setState", () => {
    it("should set state", (done) => {
      const component = {
        setState: () => {
          done();
        },
      };
      floorLamp.addComponent("component", component);
      floorLamp.setState("component", {});
    });
    it("should set state for a list of components", (done) => {
      let count = 0;
      const component = {
        setState: () => {
          count++;
          if (count === 2) {
            done();
          }
        },
      };
      floorLamp.addComponent("component1", component);
      floorLamp.addComponent("component2", component);
      floorLamp.setState(["component1", "component2"], {});
    });
  });
});
