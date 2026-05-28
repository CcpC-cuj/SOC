import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

const createStorageMock = () => {
  let store = {};

  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(
        store,
        key
      )
        ? store[key]
        : null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
};

Object.defineProperty(
  globalThis,
  "localStorage",
  {
    value: createStorageMock(),
    configurable: true,
  }
);

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});

if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  });
}

if (!window.scrollTo) {
  window.scrollTo = () => {};
}
