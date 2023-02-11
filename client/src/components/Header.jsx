import { IoHome, IoLogIn, IoPerson } from 'react-icons/io5';
import { Link, HStack, Flex, Container } from '@chakra-ui/react';
import { Link as RTDLink } from 'react-router-dom';
import styled from '@emotion/styled';

const Header = () => {
  return (
    <Container maxW="5xl" py="4">
      <Flex gap="5" justifyContent={'space-between'}>
        <NavLink as={RTDLink} to="/">
          <IoHome /> Homepage
        </NavLink>
        <HStack spacing="5">
          <NavLink as={RTDLink} to="/login">
            <IoLogIn /> Login
          </NavLink>
          <NavLink as={RTDLink} to="/register">
            <IoPerson /> Signup
          </NavLink>
        </HStack>
      </Flex>
    </Container>
  );
};

const NavLink = styled(Link)`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export default Header;
