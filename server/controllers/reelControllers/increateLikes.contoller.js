import Reel from '../../models/reelModel.js';

const increaseReelLikes = async (req, res) => {
  const { reelId, liked } = req.body;

  try {
    const reel = await Reel.findById(reelId);

    if (!reel) {
      return res.status(404).json({ message: 'Reel not found' });
    }
    if(liked === 1) reel.likes += 1;
    else if(liked === 0) reel.likes -= 1;

    await reel.save();

    return res.status(200).json(reel);
  } catch (error) {
    return res.status(500).json({ message: `Error increasing reel likes: ${error.message}` });
  }
};

export default increaseReelLikes;
