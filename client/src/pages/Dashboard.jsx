import { Box, Button, Container, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { everyoneGoals } from '../features/goal/goalSlice';
import GoalCard from '../components/GoalCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Dashboard() {
  const { goals, isLoading, isError, isSuccesfull, message } = useSelector((state) => state.goal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(everyoneGoals());
  }, []);

  const mapGoalCards = () => {
    return goals.map((goal) => (
      <GoalCard key={goal.id}>
        <Text fontWeight="semibold" fontSize="xl" textTransform="capitalize">
          {goal.text}
        </Text>
        <Text mt="3">{goal.user}</Text>
        <Text color="blackAlpha.500">{goal.createdAt}</Text>
      </GoalCard>
    ));
  };

  if (isLoading) {
    return (
      <Container py="4" textAlign="center">
        <Spinner mx="auto" />
      </Container>
    );
  }

  return (
    <Container maxW="5xl" py="4">
      <Text fontWeight="semibold" fontSize="xl">
        Welcome to GETGoals
      </Text>
      <Text maxW="xl" my="2">
        Set your own goals and show to other people what you want to be, get, or do in the future
      </Text>
      <Button rounded="sm" color="white" colorScheme="blackAlpha">
        New Goal
      </Button>
      <Flex flexWrap="wrap" gap="15px" mt="5">
        {mapGoalCards()}
      </Flex>
    </Container>
  );
}

export default Dashboard;
