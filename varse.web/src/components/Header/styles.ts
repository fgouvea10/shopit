import styled, { css } from 'styled-components';

export const Header = styled.header`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;

  .container {
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;

    @media (max-width: 1180px) {
      padding: 0 2rem;
    }
  }
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 40px;
  background: ${({ theme }) => theme.colors.primaryColorLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.div`
  color: ${({ theme }) => theme.colors.neutralColor50};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const MiddleContainer = styled.div`
  ${({ theme }) =>
    theme &&
    css`
      width: 100%;
      height: 90px;
      background: ${theme.colors.primaryColorDark};
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: ${theme.borderWidth.mid} solid
        ${theme.colors.neutralColor50};
      position: relative;
    `}

  .menu {
    position: absolute;
    top: 10%;
    left: 3%;
    color: ${({ theme }) => theme.colors.neutralColor50};
    font-size: ${({ theme }) => theme.fontSizes.xl};

    @media (min-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    height: 120px;
  }
`;

export const Title = styled.h1`
  font-weight: ${({ theme }) => theme.fonts.extrabold};
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.neutralColor50};

  input {
    width: 50%;
    padding: ${({ theme }) => theme.spacing.spacing2} ${({ theme }) =>
  theme.spacing.spacing4}
    border-radius: ${({ theme }) => theme.borderRadius.base};
    outline: 0;

    &::placeholder {
      color: ${({ theme }) => theme.colors.neutralColor300};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    input {
      width: 100%;
    }
  }
`;

export const MiddleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;

  div:nth-child(1) {
    max-width: 170px;
  }

  div:nth-child(2) {
    display: flex;
    gap: ${({ theme }) => theme.spacing.spacing8};

    svg {
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const BottomContainer = styled.div`
  width: 100%;
  height: 90px;
  background: ${({ theme }) => theme.colors.primaryColorDark};
  display: flex;
  align-items: center;
  justify-content: center;

  ul {
    display: flex;
    gap: ${({ theme }) => theme.spacing.spacing8};
  }

  .departments {
    display: flex;
    flex-direction: column;
    font-size: ${({ theme }) => theme.fontSizes.xs};

    span {
      font-size: ${({ theme }) => theme.fontSizes.md};
      font-weight: ${({ theme }) => theme.fonts.bold};
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MyOrders = styled.div`
  cursor: pointer;

  span {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.spacing4};
  }
`;
