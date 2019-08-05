// @ts-ignore
import NProgress from 'nprogress';

export default class NProgressHelper {
  constructor() {
    NProgress.configure({
      minimum: 0.1,
      showSpinner: false,
      parent: '#js-progress'
    });
  }

  start() {
    NProgress.start();
  }

  done() {
    NProgress.done();
  }
}
