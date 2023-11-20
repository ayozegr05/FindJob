import React from 'react'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'

import PopularJobCard from '../../common/cards/popular/PopularJobCard.jsx';
import useFetch from '../../../hook/useFetch.js'

const Popularjobs = () => {
  const router = useRouter();
  
  const { data, isLoading, error } = useFetch(
    'search', {
    query: 'Reac developer',
    num_pages: 1
  })

  const [selectedJob, setSelectedjob] = useState()

  const handleCardPress = (item) => {
    router.push(`/job-details${item.job_id}`);
    setSelectedjob(item.job_id)
  }
  // console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList 
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard 
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs