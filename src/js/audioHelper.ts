const AUDIO_FILE_PATH = '/gensou-cinema/audios/zoku_inst.mp3';
const AUDIO_PRELOAD = 'metadata';
const AUDIO_IS_PLAYING_CLASSNAME = 'js-is-playing';

export default class AudioHelper {
  audio: HTMLAudioElement;
  wrapper: HTMLElement;
  isPlaying: boolean;

  constructor(audioWrapperEl: HTMLElement) {
    this.audio = document.createElement('audio');
    this.audio.src = AUDIO_FILE_PATH;
    this.audio.preload = AUDIO_PRELOAD;
    this.wrapper = audioWrapperEl;
    this.isPlaying = false;
  }

  initialize() {
    this.wrapper.appendChild(this.audio);
    this.wrapper.addEventListener('click', () => {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    });
  }

  private play() {
    this.audio.play();
    this.wrapper.classList.add(AUDIO_IS_PLAYING_CLASSNAME);
    this.isPlaying = true;
  }

  private pause() {
    this.audio.pause();
    this.wrapper.classList.remove(AUDIO_IS_PLAYING_CLASSNAME);
    this.isPlaying = false;
  }
}
