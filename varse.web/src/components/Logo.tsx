import React from 'react';

import styled, { css } from 'styled-components';

type TitleProps = {
  size: number;
};

interface LogoProps {
  size: number;
}

const Title = styled.h2<TitleProps>`
  ${(props) =>
    props.title &&
    css`
      font-size: ${props.title}px;
    `}
  color: ${({ theme }) => theme.colors.baseColorTertiary};
  font-family: 'Montserrat';
  font-weight: 900;
`;

export default function Logo({ size }: LogoProps) {
  return <Title size={size}>varse</Title>;
}
