import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
function GoalCard({ children }) {
  return (
    <motion.div initial={{ y: '10px' }} animate={{ y: '0px' }} transition={{ duration: 0.5 }}>
      <Card minW="52" shadow="md" borderWidth="1px">
        {children}
      </Card>
    </motion.div>
  );
}

const Card = styled(Box)`
  padding: 20px;
  width: fit-content;
`;

export default GoalCard;
