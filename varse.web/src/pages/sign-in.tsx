import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import Head from 'next/head';
import Image from 'next/image';

import { logo } from 'config/logos';
import {
  Container,
  SignInContainer,
  Title,
  Subtitle,
  Form,
  NotMember,
} from 'styles/pages/sign-in';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <Head>
        <title>Session - varse</title>
      </Head>

      <Container>
        <SignInContainer>
          <Image
            src={logo.textAndIconColorful}
            alt="varse"
            layout="raw"
            className="logoImg"
          />
          <Title>Welcome back!</Title>
          <Subtitle>Sign in with your account</Subtitle>

          <Form>
            <label htmlFor="email">
              E-mail
              <input type="email" id="email" placeholder="john@example.com" />
            </label>

            <label htmlFor="password">
              Password
              <input
                type={(showPassword && 'text') || 'password'}
                id="password"
                placeholder="your password"
              />
              {(showPassword && <FiEye />) || <FiEyeOff />}
              <a href="#">Forget my password</a>
            </label>

            <button type="button">Sign in</button>
          </Form>

          <NotMember>
            Not a member?
            <br />{' '}
            <b>
              <a href="#">Sign up</a>
            </b>
          </NotMember>
        </SignInContainer>
      </Container>
    </>
  );
}
