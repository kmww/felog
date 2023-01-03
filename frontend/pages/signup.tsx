import {
  Button,
  Container,
  Divider,
  Heading,
  Input,
  Stack,
} from "@co-design/core";

const SignUp = () => {
  return (
    <Container size="xsmall" padding={16} co={{ marginTop: 16 }}>
      <Heading strong level={3} align="center">
        Sign Up
      </Heading>
      <Divider />
      <form>
        <Stack>
          <Input type="text" placeholder="Username" name="username" />
          <Input type="email" placeholder="Email" name="email" />
          <Input type="password" placeholder="Password" name="password" />
          <Button type="submit">Sign Up</Button>
        </Stack>
      </form>
    </Container>
  );
};

export default SignUp;
