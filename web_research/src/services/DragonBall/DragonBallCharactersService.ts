import { EDebugBaseUrls, EDragonBallUrls } from "../../endpoints/debugEndpoints";

import { AxiosResponse } from "axios";
import BaseAxiosGetService from "../base/http/BaseAxiosGetService";
import type { IDragonBallCharacter } from "../../models/DragonBall/IDragonBallCharacter";
import { IDragonBallPlanet } from "../../models/DragonBall/IDragonBallPlanet";

class DragonBallCharactersService extends BaseAxiosGetService<IDragonBallCharacter> {
 
  constructor() {
    super(EDebugBaseUrls.DRAGONBALL_CHARACTERS + '/1');
  }

  async fetchPlanet(planet_id: number): Promise<IDragonBallPlanet | null> {
    try {
      const response: AxiosResponse<IDragonBallPlanet> = await this.axiosInstance.get(
        `${EDragonBallUrls.PLANETS}${planet_id}`
      );
      return response.data; // Aseguramos que solo retornamos los datos del planeta
    } catch (error) {
      console.error('ERROR fetchPlanet:', error);
      return null; // Retornamos `null` en caso de error
    }
  }
  

  // Implementar la simulación de la obtención de datos si está habilitado el modo de simulación
  protected simulateFetch(): void {
  }
}

export default DragonBallCharactersService;