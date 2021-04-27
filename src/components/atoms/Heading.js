import styled from 'styled-components';

const Heading = styled.h1`
  font-size: ${({ theme, big }) =>
    big ? theme.fontSize.xl : theme.fontSize.l};
  font-weight: ${({ theme }) => theme.semiBold};
  margin: 10px 0px;
`;

export default Heading;
