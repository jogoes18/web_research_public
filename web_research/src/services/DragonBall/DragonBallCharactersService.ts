import BaseAxiosGetService from "../base/http/BaseAxiosGetService";
import { EDebugBaseUrls } from "../../endpoints/debugEndpoints";
import type { IDragonBallCharacter } from "../../models/IDragonBallCharacter";

class DragonBallCharactersService extends BaseAxiosGetService<IDragonBallCharacter> {
 
  constructor() {
    super(EDebugBaseUrls.DRAGONBALL_CHARACTERS + '/1');
  }

  // Implementar la simulación de la obtención de datos si está habilitado el modo de simulación
  protected simulateFetch(): void {
  }
}

export default DragonBallCharactersService;