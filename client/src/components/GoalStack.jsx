import { motion, isValidMotionProp } from 'framer-motion';
import { chakra, Flex, HStack, shouldForwardProp, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { FiDelete } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { deleteGoal, updateGoal } from '../features/goal/goalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';

// components
import StyledModal from './StyledModal';
import ShortFormControl from './ShortFormControl';
import DashboardButton from './DashboardButton';

export default function GoalStack({ data, iconButton }) {
  const { user } = useSelector((state) => state.auth);
  const [textForm, setTextForm] = useState({
    id: '',
    text: '',
  });

  const dispatch = useDispatch();

  function deleteGoalById(goalId) {
    dispatch(deleteGoal({ id: goalId, token: user.token }));
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  function updateGoalById(e) {
    e.preventDefault();

    if (!textForm.text) {
      toast.error('Can not update to empty goal');
      return;
    }

    dispatch(updateGoal({ id: textForm.id, text: textForm.text, token: user.token }));
  }

  function handleText(e) {
    const text = e.target.value;
    setTextForm((prevForm) => ({
      ...prevForm,
      text,
    }));
  }

  const MapCard = () => {
    return data.map((goal) => (
      <MotionBox key={goal.id} variants={item} p="5" width="fit-content" maxW="72" minW="52" shadow="md" borderWidth="1px">
        <Text fontWeight="semibold" fontSize="xl" textTransform="capitalize">
          {goal.text}
        </Text>
        {goal.user ? <Text mt="3">{goal.user}</Text> : ''}
        <Flex color="blackAlpha.500" justifyContent="space-between" gap="5" alignItems="center" mt="3">
          <Text>{goal.createdAt}</Text>
          {iconButton ? (
            <>
              <HStack spacing="3">
                <FiDelete cursor="pointer" onClick={deleteGoalById.bind(null, goal.id)} />
                <MdEdit
                  cursor="pointer"
                  onClick={() => {
                    onOpen();
                    setTextForm({
                      id: goal.id,
                      text: goal.text,
                    });
                  }}
                />
              </HStack>
              <StyledModal title="Update Your Goal" {...{ isOpen, onClose }}>
                <form onSubmit={updateGoalById}>
                  <VStack spacing="5" w="fit-content" minW="sm" alignItems="flex-end" mb="3">
                    <ShortFormControl label="Goal" variant="flushed" name="text" value={textForm.text} onChange={handleText} />
                    <DashboardButton type="submit" onClick={onClose}>
                      Update
                    </DashboardButton>
                  </VStack>
                </form>
              </StyledModal>
            </>
          ) : (
            ''
          )}
        </Flex>
      </MotionBox>
    ));
  };

  return (
    <MotionFlex variants={container} initial="hidden" animate="show" display="flex" flexWrap="wrap" gap="15px">
      {MapCard()}
    </MotionFlex>
  );
}

const ChakraDiv = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const MotionFlex = ChakraDiv;
const MotionBox = ChakraDiv;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20 },
  show: { y: 0 },
};
