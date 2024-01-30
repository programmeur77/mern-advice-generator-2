import User from './../models/user-model.js';

export const updateAdvice = async (req, res) => {
  const { userId } = req.params;
  const { adviceId, advice, generatedAt } = req.body;

  const updatedAdvice = await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        advice: { id: adviceId, advice: advice, generatedAt: generatedAt },
      },
    }
  );

  if (!updatedAdvice) {
    res.status(400).json({ error: 'Unable ton find and update' });
  }

  res.status(201).json({
    updatedAdvice: updatedAdvice,
    message: 'Advice updated successfully',
    status: 201,
  });
};
