import styled, { css } from 'styled-components';

export const Container = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignInContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.spacing8};

  .logoImg {
    width: 150px;
    height: auto;
    margin-top: -${({ theme }) => theme.spacing.spacing20};
    margin-bottom: ${({ theme }) => theme.spacing.spacing20};
  }

  @media (min-width: 992px) {
    width: 30vw;
  }
`;

export const Title = styled.h2`
  ${({ theme }) =>
    theme &&
    css`
      font-weight: ${theme.fonts.medium};
      font-size: ${theme.fontSizes.xl};
      text-align: center;
    `};
`;

export const Subtitle = styled.h2`
  ${({ theme }) =>
    theme &&
    css`
      font-weight: ${theme.fonts.semibold};
      font-size: ${theme.fontSizes.xl};
      padding-bottom: 30px;
      text-align: center;
    `};
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  label {
    position: relative;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing.spacing8};
    color: ${({ theme }) => theme.colors.neutralColor300};

    input {
      ${({ theme }) =>
        theme &&
        css`
          padding: ${theme.spacing.spacing3} ${theme.spacing.spacing4};
          border-radius: ${theme.borderRadius.base};
          background: transparent;
          border: ${theme.borderWidth.thin} solid
            ${theme.colors.neutralColor300};
          margin-top: ${theme.spacing.spacing2};
          outline: 0;
          transition: border 0.2s;

          &:focus {
            border: ${theme.borderWidth.mid} solid
              ${theme.colors.primaryColorLight};
          }
        `};
    }

    a {
      ${({ theme }) =>
        theme &&
        css`
          width: 100%;
          text-align: right;
          margin-top: ${theme.spacing.spacing3};
          font-size: ${theme.fontSizes.sm};
          color: ${theme.colors.primaryColorLight};
        `};
    }

    svg {
      color: ${({ theme }) => theme.colors.neutralColor700};
      font-size: ${({ theme }) => theme.fontSizes.lg};
      position: absolute;
      top: 40%;
      right: 3%;
    }
  }

  button {
    ${({ theme }) =>
      theme &&
      css`
        margin-top: ${theme.spacing.spacing20};
        background: ${theme.colors.primaryColorMid};
        color: ${theme.colors.neutralColor50};
        font-weight: ${theme.fonts.semibold};
        padding: ${theme.spacing.spacing4} ${theme.spacing.spacing4};
        width: 100%;
        border-radius: ${theme.borderRadius.base};
        transition: filter 0.3s;

        &:hover {
          filter: brightness(0.9);
        }
      `};
  }
`;

export const NotMember = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing20};
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutralColor300};

  b {
    color: ${({ theme }) => theme.colors.primaryColorLight};
  }
`;
