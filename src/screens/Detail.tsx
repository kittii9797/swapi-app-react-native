import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, Image, ScrollView } from 'react-native';
import { MainStackScreenProps } from '../navigators/types';
import { StarwarsCharacter, fetchStarwarsCharacter, fetchStarwarsSpecies } from '../utils/api';

export function Detail({ route }: MainStackScreenProps<'Detail'>) {
  const { url } = route.params;
  const [character, setCharacter] = useState<StarwarsCharacter | null>(null);
  const [speciesName, setSpeciesName] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [starships, setStarships] = useState<string[]>([]);
  const [films, setFilms] = useState<{ title: string, url: string }[]>([]);
  const [planetName, setPlanetName] = useState<string | null>(null);
  const [characterId, setCharacterId] = useState<string>('');

  useEffect(() => {
    let finalUrl = url;
    if (!finalUrl.endsWith('/')) {
      finalUrl += '/';
    }

    const lastChar = finalUrl.substring(0, finalUrl.length - 1).split('/').pop();
    if (lastChar) {
      setCharacterId(lastChar);
    } else {
      console.error('Failed to extract character ID from URL:', finalUrl);
    }

    const fetchCharacterData = async () => {
      try {
        const characterData = await fetchStarwarsCharacter(finalUrl);
        setCharacter(characterData);

        if (characterData.species.length > 0) {
          const speciesData = await fetchStarwarsSpecies(characterData.species[0]);
          setSpeciesName(speciesData.name);
        }

        const vehicleNames = await Promise.all(
          characterData.vehicles.map(async (vehicleUrl) => {
            const response = await fetch(vehicleUrl);
            const vehicle = await response.json();
            return vehicle.name;
          })
        );
        setVehicles(vehicleNames);

        const starshipNames = await Promise.all(
          characterData.starships.map(async (starshipUrl) => {
            const response = await fetch(starshipUrl);
            const starship = await response.json();
            return starship.name;
          })
        );
        setStarships(starshipNames);

        const filmData = await Promise.all(
          characterData.films.map(async (filmUrl) => {
            const response = await fetch(filmUrl);
            const film = await response.json();
            const filmIndex = filmUrl.split('/').filter(Boolean).pop();
            return { title: film.title, url: `https://starwars-visualguide.com/assets/img/films/${filmIndex}.jpg` };
          })
        );
        setFilms(filmData);

        if (characterData.homeworld) {
          const response = await fetch(characterData.homeworld);
          const planet = await response.json();
          setPlanetName(planet.name);
        }

      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    };

    fetchCharacterData();
  }, [url]);

  if (!character) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${characterId}.jpg`,
        }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.5 }} // Opacity of the background image
      >
        <View style={styles.overlay}>
          <Text style={styles.name}>{character.name}</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <ScrollView>
        <Text style={styles.title}>About</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.value}>{character.height} cm</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Mass:</Text>
          <Text style={styles.value}>{character.mass} kg</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Hair Color:</Text>
          <Text style={styles.value}>{character.hair_color}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Skin Color:</Text>
          <Text style={styles.value}>{character.skin_color}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Eye Color:</Text>
          <Text style={styles.value}>{character.eye_color}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Birth Year:</Text>
          <Text style={styles.value}>{character.birth_year}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{character.gender}</Text>
        </View>
        {speciesName && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Species:</Text>
            <Text style={styles.value}>{speciesName}</Text>
          </View>
        )}
        {planetName && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Homeworld:</Text>
            <Text style={styles.value}>{planetName}</Text>
          </View>
        )}

        <Text style={styles.title}>Vehicles</Text>
        {vehicles.length > 0 ? (
          vehicles.map((vehicle, index) => (
            <View key={index} style={styles.detailRow}>
              <Text style={styles.value}>{vehicle}</Text>
            </View>
          ))
        ) : (
          <View style={styles.detailRow}>
            <Text style={styles.value}>-</Text>
          </View>
        )}

        <Text style={styles.title}>Starships</Text>
        {starships.length > 0 ? (
          starships.map((starship, index) => (
            <View key={index} style={styles.detailRow}>
              <Text style={styles.value}>{starship}</Text>
            </View>
          ))
        ) : (
          <View style={styles.detailRow}>
            <Text style={styles.value}>-</Text>
          </View>
        )}

        <Text style={styles.title}>Films</Text>
        {films.map((film, index) => (
          <View key={index} style={styles.filmRow}>
            <Image source={{ uri: film.url }} style={styles.filmImage} />
            <Text style={styles.filmTitle}>{film.title}</Text>
          </View>
        ))}
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)', // Semi-transparent overlay
    padding: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    marginBottom: 30,
    marginTop: 30,
  },
  content: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical: 30,
    paddingHorizontal: 60,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -60, // Overlaps with the background image overlay
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    width: 150,
    color: 'white',
  },
  value: {
    fontSize: 16,
    color: 'white',
  },
  filmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filmImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  filmTitle: {
    fontSize: 16,
    color: 'white',
  },
});

export default Detail;
