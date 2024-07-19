export interface Starwars {
    name: string;
    url: string;
  }
  
  export interface StarwarsCharacter {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string; // Character planet url
    films: string[]; // URLs to films
    vehicles: string[]; // URLs to vehicles
    starships: string[]; // URLs to starships
    species: string[]; // URLs to species
  }
  
  export interface StarwarsPlanet {
    name: string;
    climate: string;
    terrain: string;
  }
  
  export interface StarwarsSpecies {
    name: string;
    url: string;
  }
  
  const API_BASE = 'https://swapi.dev/api';
  
  export async function fetchStarwarsCharacters(): Promise<{ results: Starwars[], next: string | null }> {
    const response = await fetch(`${API_BASE}/people/`);
    return response.json();
  }
  
  export async function fetchStarwarsCharacter(url: string): Promise<StarwarsCharacter> {
    const response = await fetch(url);
    return response.json();
  }
  
  export async function fetchStarwarsPlanet(url: string): Promise<StarwarsPlanet> {
    const response = await fetch(url);
    return response.json();
  }
  
  export async function fetchStarwarsSpecies(url: string): Promise<StarwarsSpecies> {
    const response = await fetch(url);
    return response.json();
  }
  
  export async function searchStarwarsCharacters(query: string): Promise<StarwarsCharacter[]> {
    const response = await fetch(`https://swapi.dev/api/people/?search=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }
    const data = await response.json();
    return data.results;
  }
  
  
  export const generateBackgroundColor = (planetName: string): string => {
    const hash = planetName.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue1 = (hash % 360 + 120) % 360;
    const hue2 = hash % 360;
    const saturation = 80;
    const lightness = 80;
    const opacity = 0.35;
  
    return `linear-gradient(to right, hsla(${hue1}, ${saturation}%, ${lightness}%, ${opacity}), hsla(${hue2}, ${saturation}%, ${lightness}%, ${opacity}))`;
  };
  