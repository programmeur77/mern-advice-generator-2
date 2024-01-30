import express from 'express';

import { updateAdvice } from '../controllers/advice-controllers.js';

const router = express.Router();

router.post('/:userId/updateAdvice', updateAdvice);

export default router;
