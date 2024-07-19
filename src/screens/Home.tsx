import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { StarwarsCard } from '../components/StarwarsCard';
import { fetchStarwarsCharacters, Starwars } from '../utils/api';

export const Home = () => {
  const [starwars, setStarwars] = useState<Starwars[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    fetchStarwarsCharacters()
      .then((data) => {
        setStarwars(data.results);
        setNext(data.next);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const loadMore = () => {
    if (isLoadingMore || !next) return;
    setIsLoadingMore(true);
    fetch(next)
      .then((res) => res.json())
      .then((data) => {
        setStarwars((prevStarwars) => [...prevStarwars, ...data.results]);
        setNext(data.next);
        setIsLoadingMore(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoadingMore(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={starwars}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <StarwarsCard url={item.url} name={item.name} />}
        onEndReached={loadMore}
        ListFooterComponent={() => (isLoadingMore ? <ActivityIndicator /> : null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});
