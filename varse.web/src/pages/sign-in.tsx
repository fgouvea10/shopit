import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Sign in - varse</title>
      </Head>

      {/* <Main>
        <Logo size={32} />

        <Container>
          <CardContent>
            <Title>Sign in</Title>
            <Divider />

            <FormContainer>
              <label htmlFor="email">
                E-mail
                <input type="email" id="email" placeholder="john@example.com" />
              </label>

              <label htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  placeholder="john@example.com"
                />
              </label>

              <Link href="/recover">Forget my password</Link>

              <button type="button">Sign in</button>
            </FormContainer>

            <NotMember>
              Not a member yet? <Link href="/register"> Sign up</Link>
            </NotMember>
          </CardContent>
        </Container>
      </Main> */}
    </>
  );
}
