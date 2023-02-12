import axios from 'axios';

const API_URL = 'http://localhost:3000/api/goals/';

const everyoneGoals = async () => {
  const response = await axios(API_URL);
  return response.data;
};

const myGoals = async (userId) => {
  const response = await axios(API_URL + userId);
  return response.data;
};

const goalService = { everyoneGoals, myGoals };

export default goalService;
