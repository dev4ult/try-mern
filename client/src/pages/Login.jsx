import { Heading, Container, Button, Stack, Text, shouldForwardProp, chakra } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { login, reset } from '../features/auth/authSlice';
import ShortFormControl from '../components/ShortFormControl';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion, isValidMotionProp } from 'framer-motion';

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
    <Container display="flex" alignItems="center" justifyContent="center" maxW="md" h="85vh">
      <ChakraBox initial={{ y: 20 }} animate={{ y: 0 }} shadow="md" p="8" maxW="2xl" flexBasis={'md'} borderWidth="1px">
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
          <Button type="submit" w="full" mt="10" bgColor="black" color="white" _hover={{ bgColor: 'black' }} _active={{ bgColor: 'black' }}>
            LOGIN
          </Button>
        </form>
      </ChakraBox>
    </Container>
  );
}

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default Login;
