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
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { GET_POSTS } from "..";

interface FormElements extends HTMLFormElement {
  titleInput: HTMLInputElement;
  body: HTMLInputElement;
}

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!) {
    createPost(data: { title: $title, body: $body }) {
      data {
        id
      }
    }
  }
`;

const PostCreate = () => {
  const [loading, toggleLoading] = useToggle();
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<FormElements>) => {
      e.preventDefault();

      toggleLoading(true);
      const elements: FormElements = e.currentTarget;
      const title = elements.titleInput.value;
      const body = elements.body.value;
      await createPost({
        variables: { title, body },
      });
      toggleLoading(false);
      router.push("/");
    },
    [createPost, toggleLoading, router]
  );

  return (
    <Container size={900} padding={16} co={{ marginTop: 16 }}>
      <Heading level={3} strong>
        Create Post
      </Heading>
      <Divider />
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input placeholder="Title" name="titleInput" />
          <Input
            component="textarea"
            rows={20}
            multiline
            placeholder="Body"
            name="body"
          />
          <Button type="submit" loading={loading}>
            Create
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default PostCreate;
