import { Heading, Container, Button, Box, Stack, Divider, Text } from '@chakra-ui/react';
import { useState } from 'react';
import ShortFormControl from '../components/ShortFormControl';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

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
    <Container maxW="5xl" display="flex" alignItems="center" justifyContent="center" py="4" minH="100vh">
      <Box shadow="md" p="8" maxW="2xl" margin="auto" flexBasis="3xl">
        <Heading as="h3" size="lg" textAlign="center" mb="5">
          Register
        </Heading>
        <Text my="5" textAlign="center">
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </Text>
        <form method="POST" action="/register" onSubmit={handleSubmit}>
          <Stack spacing="4">
            <Stack direction={['column', 'row']} spacing="7">
              <ShortFormControl label="Name" name="name" value={name} onChange={handleChange} />
              <ShortFormControl label="Email" type="email" name="email" value={email} onChange={handleChange} info="We will never share your email." />
            </Stack>
            <Divider />
            <Stack direction={['column', 'row']} spacing="7">
              <ShortFormControl label="Password" type="password" value={password} onChange={handleChange} info="Min password length : 6 Characters." />
              <ShortFormControl label="Password Confirmation" type="password" value={password2} onChange={handleChange} />
            </Stack>
          </Stack>
          <Button type="submit" w="full" mt="10" bgColor="black" color="white" _hover={`bgColor: black`} _active={'bgColor: black'}>
            SIGNUP
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
