import { IoHome, IoLogIn, IoPerson } from 'react-icons/io5';
import { Link, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

const NavLink = styled(Link)`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const BoxWrap = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const Header = () => {
  return (
    <>
      <BoxWrap padding="20">
        <NavLink href="/">
          <IoHome /> Homepage
        </NavLink>
        <BoxWrap>
          <NavLink href="/login" display="flex" gap="3" alignItems="center">
            <IoLogIn /> Login
          </NavLink>
          <NavLink href="/register" display="flex" gap="3" alignItems="center">
            <IoPerson /> Signup
          </NavLink>
        </BoxWrap>
      </BoxWrap>
    </>
  );
};

export default Header;
