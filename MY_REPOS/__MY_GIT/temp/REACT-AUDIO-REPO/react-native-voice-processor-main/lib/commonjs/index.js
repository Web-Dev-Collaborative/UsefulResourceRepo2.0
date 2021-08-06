'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.BufferEmitter = exports.VoiceProcessor = void 0;

var _reactNative = require('react-native');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const RCTVoiceProcessor = _reactNative.NativeModules.PvVoiceProcessor;
const BufferEmitter = RCTVoiceProcessor;
exports.BufferEmitter = BufferEmitter;

class VoiceProcessor {
  constructor(frameLength, sampleRate) {
    _defineProperty(this, '_frameLength', void 0);

    _defineProperty(this, '_sampleRate', void 0);

    _defineProperty(this, '_recording', void 0);

    this._frameLength = frameLength;
    this._sampleRate = sampleRate;
    this._recording = false;
  }

  static getVoiceProcessor(frameLength, sampleRate) {
    if (!VoiceProcessor.instance) {
      VoiceProcessor.instance = new VoiceProcessor(frameLength, sampleRate);
    } else {
      VoiceProcessor.instance._frameLength = frameLength;
      VoiceProcessor.instance._sampleRate = sampleRate;
    }

    return VoiceProcessor.instance;
  }

  async start() {
    if (this._recording) {
      return Promise.resolve(true);
    }

    this._recording = true;
    return RCTVoiceProcessor.start(this._frameLength, this._sampleRate);
  }

  async stop() {
    if (!this._recording) {
      return Promise.resolve(true);
    }

    this._recording = false;
    return RCTVoiceProcessor.stop();
  }
}

exports.VoiceProcessor = VoiceProcessor;

_defineProperty(VoiceProcessor, 'instance', void 0);
//# sourceMappingURL=index.js.map
