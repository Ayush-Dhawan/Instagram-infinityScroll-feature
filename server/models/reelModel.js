        import mongoose from "mongoose";


        const reelSchema = new mongoose.Schema({
            url: {
                type: String,
                required: true
            },
        likes: {
            type: Number,
            default: 0
        },

        });

        const Reel = mongoose.model('Reel', reelSchema);

        export default Reel
