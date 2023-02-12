import { Heading, Container, Button, Box, Stack, Text, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { login, reset } from '../features/auth/authSlice';
import ShortFormControl from '../components/ShortFormControl';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const { user, isLoading, isError, isSuccesfull, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccesfull || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccesfull, message]);

  function handleSubmit(e) {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  }

  return (
    <Container display="flex" alignItems="center" justifyContent="center" maxW="md" py="4" minH="100vh">
      <Box shadow="md" p="8" maxW="2xl" margin="auto" flexBasis={'md'}>
        <Heading as="h3" size="lg" textAlign="center" mb="5">
          Login
        </Heading>
        <Text textAlign="center" my="5">
          Lorem ipsum dolor sit amet.
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing="4">
            <ShortFormControl label="Email" type="email" name="email" value={email} onChange={handleChange} />
            <ShortFormControl label="Password" type="password" name="password" value={password} onChange={handleChange} />
          </Stack>
          <Button type="submit" w="full" mt="10" bgColor="black" color="white" _hover={`bgColor: black`} _active={'bgColor: black'}>
            LOGIN
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
