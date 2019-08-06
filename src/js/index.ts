// @ts-ignore
import AOS from 'aos';
import 'lazysizes';
// @ts-ignore
import Vivus from 'vivus';
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
  const loadingContentEl = document.querySelector('.js-loading-content');
  if (loadingContentEl != null) {
    loadingContentEl.setAttribute('data-type', 'close');
  }
  await sleep(750);
  document.body.setAttribute('data-is-loading', 'false');
  const loadingBgEl = document.querySelector('.js-loading-bg');
  if (loadingBgEl != null) {
    loadingBgEl.setAttribute('data-is-loading', 'false');
  }
  await sleep(650);
  new Vivus(
    'js-logo',
    { type: 'delayed', file: '/gensou-cinema/images/logo.svg' },
    (e: any) => {
      e.parentEl.setAttribute('data-is-complete', 'true');
    }
  );
};

window.addEventListener('DOMContentLoaded', DOMContentLoadedHandler);
window.addEventListener('load', LoadHandler);
