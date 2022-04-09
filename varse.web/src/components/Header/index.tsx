/* eslint-disable prettier/prettier */
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import {
  FiMenu,
  FiChevronDown,
  FiShoppingCart,
  FiShoppingBag,
} from 'react-icons/fi';

import {
  Header as Container,
  TopContainer,
  Text,
  MiddleContainer,
  Wrapper,
  Title,
  MiddleContent,
  BottomContainer,
  MyOrders,
} from './styles';

export default function Header() {
  return (
    <Container>
      <TopContainer>
        <div className="container">
          <Text>
            FRETE GRÁTIS para todo o Rio de Janeiro. Pague em até 12X SEM JUROS
          </Text>
        </div>
      </TopContainer>

      <MiddleContainer>
        <div className="container">
          <Wrapper>
            <Title>LOGO</Title>
            <input type="text" placeholder="O que você está procurando?" />
            <MiddleContent>
              <div>
                <span>
                  Olá, faça seu <b>login</b> ou <b>cadastre-se</b>
                </span>
              </div>

              <div>
                <AiFillHeart />
                <FiShoppingCart />
              </div>
            </MiddleContent>
          </Wrapper>
        </div>
        <FiMenu className="menu" />
      </MiddleContainer>

      <BottomContainer>
        <div className="container">
          <Wrapper>
            <div className="departments">
              COMPRE POR
              <span>
                DEPARTAMENTOS <FiChevronDown />
              </span>
            </div>

            <ul>
              <li>
                <a href="#">Celulares</a>
              </li>
              <li>
                <a href="#">Eletrodomésticos</a>
              </li>
              <li>
                <a href="#">Informática</a>
              </li>
            </ul>

            <MyOrders>
              <span>
                Meus pedidos <FiShoppingBag />
              </span>
            </MyOrders>
          </Wrapper>
        </div>
      </BottomContainer>
    </Container>
  );
}
