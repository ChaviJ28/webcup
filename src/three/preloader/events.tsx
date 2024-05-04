import { resizeCamera } from "./camera";
import { resizeRenderer } from "./renderer";
import debounce from "lodash/debounce";

let resizeEventsListener: () => void;

export const createEvents = () => {
  resizeEventsListener = debounce(() => resizeEvents(), 500);
  window.addEventListener("resize", resizeEventsListener);
};

export const resizeEvents = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  resizeCamera(width, height);
  resizeRenderer(width, height);
};

export const removeEvents = () => {
  window.removeEventListener("resize", resizeEventsListener);
};
