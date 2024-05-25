  import Reels from '../../models/reelModel.js';

  const getReelsInRange = async (req, res) => {
    const { start, end } = req.params;

  
    const startIndex = parseInt(start, 10);
    const endIndex = parseInt(end, 10);


    if (isNaN(startIndex) || isNaN(endIndex) || startIndex < 0 || endIndex < 0 || startIndex > endIndex) {
      return res.status(400).json({ message: 'Invalid start or end index' });
    }

    try {
      const reels = await Reels.aggregate([
        { $skip: startIndex },
        { $limit: endIndex - startIndex + 1 }
      ]);

      return res.status(200).json(reels);
    } catch (error) {
      return res.status(500).json({ message: `Error retrieving reels: ${error.message}` });
    }
  };

  export default getReelsInRange;
