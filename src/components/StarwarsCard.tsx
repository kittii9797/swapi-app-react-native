// StarwarsCard.tsx
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { fetchStarwarsCharacter, StarwarsCharacter, fetchStarwarsPlanet, StarwarsPlanet, generateBackgroundColor } from '../utils/api';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../navigators/types';

interface StarwarsCardProps {
  url: string;
  name: string;
}

export const StarwarsCard = ({ url, name }: StarwarsCardProps) => {
  const [starwars, setStarwars] = useState<StarwarsCharacter | null>(null);
  const [planet, setPlanet] = useState<StarwarsPlanet | null>(null);
  const [characterId, setCharacterId] = useState<string>('');

  const skeletonAnimation = new Animated.Value(0);

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

    fetchStarwarsCharacter(finalUrl)
      .then((data) => {
        setStarwars(data);
        fetchStarwarsPlanet(data.homeworld)
          .then((planetData) => setPlanet(planetData))
          .catch((error) => console.error('Error fetching planet data:', error));
      })
      .catch((error) => console.error('Error fetching character data:', error));
  }, [url]);

  const navigation = useNavigation<MainStackScreenProps<'Home'>['navigation']>();

  // Animated skeleton effect
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(skeletonAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(skeletonAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  if (!starwars || !planet) return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          opacity: skeletonAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          }),
        },
      ]}
    >
      {/* Placeholder content */}
      <View style={styles.content}>
        <View style={styles.imageSkeleton} />
        <View style={styles.infoContainer}>
          <View style={styles.placeholderText} />
          <View style={styles.inlineInfo}>
            <View style={styles.infoSkeleton}></View>
            <View style={styles.infoSkeleton}></View>
            <View style={styles.infoSkeleton}></View>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const backgroundColor = generateBackgroundColor(planet.name);

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/originals/d3/0d/2a/d30d2a057f4c32b4c4989e0afc7f3345.jpg' }}
      style={styles.background}
      imageStyle={{ borderRadius: 10 }}
    >
      <TouchableOpacity
        style={[styles.container, { backgroundColor }]}
        onPress={() => navigation.navigate('Detail', { name, url })}
      >
        <View style={styles.content}>
          <Image
            source={{
              uri: `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${characterId}.jpg`,
            }}
            style={styles.image}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{starwars.name}</Text>
            <View style={styles.inlineInfo}>
              <View style={styles.info}>
                <Image
                  source={require('../../assets/icons/clapperboard.png')}
                  style={{ width: 15, height: 15, marginRight: 10 }}
                />
                <Text>{starwars.films.length}</Text>
              </View>
              <View style={styles.info}>
                <Image
                  source={require('../../assets/icons/millennium-falcon.png')}
                  style={{ width: 15, height: 15, marginRight: 10 }}
                />
                <Text>{starwars.vehicles.length}</Text>
              </View>
              <View style={styles.info}>
                <Image
                  source={require('../../assets/icons/rocket.png')}
                  style={{ width: 15, height: 15, marginRight: 10 }}
                />
                <Text>{starwars.starships.length}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  background: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: 90
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 8,
  },
  inlineInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  info: {
    fontSize: 12,
    color: 'black',
    marginRight: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: 'lightgray'
  },
  skeleton: {
    backgroundColor: 'gray',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    padding: 10
  },
  placeholderText: {
    backgroundColor: 'white',
    height: 25,
    marginBottom: 10,
    borderRadius: 10,
    width: 150
  },
  imageSkeleton: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 10,
  },
  infoSkeleton: {
    backgroundColor: 'white',
    marginRight: 16,
    display: 'flex',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 25,
    height: 25,
    width: 50
  },
});
