import { Ref, UnwrapRef, ref } from 'vue';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class BaseAxiosPostService<T, R> {
  private axiosInstance: AxiosInstance; // Instancia privada de Axios
  protected token: string | null = null;
  protected postResponse: Ref<UnwrapRef<R> | null> = ref(null) as Ref<UnwrapRef<R> | null>;
  protected mockMode: boolean;
  protected url: string;

  // Evento personalizado de autenticación fallida
  private authErrorEmitter: (() => void)[] = [];

  constructor(url: string) {
    this.mockMode = false;
    this.url = url;

    // Crear una instancia personalizada de Axios
    this.axiosInstance = axios.create();

    // Configurar interceptores para esta instancia
    this.setupInterceptors();

  }

  // Método para obtener la respuesta almacenada
  getPostResponse(): Ref<UnwrapRef<R> | null> {
    return this.postResponse;
  }

  // Activar o desactivar el modo mock
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

  // Método para realizar una solicitud POST
  async postData(data: T|null = null, customToken?: string | null): Promise<void> {
    //console.log('AXIOS POST: postData');
    //console.log(data);
  
    if (this.mockMode) {
      this.simulatePost(data);
      return;
    }

    try {
      const token = customToken || this.token || localStorage.getItem('token');
      this.token = token;
      //console.log('AXIOS POST token: ', token);
    
      // Configuración de headers
      const config: AxiosRequestConfig = {
        headers: { 'Content-Type': 'application/json' },
        timeout: 2000,
      };

      // Envolver los datos en un objeto `body`
      const payload = { body: data };

      // Enviar la solicitud POST usando la instancia personalizada
      // console.log('AXIOS POST: await this.axiosInstance.post(url, payload, config)');
      // console.log(this.url);
      // console.log(payload);
      // console.log(config);

      const response: AxiosResponse<R> = await this.axiosInstance.post(this.url, payload, config);

      // Almacenar la respuesta en el Ref
      this.postResponse.value = response.data as UnwrapRef<R>;

     
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

  protected resetToken() {
    this.token = null;
  }

  // Método simulado para realizar un POST en modo mock
  protected simulatePost(data: T|null = null): void {
    console.warn('No simulated POST method implemented.');
    console.log('Simulated POST with data:', data);
  }

  // Configuración de interceptores para agregar el token automáticamente
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
  }
}

export default BaseAxiosPostService;
