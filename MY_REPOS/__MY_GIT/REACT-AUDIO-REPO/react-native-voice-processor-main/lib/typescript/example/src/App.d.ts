import { Component } from 'react';
import { EventSubscription, NativeEventEmitter } from 'react-native';
declare type Props = {};
declare type State = {
  isListening: boolean;
  buttonText: string;
  buttonDisabled: boolean;
};
export default class App extends Component<Props, State> {
  _bufferListener?: EventSubscription;
  _bufferEmitter: NativeEventEmitter;
  constructor(props: Props);
  componentDidMount(): void;
  _startProcessing(): void;
  _stopProcessing(): void;
  _toggleProcessing(): void;
  _requestRecordAudioPermission(): Promise<boolean>;
  render(): JSX.Element;
}
export {};
