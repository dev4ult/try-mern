import { useEffect } from 'react';
import { Container, Text, Spinner, Table, TableContainer, Thead, Tr, Th, Tbody, Td, TableCaption } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoalStack from '../components/GoalStack';
import { myGoals } from '../features/goal/goalSlice';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading } = useSelector((state) => state.goal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(myGoals(user.token));
    }
  }, []);

  return (
    <>
      <Container maxW="5xl" py="4">
        {user ? (
          <TableContainer borderWidth="1px" w="fit-content" shadow="sm">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Profile</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Name</Td>
                  <Td>{user.name}</Td>
                </Tr>
                <Tr>
                  <Td>Email</Td>
                  <Td>{user.email}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          ''
        )}

        <Text mt="10" mb="5" fontWeight="semibold" fontSize="xl">
          My Goals
        </Text>
        {isLoading ? <Spinner /> : <GoalStack data={goals} iconButton={true} />}
      </Container>
    </>
  );
}

export default Profile;
