import { Ref, UnwrapRef, ref } from 'vue';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

class BaseAxiosGetService<T> {
  private axiosInstance: AxiosInstance;
  protected token: string | null = null;
  protected data: Ref<UnwrapRef<T> | null> = ref(null) as Ref<UnwrapRef<T> | null>;
  protected mockMode: boolean;
  private url: string;
  
  // Evento personalizado de autenticación fallida
  private authErrorEmitter: (() => void)[] = [];

  constructor(url: string) {
    this.mockMode = false;
    this.url = url;
    this.axiosInstance = axios.create();
    this.setupInterceptors();
  }

  getData(): Ref<UnwrapRef<T> | null> {
    return this.data;
  }

  toggleMockMode(enable: boolean): void {
    this.mockMode = enable;
    console.log(`Mock mode is now ${enable ? 'enabled' : 'disabled'}`);
  }

  // Método para suscribirse al evento de error de autenticación
  onAuthError(callback: () => void): void {
    this.authErrorEmitter.push(callback);
  }

  // Emitir evento de error de autenticación
  private emitAuthError(): void {
    this.authErrorEmitter.forEach(callback => callback());
  }

  async fetchData(customToken?: string | null): Promise<void> {
    if (this.mockMode) {
      this.simulateFetch();
      return;
    }

    try {
      const token = customToken || this.token;
      this.token = token;

      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      };

      const response: AxiosResponse<T> = await this.axiosInstance.get(this.url, { headers });

      this.data.value = response.data as UnwrapRef<T>;

    } catch (error) {
      
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 401) {
          console.error('Authentication error - logging out');
          
          // Emitimos el evento de error de autenticación
          this.emitAuthError();
        } else {
          console.error('Error fetching data:', error);
        }
      }

      throw error;
    }
  }

  protected setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers['Authorization'] = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
  }

  protected simulateFetch(): void {
    throw new Error("simulateFetch must be implemented in derived classes");
  }
}

export default BaseAxiosGetService;
