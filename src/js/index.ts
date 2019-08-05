// @ts-ignore
import AOS from 'aos';
import 'lazysizes';
// @ts-ignore
import throttle from 'lodash.throttle';
import '../css/index.scss';
import AudioHelper from './audioHelper';
import calcScrollTop from './scrollHelper';
import NProgressHelper from './nprogressHelper';

const sleep = (time: number) =>
  new Promise(resolve => setTimeout(() => resolve(), time));

const progress = new NProgressHelper();

const DOMContentLoadedHandler = () => {
  AOS.init();
  progress.start();
  const audioWrapperEl = document.getElementById('js-bgm');
  if (audioWrapperEl != null) {
    const audio = new AudioHelper(audioWrapperEl);
    audio.initialize();
  }
  const headerEl = document.getElementById('js-header');
  const scrollHandler = () => {
    const scrollTop = calcScrollTop();
    const threshold = window.innerHeight;
    console.log({ scrollTop, threshold });
    if (headerEl != null) {
      headerEl.setAttribute(
        'data-is-head',
        (scrollTop <= threshold).toString()
      );
    }
  };
  window.addEventListener('scroll', throttle(scrollHandler));
};

const LoadHandler = async () => {
  await sleep(1500);
  progress.done();
  const loadingWrapperEl = document.querySelector('.js-loading-icon');
  if (loadingWrapperEl != null) {
    loadingWrapperEl.setAttribute('data-img-type', 'close');
  }
  await sleep(500);
  document.body.setAttribute('data-is-loading', 'false');
};

window.addEventListener('DOMContentLoaded', DOMContentLoadedHandler);
window.addEventListener('load', LoadHandler);
