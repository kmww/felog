import { gql, useMutation, useQuery } from "@apollo/client";
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
import { GET_POSTS } from "../..";

interface FormElements extends HTMLFormElement {
  titleInput: HTMLInputElement;
  body: HTMLInputElement;
}

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      data {
        id
        attributes {
          title
          body
          user {
            data {
              id
              attributes {
                username
                email
              }
            }
          }
        }
      }
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(id: $id, data: { title: $title, body: $body }) {
      data {
        id
      }
    }
  }
`;

const PostEdit = () => {
  const [submitLoading, toggleLoading] = useToggle();
  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { id: router.query.id },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent<FormElements>) => {
      e.preventDefault();

      toggleLoading(true);
      const elements: FormElements = e.currentTarget;
      const title = elements.titleInput.value;
      const body = elements.body.value;
      await updatePost({
        variables: { id: router.query.id, title, body },
      });
      toggleLoading(false);
      router.push("/");
    },
    [updatePost, toggleLoading, router]
  );

  return (
    <Container size={900} padding={16} co={{ marginTop: 16 }}>
      <Heading level={3} strong>
        Edit Post
      </Heading>
      <Divider />
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input
            placeholder="Title"
            defaultValue={data.post.data.attributes.title}
            name="titleInput"
          />
          <Input
            component="textarea"
            rows={20}
            multiline
            placeholder="Body"
            name="body"
            defaultValue={data.post.data.attributes.body}
          />
          <Button type="submit" loading={submitLoading}>
            Edit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default PostEdit;
