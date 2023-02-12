import { useEffect, useState } from 'react';
import { Box, Button, Container, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShortFormControl from '../components/ShortFormControl';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const { name, email } = formData;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Container maxW="5xl" py="4">
        <form action="" onSubmit={handleSubmit}>
          <VStack spacing="5" w="fit-content" minW="sm" alignItems="flex-end">
            <ShortFormControl name="name" variant="flushed" value={name} onChange={handleChange} />
            <ShortFormControl name="email" variant="flushed" value={email} onChange={handleChange} />
            <Button variant="outline" ml="auto">
              Save Changes
            </Button>
          </VStack>
        </form>
        <Box shadow="md" rounded="xl" w="fit-content" p="5">
          <h1>test</h1>
        </Box>
      </Container>
    </>
  );
}

export default Profile;
