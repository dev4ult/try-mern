import axios from 'axios';

const API_URL = 'http://localhost:3000/api/goals/';

const everyoneGoals = async () => {
  const response = await axios(API_URL);
  return response.data;
};

const myGoals = async (token) => {
  const response = await axios.get(`${API_URL}myGoals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const newGoal = async (text, token) => {
  const response = await axios.post(
    API_URL,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const deleteGoal = async (id, token) => {
  const response = await axios.delete(`${API_URL}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateGoal = async (id, text, token) => {
  const response = await axios.put(
    `${API_URL}${id}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const goalService = { everyoneGoals, myGoals, newGoal, deleteGoal, updateGoal };

export default goalService;
