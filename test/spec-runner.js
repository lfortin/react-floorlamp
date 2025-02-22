const assert = require("node:assert");
const { FloorLamp, useFloorLamp } = require("../floorlamp.js");

const floorLamp = new FloorLamp();

describe("react-floorlamp", () => {
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
    it("should set state using an object", (done) => {
      const component = {
        setState: (state) => {
          assert.deepStrictEqual(state, {
            caption: "hello world",
            status: "OK",
          });
          done();
        },
      };
      floorLamp.addComponent("component", component);
      floorLamp.setState("component", {
        caption: "hello world",
        status: "OK",
      });
    });
    it("should set state using a function", (done) => {
      const component = {
        setState: (state) => {
          assert.deepStrictEqual(state(), {
            caption: "hello world",
            status: "OK",
          });
          done();
        },
      };
      floorLamp.addComponent("component", component);
      floorLamp.setState("component", () => {
        return {
          caption: "hello world",
          status: "OK",
        };
      });
    });
    it("should set state with a callback", (done) => {
      const component = {
        setState: (state, cb) => {
          assert.deepStrictEqual(state, {
            caption: "hello world",
            status: "OK",
          });
          cb();
        },
      };
      floorLamp.addComponent("component", component);
      floorLamp.setState(
        "component",
        {
          caption: "hello world",
          status: "OK",
        },
        () => done()
      );
    });
    it("should set state for a list of components", (done) => {
      let count = 0;
      const component = {
        setState: (state) => {
          assert.deepStrictEqual(state, {
            caption: "hello world",
            status: "OK",
          });

          count++;

          if (count === 3) {
            done();
          }
        },
      };
      floorLamp.addComponent("component1", component);
      floorLamp.addComponent("component2", component);
      floorLamp.addComponent("component3", component);
      floorLamp.setState(["component1", "component2", "component3"], {
        caption: "hello world",
        status: "OK",
      });
    });
    it("should throw if component not found", async () => {
      assert.throws(() => {
        floorLamp.setState("invalid-component", {});
      });
    });
    it("should throw if component.setState() method not found", async () => {
      assert.throws(() => {
        floorLamp.addComponent("component", {});
        floorLamp.setState("component", {});
      });
    });
    it("should throw if state is not an object or a function", async () => {
      floorLamp.addComponent("component", {});

      assert.throws(
        () => {
          floorLamp.setState("component", null);
        },
        (err) => {
          assert.strictEqual(
            err.message,
            `State update on component "component" failed: must be an object or a function.`
          );
          return true;
        }
      );

      assert.throws(
        () => {
          floorLamp.setState("component", undefined);
        },
        (err) => {
          assert.strictEqual(
            err.message,
            `State update on component "component" failed: must be an object or a function.`
          );
          return true;
        }
      );
      assert.throws(
        () => {
          floorLamp.setState("component", "hello world");
        },
        (err) => {
          assert.strictEqual(
            err.message,
            `State update on component "component" failed: must be an object or a function.`
          );
          return true;
        }
      );
      assert.throws(
        () => {
          floorLamp.setState("component", 123);
        },
        (err) => {
          assert.strictEqual(
            err.message,
            `State update on component "component" failed: must be an object or a function.`
          );
          return true;
        }
      );
      assert.throws(
        () => {
          floorLamp.setState("component", true);
        },
        (err) => {
          assert.strictEqual(
            err.message,
            `State update on component "component" failed: must be an object or a function.`
          );
          return true;
        }
      );
    });
  });
});
