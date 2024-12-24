import { IDragonBallPlanet } from "./IDragonBallPlanet";
import { IDragonBallTransformation } from "./IDragonBallTransformation";

export interface IDragonBallCharacter {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: string | null;
  originPlanet: IDragonBallPlanet; // Referencia a la interfaz de planeta
  transformations: IDragonBallTransformation[]; // Lista de transformaciones
}
