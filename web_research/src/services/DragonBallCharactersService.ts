import { type Ref, ref } from 'vue';

import { EDebugBaseUrls } from '../../src/endpoints/debugEndpoints'
import type { IDragonBallCharacter } from '../models/IDragonBallCharacter';

class DragonBallCharactersService {
    private dragonBallCharacter: Ref<IDragonBallCharacter>;
    private mockMode: boolean;
    private maxNumberOfCharacters: number;

    constructor() {
        this.dragonBallCharacter = ref<IDragonBallCharacter>({});
        this.mockMode = false; // Estado inicial del mock mode
        this.maxNumberOfCharacters = 58; 
    }

    getDragonBallCharacter(): Ref<IDragonBallCharacter> {
        return this.dragonBallCharacter;
    }

    // Método para activar o desactivar el mock mode
    toggleMockMode(enable: boolean): void {
        this.mockMode = enable;
        console.log(`Mock mode is now ${enable ? 'enabled' : 'disabled'}`);
    }

    async fetchDragonBallCharacter(characterId: number): Promise<void> {
        console.log("Fetching Dragon Ball character");

        if (this.mockMode) {
            // Simular una respuesta en modo mock
            this.simulateFetch();
            return;
        }

        try {
            const url = `${EDebugBaseUrls.DRAGONBALL_CHARACTERS}/${characterId}`; // URL con el ID específico del personaje
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const json = await response.json();
            
            // Extraer solo los campos necesarios para DragonBallCharacter
            const characterData: IDragonBallCharacter = {
                id          : json.id,
                name        : json.name,
                ki          : json.ki,
                maxKi       : json.maxKi,
                race        : json.race,
                gender      : json.gender,
                description : json.description,
                image       : json.image,
                affiliation : json.affiliation,
                deletedAt   : json.deletedAt,
            };

            this.dragonBallCharacter.value = characterData;
            console.log(this.dragonBallCharacter.value);
        } catch (error) {
            console.error('Failed to fetch Dragon Ball character:', error);
        }
    }

    async fetchRandomDragonBallCharacter(): Promise<void> {
        
        let dragonBallCharacterId = Math.floor(Math.random() * this.maxNumberOfCharacters) + 1; // Genera un número aleatorio entre 1 y this.maxNumberOfCharacters
        this.fetchDragonBallCharacter(dragonBallCharacterId);
    }

    // Método para simular la respuesta de fetch en modo mock
    private simulateFetch(): void {
        const mockResponse: IDragonBallCharacter = {
            id          : -1,
            name        : "Mock Name",
            ki          : "Mock Ki",
            maxKi       : "Mock Max Ki",
            race        : "Mock Race",
            gender      : "Mock Gender",
            description : "This is a mock character description.",
            image       : "mock-image-url",
            affiliation : "Mock Affiliation",
            deletedAt   : null,
        };

        // Simula un retraso como si fuera una llamada real
        setTimeout(() => {
            this.dragonBallCharacter.value = mockResponse;
            console.log("Mock response:", this.dragonBallCharacter.value);
        }, 1000); // Simula un retraso de 1 segundo
    }
}

export default DragonBallCharactersService;
