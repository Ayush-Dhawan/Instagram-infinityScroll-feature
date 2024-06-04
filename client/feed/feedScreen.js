import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import SingleReel from '../components/reels/SingleReel'
import makeRequest from '../api'

export default function FeedScreen() {
    const [reels, setReels] = useState([]);
    const videoRefs = useRef([])
    const windowHeight = Dimensions.get('window').height;
    const [currentReelIndex, setCurrentReelIndex] = useState(0);
    const [start, setStart] = useState(0);

    const fetchVideosInRange = async () =>{
        const data = await makeRequest.get(`/reels/${start}/${start+4}`)
        console.log(data)
        setReels((prevReels) => [...prevReels, ...data]);
    }

    useEffect(() => {
        fetchVideosInRange();
    }, [start])


    const VideoItem = ({item, index}) => {
        return (
            <View style={[{flex: 1, height: Dimensions.get('window').height, backgroundColor: 'gray'}]}>
                <SingleReel id={reels[index]._id} numLikes={reels[index].likes} url={reels[index].url} key={index} index={index} activeIndex={currentReelIndex}  />
            </View>
        )
    }
  return (
    <View>
      <FlatList
      data={reels}
      renderItem={VideoItem}
      windowSize={4}
      initialNumToRender={1}
      removeClippedSubviews
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100
      }}
      maxToRenderPerBatch={2}
    onScroll={e => {
        const index = Math.round(e.nativeEvent.contentOffset.y/(windowHeight));
        setCurrentReelIndex(index);
    }}
      pagingEnabled
      keyExtractor={(item, index) => String(index)}
      decelerationRate={'fast'}
    
      onEndReached={() => setStart(start + 5)}
      onEndReachedThreshold={3}
       />
    </View>
  )
}

const styles = StyleSheet.create({})