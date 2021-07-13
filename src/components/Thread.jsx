import { useState, useEffect } from "react";
import { Box, Flex, Button, Textarea, Text, Heading } from "@chakra-ui/react";
import { getPostsByThreadId, addPostToThread } from "../firebase";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Thread = () => {
  const { threadId } = useParams();
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    getPostsByThreadId(threadId).then((postsData) => {
      setPosts(postsData);
      setLoading(false);
    });
  }, [threadId]);

  const handleChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    addPostToThread(
      currentUser.displayName,
      posts[0].subject,
      newPost,
      threadId
    ).then((res) => {
      getPostsByThreadId(threadId).then((postsData) => {
        setPosts(postsData);
        setNewPost("");
        setLoading(false);
      });
    });
  };

  if (loading) {
    return <Heading>Loading...</Heading>;
  }

  return (
    <Flex direction="column" maxW="xxl" mx="8">
      {posts.map((post) => (
        <Box
          bg="gray.50"
          py="4"
          my="2"
          px="2"
          shadow="base"
          rounded="lg"
          _hover={{ backgroundColor: "gray.100" }}
          key={post.id}
        >
          <Text>{post.content}</Text>
        </Box>
      ))}
      <Textarea
        shadow="base"
        rounded="lg"
        bg="white"
        mb="2"
        size="md"
        placeholder="Enter new post here"
        onChange={handleChange}
        value={newPost}
      />
      <Button type="button" colorScheme="blue" onClick={handleSubmit}>
        Submit
      </Button>
    </Flex>
  );
};

export default Thread;
