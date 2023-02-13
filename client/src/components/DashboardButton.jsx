import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

function DashboardButton(props) {
  const { type = 'button', children } = props;
  return (
    <StyledButton type={type} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  border-radius: 3px;
  color: white;
  background-color: black;
  &:hover {
    background-color: black;
  }
  &:active {
    background-color: black;
  }
`;

export default DashboardButton;
