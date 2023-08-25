import express from 'express';
import transcribeAPIToken from '../controllers/transcribeAPIToken.js';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { audio_url } = req.body;
        console.log("look here", req.user);
        const user_id = req.user.id;
        const result = await transcribeAPIToken(audio_url, user_id);
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
});
export default router;




