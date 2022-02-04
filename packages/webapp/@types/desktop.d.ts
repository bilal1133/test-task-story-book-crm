interface Window {
  readonly Desktop?: { // BEWARE: only available in in desktop app
    readonly Comms: Desktop.Comms;
  };
}

declare namespace Desktop { // BEWARE: to be kept in sync with desktop app
  interface CommsData<T = Record<string, unknown>> {
    action: 'load-view' | 'add-quick-links';
    payload: T
  }
  interface Comms {
    send<T>(data: Desktop.CommsData<T>): void;
    // sendSync<T>(data: Desktop.CommsData<T>): void; // BEWARE: do NOT use this, will block everything anyway, regardless of proper usage
    receive<T>(namedCallback: (data: Desktop.CommsData<T>) => void): void;
    receiveOnce<T>(namedCallback: (data: Desktop.CommsData<T>) => void): void;
    stopReceiving<T>(namedCallback: (data: Desktop.CommsData<T>) => void): void;
    stopReceivingAll(): void;
  }
}
