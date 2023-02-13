import { Container, Spinner, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { everyoneGoals, newGoal } from '../features/goal/goalSlice';
import { toast } from 'react-toastify';

// componentes
import GoalStack from '../components/GoalStack';
import StyledModal from '../components/StyledModal';
import ShortFormControl from '../components/ShortFormControl';
import DashboardButton from '../components/DashboardButton';

function Dashboard() {
  const [textForm, setTextForm] = useState('');
  const { goals, isLoading } = useSelector((state) => state.goal);
  const { user } = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(everyoneGoals());
  }, []);

  function handleText(e) {
    const text = e.target.value;
    setTextForm(text);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!textForm) {
      toast.error('Can not add empty text field as a new goal');
      return;
    }

    const { token } = user;

    dispatch(
      newGoal({
        text: textForm,
        token,
      })
    );

    setTextForm('');
  }

  return (
    <Container maxW="5xl" py="4">
      <Text fontWeight="semibold" fontSize="xl">
        Welcome to GETGoals
      </Text>
      <Text maxW="xl" my="2">
        Set your own goals and show to other people what you want to be, get, or do in the future
      </Text>
      {user ? (
        <>
          <DashboardButton onClick={onOpen}>New Goal</DashboardButton>
          <StyledModal title="Post Your Goal" {...{ isOpen, onClose }}>
            <form onSubmit={handleSubmit}>
              <VStack spacing="5" w="fit-content" minW="sm" alignItems="flex-end" mb="3">
                <ShortFormControl label="New Goal" variant="flushed" name="text" value={textForm} onChange={handleText} />
                <DashboardButton type="submit" onClick={onClose}>
                  Post
                </DashboardButton>
              </VStack>
            </form>
          </StyledModal>
        </>
      ) : (
        <DashboardButton onClick={navigate.bind(null, '/login')}>Login to Post</DashboardButton>
      )}
      <Text mt="10" mb="5" fontWeight="semibold" fontSize="xl">
        Everyone dreams
      </Text>
      {isLoading ? <Spinner /> : <GoalStack data={goals} />}
    </Container>
  );
}

export default Dashboard;
