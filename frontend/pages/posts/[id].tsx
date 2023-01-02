import { Container, Heading, Divider, Text } from "@co-design/core";

interface Props {
  id: string;
}

const PostDetail = ({ id }: Props) => {
  return (
    <Container size={900} co={{ marginTop: 16 }}>
      <Heading>Title</Heading>
      <Divider />
      <Text>Body</Text>
      <Divider />
      <Text size="small">cojet | coject.123.123</Text>
    </Container>
  );
};

export default PostDetail;
