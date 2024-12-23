// BaseWebsocket.ts
export class BaseWebsocket<TxMsg, RxMsg> {
  private socket: WebSocket | null = null;
  private messages: string[] = [];
  private mIsConnected: boolean = false;

  constructor(
    private url: string,
    protected onMessageReceived: (msg: RxMsg) => void,
    private onOpen?: () => void,
    private onClose?: () => void,
    private onError?: (err: Event) => void
  ) {}

  public connect(): void {
    console.log('Conectando a WebSocket:', this.url);
    this.socket = new WebSocket(this.url);

    if (this.socket) {
      this.socket.addEventListener('open', () => this.handleOpen());
      this.socket.addEventListener('message', (event) => this.handleMessage(event));
      this.socket.addEventListener('error', (err) => this.handleError(err));
      this.socket.addEventListener('close', () => this.handleClose());
    }
  }

  public isConnected(): boolean {
   return this.mIsConnected;
  }


  public getUrl(): string {
    return this.url;
  }
 
  public sendMessage(message: TxMsg): void {
    if (this.socket && this.mIsConnected) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket no está conectado');
    }
  }

  public close(): void {
    if (this.socket && this.mIsConnected) {
      this.socket.close();
    }
  }

  private handleError(err: Event): void {
    console.error('Error WebSocket:', err);
    if (this.onError) this.onError(err);
  }

  private handleClose(): void {
    this.mIsConnected = false;
    console.log('Conexión WebSocket cerrada');
    if (this.onClose) this.onClose();
  }

  private handleOpen(): void {
    this.mIsConnected = true;
    console.log('Conexión WebSocket abierta');
    if (this.onOpen) this.onOpen();
  }

  protected handleMessage(event: MessageEvent): void {
    const receivedMessage: RxMsg = JSON.parse(event.data);
    this.onMessageReceived(receivedMessage);
    this.messages.push(event.data);
  }
}
