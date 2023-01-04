import { gql, useQuery } from "@apollo/client";
import NextLink from "next/link";
import {
  Card,
  Heading,
  Text,
  Divider,
  EquallyGrid,
  Spinner,
  Center,
  Container,
  Stack,
  View,
  Button,
} from "@co-design/core";
import { NextLinkComposed } from "../components";

export const GET_POSTS = gql`
  query GetPost {
    posts(sort: ["createdAt:desc"]) {
      data {
        id
        attributes {
          title
          body
          createdAt
          user {
            data {
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;

interface Prop {
  token?: string;
}

const Home = ({ token }: Prop) => {
  const { data, loading, error } = useQuery(GET_POSTS);
  return (
    <Container padding={16} co={{ marginTop: 16 }}>
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Stack>
          {token && (
            <View co={{ textAlign: "right" }}>
              <Button component={NextLinkComposed} href="/posts/create">
                글쓰기
              </Button>
            </View>
          )}
          <EquallyGrid cols={4}>
            {data.posts.data.map((post: any) => (
              <Card key={post.id}>
                <NextLink
                  style={{ textDecoration: "none", color: "black" }}
                  href="/posts/[id]"
                  as={`posts/${post.id}`}
                >
                  <Heading level={4}>{post.attributes.title}</Heading>
                </NextLink>
                <Text lineClamp={3}>{post.attributes.body}</Text>
                <Divider />
                <Text block align="right">
                  {post.attributes.user.data.attributes.username}
                </Text>
              </Card>
            ))}
          </EquallyGrid>
        </Stack>
      )}
    </Container>
  );
};

export default Home;
