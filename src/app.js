import { Controller } from './controller/Controller.js';

const app = () => {
  const controller = new Controller();
  controller.start();
};

export default app;
