import mongoose from "mongoose";
import Reel from "../../models/reelModel.js"; 

const insertAllReels = async () => {
    const videoUrls = [
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-a-boy-and-a-girl-enjoying-a-road-trip-through-40068-hd-ready.mp4?alt=media&token=b79c1259-4d82-44ab-922d-344877c0de0a',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-avenue-with-trees-buildings-and-fast-cars-at-dusk-34563-hd-ready.mp4?alt=media&token=a2d6ff75-e048-48ab-8759-4f1440c911d9',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-cheerful-man-moves-forward-dancing-in-the-middle-of-nature-32746-hd-ready.mp4?alt=media&token=572eb402-a5f7-4dde-aebe-eb1ffce642d1',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-city-traffic-on-bridges-and-streets-34565-hd-ready.mp4?alt=media&token=b415e6cd-7633-44e9-b7b6-4f8cf09ef319',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-decorated-christmas-tree-in-close-up-shot-39750-hd-ready.mp4?alt=media&token=c5067352-e2a3-4949-be12-380400cd6780',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-dynamic-animation-of-the-head-of-a-screaming-man-32645-hd-ready.mp4?alt=media&token=89afce28-555b-4fcd-8517-d2530f2afd5e',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-elegant-and-intellectual-man-playing-chess-49903-hd-ready.mp4?alt=media&token=c949c99d-a2c2-4895-94e1-d767022b31b9',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-excited-girl-with-a-stuffed-santa-claus-39747-hd-ready.mp4?alt=media&token=309ac144-9ea4-472f-b8b9-765276c82aed',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-female-cyborg-model-portrait-40210-hd-ready.mp4?alt=media&token=7f3437b0-3eef-49a5-97d3-e54ab8f34651',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-girl-in-neon-sign-1232-hd-ready.mp4?alt=media&token=caccdf94-f379-4cd5-a044-55cd52ed96c9',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-girl-posing-for-the-camera-in-the-middle-of-nowhere-34407-hd-ready.mp4?alt=media&token=766369fb-35c9-479a-914f-d1d95e6b8a73',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-girl-skating-slowly-in-a-parking-lot-34554-hd-ready.mp4?alt=media&token=17dc0fe3-3cd7-4182-a599-56fa91fbc7b8',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-influencers-dancing-in-a-recording-a-tik-tok-video-42315-hd-ready.mp4?alt=media&token=a7ed86ae-0629-4c1c-8383-70dc0e0abb53',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-man-doing-tricks-with-roller-skates-in-a-parking-lot-34553-hd-ready.mp4?alt=media&token=104d4432-e230-4094-bdcd-1fe82982f895',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-man-under-multicolored-lights-1237-hd-ready.mp4?alt=media&token=d0546191-93b5-4606-8104-81b4c85a2c4e',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-overhead-view-of-a-rocky-coast-and-waves-crashing-51502-hd-ready.mp4?alt=media&token=602ec217-3daf-4f67-b68b-432a27c7a61c',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-panting-dog-1548-hd-ready.mp4?alt=media&token=7807834b-4d87-47c7-a0b3-2e0c48bc6629',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-photographer-portraying-a-model-in-his-studio-34507-hd-ready.mp4?alt=media&token=1785168e-0e81-4a08-8f73-a86a121ea306',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-portrait-of-a-cyborg-being-prepared-40203-hd-ready.mp4?alt=media&token=08d7ef06-e308-4ad9-8090-6a3e893c3f24',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-rolling-slowly-on-roller-skates-during-sunset-34547-hd-ready.mp4?alt=media&token=a3f74085-69ab-4153-a319-8591ef3953ec',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-skilled-drummer-wearing-headphones-moves-his-feet-fast-while-jaming-51830-hd-ready.mp4?alt=media&token=43c23b5e-2789-4700-8a8f-9241c673f19d',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-smart-man-in-a-game-of-chess-49901-hd-ready.mp4?alt=media&token=e40cc349-0d8b-4932-9bf2-666f07392c01',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-stacked-thin-strips-of-old-weathered-wood-34504-hd-ready.mp4?alt=media&token=72b9f7e5-e019-4b42-bf31-202bb63c6809',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-two-avenues-with-many-cars-traveling-at-night-34562-hd-ready.mp4?alt=media&token=a290e6c8-6408-41c8-bc20-4aaf82b0c677',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-urban-boy-with-roller-skates-sliding-and-spinning-in-a-34552-hd-ready.mp4?alt=media&token=cf86cb09-e55c-4724-a613-eaa8c9472157',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-waves-in-the-water-1164-hd-ready.mp4?alt=media&token=0a385207-fe0a-4675-9244-5350656875f9',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-woman-drinking-craft-beer-from-a-glass-40485-hd-ready.mp4?alt=media&token=301038d8-dffc-448c-a1bb-f969a7321d8b',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-woman-running-above-the-camera-on-a-running-track-32807-hd-ready.mp4?alt=media&token=1c5d29ea-ffab-49cf-9cb5-6bdbafdff29d',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-womans-feet-splashing-in-the-pool-1261-hd-ready.mp4?alt=media&token=4e93ebbc-be2c-4bba-a113-09100c43e79c',
        'https://firebasestorage.googleapis.com/v0/b/cc-ise.appspot.com/o/mixkit-young-urban-woman-skating-slowly-during-sunset-34546-hd-ready.mp4?alt=media&token=d8e4e27b-358f-4c38-8204-3e53e54ffbe1'
      ];
    try {
        for (const url of videoUrls) {
            const newReel = new Reel({
                url: url,
                likes: 0 
            });
            
            await newReel.save();
        }

        console.log("All reels inserted successfully");
    } catch (error) {
        console.error("Error inserting reels:", error);
    }
};

export default insertAllReels
