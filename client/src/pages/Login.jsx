import { Heading, Container, Button, Box, Stack, Text, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import ShortFormControl from '../components/ShortFormControl';

function login() {
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

  function handleSubmit(e) {
    e.preventDefault();
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
        <form method="POST" action="/register" onSubmit={handleSubmit}>
          <Stack spacing="4">
            <ShortFormControl label="Email" type="email" name="email" value={email} onChange={handleChange} />
            <ShortFormControl label="Password" type="password" value={password} onChange={handleChange} />
          </Stack>
          <Button type="submit" w="full" mt="10" bgColor="black" color="white" _hover={`bgColor: black`} _active={'bgColor: black'}>
            SIGNUP
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default login;
