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
    originPlanet: {
      id: number;
      name: string;
      isDestroyed: boolean;
      description: string;
      image: string;
      deletedAt: string | null;
    };
    transformations: Array<{
      id: number;
      name: string;
      image: string;
      ki: string;
      deletedAt: string | null;
    }>;
  }
  