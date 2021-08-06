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

//
// Copyright 2020 Picovoice Inc.
//
// You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
// file accompanying this source.
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//
import { NativeModules } from 'react-native';
const RCTVoiceProcessor = NativeModules.PvVoiceProcessor;
const BufferEmitter = RCTVoiceProcessor;

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

_defineProperty(VoiceProcessor, 'instance', void 0);

export { VoiceProcessor, BufferEmitter };
//# sourceMappingURL=index.js.map
