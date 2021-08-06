declare type BufferCallbackType = (buffer: number[]) => void;
declare const BufferEmitter: any;
declare class VoiceProcessor {
  private static instance;
  private _frameLength;
  private _sampleRate;
  private _recording;
  private constructor();
  static getVoiceProcessor(
    frameLength: number,
    sampleRate: number
  ): VoiceProcessor;
  start(): Promise<any>;
  stop(): Promise<any>;
}
export { VoiceProcessor, BufferEmitter, BufferCallbackType };
