import { useEffect } from 'react';
import { reset } from '../features/auth/authSlice';
import { Container, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <Container>
        <Heading textAlign="center">this is a profile page</Heading>
      </Container>
    </>
  );
}

export default Profile;
