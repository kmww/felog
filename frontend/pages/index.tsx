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
  Anchor,
} from "@co-design/core";

const GET_POSTS = gql`
  query GetPost {
    posts {
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

const Home = () => {
  const { data, loading, error } = useQuery(GET_POSTS);
  return (
    <Container padding={16} co={{ marginTop: 16 }}>
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <EquallyGrid cols={4}>
          {data.posts.data.map((post: any) => (
            <Card key={post.id}>
              <NextLink
                style={{ textDecoration: "none" }}
                href="/posts/[id]"
                as={`posts/${post.id}`}
              >
                <Anchor co={{ color: "black" }}>
                  <Heading level={4}>{post.attributes.title}</Heading>
                </Anchor>
              </NextLink>
              <Text lineClamp={3}>{post.attributes.body}</Text>
              <Divider />
              <Text block align="right">
                {post.attributes.user.data.attributes.username}
              </Text>
            </Card>
          ))}
        </EquallyGrid>
      )}
    </Container>
  );
};

export default Home;
