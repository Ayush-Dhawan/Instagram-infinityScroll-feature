import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import SingleReel from '../components/reels/SingleReel'
import makeRequest from '../api'
import {FlashList} from '@shopify/flash-list'

export default function FeedScreen() {
    const [reels, setReels] = useState([]);
    const videoRefs = useRef([])
    const windowHeight = Dimensions.get('window').height;
    const [currentReelIndex, setCurrentReelIndex] = useState(0);
    const [start, setStart] = useState(0);

    const onViewableItemsChanged = useRef(({changed}) => {
      changed.forEach(element => {
        const cell = videoRefs.current[element.key];
        if(cell){
          if(element.isViewable) cell.play();
          else cell.stop();
        }
      })
    })

    const fetchVideosInRange = async () =>{
        const data = await makeRequest.get(`/reels/${start}/${start+5}`)
        console.log(data)
        setReels((prevReels) => [...prevReels, ...data]);
    }

    useEffect(() => {
        fetchVideosInRange();
    }, [start])


    const VideoItem = ({item, index}) => {
        return (
            <View style={[{flex: 1, height: Dimensions.get('window').height, backgroundColor: 'gray'}]}>
                <SingleReel ParentRef={singleReelRef => (videoRefs.current[item] = singleReelRef)} id={reels[index]._id} numLikes={reels[index].likes} url={reels[index].url} key={index} index={index} activeIndex={currentReelIndex}  />
            </View>
        )
    }
  return (
    <View style={{height: '100%', width: '100%'}}>
      <FlatList
      data={reels}
      renderItem={VideoItem}
      windowSize={4}
      initialNumToRender={1}
      maxToRenderPerBatch={2}
      isLooping
      removeClippedSubviews
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100
      }}
      onViewableItemsChanged={onViewableItemsChanged.current}
    // onScroll={e => {
    //     const index = Math.round(e.nativeEvent.contentOffset.y/(windowHeight));
    //     setCurrentReelIndex(index);
    // }}
      pagingEnabled
      keyExtractor={(item, index) => String(index)}
      decelerationRate={'normal'}
    
      onEndReached={() => setStart(start + 6)}
      onEndReachedThreshold={7}
       />
    </View>
  )
}

const styles = StyleSheet.create({})