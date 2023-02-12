import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

function GoalCard({ children }) {
  return (
    <motion.div variants={item}>
      <Card minW="52" shadow="md" borderWidth="1px">
        {children}
      </Card>
    </motion.div>
  );
}

const item = {
  hidden: { y: 20 },
  show: { y: 0 },
};

const Card = styled(Box)`
  padding: 20px;
  width: fit-content;
`;

export default GoalCard;
