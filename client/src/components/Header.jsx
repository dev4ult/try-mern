import { IoHome, IoLogIn, IoPerson, IoLogOut, IoPersonCircle } from 'react-icons/io5';
import { Link, HStack, Flex, Container, useSlider, Button } from '@chakra-ui/react';
import { Link as RTDLink, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <Container maxW="5xl" py="4">
      <Flex gap="5" justifyContent={'space-between'}>
        <NavLink as={RTDLink} to="/">
          <IoHome /> Homepage
        </NavLink>
        <HStack spacing="5">
          {user ? (
            <>
              <NavLink as={RTDLink} to="/profile">
                <IoPersonCircle /> Profile
              </NavLink>
              <Button onClick={handleLogout} leftIcon={<IoLogOut />} color="white" bgColor={'black'} _hover={'bgColor: gray'} _active={'bgColor: black'}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink as={RTDLink} to="/login">
                <IoLogIn /> Login
              </NavLink>
              <NavLink as={RTDLink} to="/register">
                <IoPerson /> Signup
              </NavLink>
            </>
          )}
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
