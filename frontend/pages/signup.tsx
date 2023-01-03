import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Container,
  Divider,
  Heading,
  Input,
  Stack,
} from "@co-design/core";
import { useToggle } from "@co-design/hooks";
import { FormEvent, useCallback } from "react";
import nookies from "nookies";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

interface FormElements extends HTMLFormElement {
  username: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
    }
  }
`;

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { token } = nookies.get(ctx);
  if (token) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return { props: {} };
};

const SignUp = () => {
  const [loading, toggleLoading] = useToggle();
  const [register] = useMutation(REGISTER);
  const router = useRouter();
  const handleSubmit = useCallback(
    async (e: FormEvent<FormElements>) => {
      e.preventDefault();
      toggleLoading(true);

      const elements: FormElements = e.currentTarget;
      const username = elements.username.value;
      const email = elements.email.value;
      const password = elements.password.value;

      const result = await register({
        variables: { username, email, password },
      });
      nookies.set(null, "token", result.data.register.jwt, { path: "/" });
      toggleLoading(false);
      router.push("/");
    },
    [toggleLoading, router, register]
  );

  return (
    <Container size="xsmall" padding={16} co={{ marginTop: 16 }}>
      <Heading strong level={3} align="center">
        Sign Up
      </Heading>
      <Divider />
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input type="text" placeholder="Username" name="username" />
          <Input type="email" placeholder="Email" name="email" />
          <Input type="password" placeholder="Password" name="password" />
          <Button type="submit" loading={loading}>
            Sign Up
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default SignUp;
