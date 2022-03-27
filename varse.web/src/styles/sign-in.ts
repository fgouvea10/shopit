import styled from 'styled-components';

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.padding.spacing10}
    ${({ theme }) => theme.padding.spacing10};
  background: ${({ theme }) => theme.colors.bodyColorWhite};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  border: 1px solid ${({ theme }) => theme.colors.strokes};
  margin-top: ${({ theme }) => theme.padding.spacing5};

  @media (max-width: 530px) {
    background: transparent;
    border: none;
  } ;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.baseColorTertiary};
`;

export const Divider = styled.hr`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.strokes};
  margin-top: ${({ theme }) => theme.padding.spacing3};
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.padding.spacing6};

  label {
    font-size: ${({ theme }) => theme.fontSize.sm};
    line-height: ${({ theme }) => theme.lineHeight.taller};
    color: ${({ theme }) => theme.colors.texts};
    display: flex;
    flex-direction: column;
  }

  input {
    width: 400px;
    padding: ${({ theme }) => theme.padding.spacing4}
      ${({ theme }) => theme.padding.spacing3};
    border-radius: ${({ theme }) => theme.borderRadius.base};
    border: 1px solid ${({ theme }) => theme.colors.strokes};
    margin-bottom: ${({ theme }) => theme.padding.spacing5};
    outline-color: ${({ theme }) => theme.colors.baseColor};

    &::placeholder {
      color: #b4b4b4;
    }

    @media (max-width: 768px) {
      width: 300px;
    }
  }

  a {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    color: ${({ theme }) => theme.colors.baseColor};
  }

  button {
    margin-top: ${({ theme }) => theme.padding.spacing6};
    padding: ${({ theme }) => theme.padding.spacing4};
    border-radius: ${({ theme }) => theme.borderRadius.base};
    background: ${({ theme }) => theme.colors.baseColor};
    color: ${({ theme }) => theme.colors.bodyColorWhite};
    transition: filter 0.3s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const NotMember = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.padding.spacing12};
  color: ${({ theme }) => theme.colors.texts};

  a {
    color: ${({ theme }) => theme.colors.baseColor};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
`;
