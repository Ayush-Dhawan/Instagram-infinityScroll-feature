import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { ResizeMode, Video } from 'expo-av'
import AntDesign from 'react-native-vector-icons/AntDesign';
import makeRequest from '../../api';

export const SingleReel = forwardRef((props, parentRef) =>{
    const {id, numLikes, url} = props
    const videoref = useRef(null);
    const [liked, setLiked] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(numLikes)

    useImperativeHandle(parentRef, () => ({
        play,
        unload,
        stop
    }))

    useEffect(() => {
        return () => unload()
    }, [])

    const play = async () => {
        console.log("plays")
        if (videoref.current == null) {
            return;
        }

        // if video is already playing return
        const status = await videoref.current.getStatusAsync();
        if (status?.isPlaying) {
            return;
        }
        try {
            await videoref.current.playAsync();
        } catch (e) {
            console.log(e)
        }
    }


    const stop = async () =>{
        console.log("stopping")
        if(videoref.current == null){
            return;
        }
        const status = await videoref.current.getStatusAsync();
        if(!status?.isPlaying){
            return;
        }
        try {
            await videoref.current.stopAsync();
        } catch (error) {
            console.log(error.message)
        }
    }
    const unload = async () =>{
        console.log("unloading")
        if(videoref.current == null){
            return;
        }
        try {
            await videoref.current.unloadAsync();
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleLikes = async (id, liked) =>{
        setLiked(!liked);
        const isLiked = liked ? 0 : 1;

        const data = await makeRequest.post(`/reels`, {reelId: id, liked: isLiked});
        setNumberOfLikes(data.likes)
    }

  return (
    <View>
        <View style={{position: 'absolute', zIndex: 100, bottom: 40, left: 20}}>
                <View style={{position: 'relative', left: 320, display: 'flex', gap: 10}}>
                    <Pressable onPress={() => handleLikes(id, liked)}>
                        {liked ? <AntDesign name="heart" size={30} color={'red'}/> : <AntDesign name="hearto" size={30} color={'white'}/>}
                    </Pressable>
                    <Text style={{marginLeft: 10, marginTop: -10, color: 'white'}}>{numberOfLikes}</Text>
                    <AntDesign name="wechat" size={30} color={'white'}/>
                    <AntDesign name="sharealt" size={30} color={'white'}/>
                </View>
                <View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8}}>
                        <Image 
                        source={{uri: "https://th.bing.com/th?id=OIP.6UhgwprABi3-dz8Qs85FvwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"}}
                        style={styles.pfp}
                        />
                        <Text style={{color: 'white', fontSize: 16}}>UserName</Text>
                    </View>
                    <Text style={{color: 'gray', marginTop: 7}}>This is a reel uploaded for sample testing of the infinite scroll feature</Text>
                </View>

        </View>
      <Video
      ref={videoref}
    //   key={index}
       style ={styles.videoContainer}
       resizeMode={ResizeMode.COVER}
       useNativeControls={false}
       isLooping
       shouldPlay={false}
       source={{uri: url}} />
    </View>
  )
})



const styles = StyleSheet.create({
    videoContainer: {
        // flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    pfp: {
        width: 40,
        height: 40,
        borderRadius: 99
    }
})

export default SingleReel