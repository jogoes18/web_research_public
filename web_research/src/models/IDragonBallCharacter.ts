export interface IDragonBallCharacter {
    
    id?          : number;        // ID único del personaje
    name?        : string;        // Nombre del personaje
    ki?          : string;        // Nivel de Ki actual del personaje
    maxKi?       : string;        // Nivel máximo de Ki alcanzado por el personaje
    race?        : string;        // Raza del personaje (ej: Saiyan, Namekian, etc.)
    gender?      : string;        // Género del personaje
    description? : string;        // Descripción del personaje
    image?       : string;        // URL de la imagen del personaje
    affiliation? : string;        // Afiliación del personaje (ej: Z Fighter, Army of Frieza, etc.)
    deletedAt?   : string | null; // Marca de eliminación, si aplica (null si no ha sido eliminado)
}
