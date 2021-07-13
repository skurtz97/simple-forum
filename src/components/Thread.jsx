import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Textarea,
  Text,
  Heading,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { getPostsByThreadId, addPostToThread } from "../firebase";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Formik, Form, Field } from "formik";
import { validateNewPost } from "../validate";
import FormAlert from "./FormAlert";

const Thread = () => {
  const { threadId } = useParams();
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostsByThreadId(threadId).then((postsData) => {
      setPosts(postsData);
      setLoading(false);
    });
  }, [threadId]);

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
          <Text whiteSpace="pre-wrap">{post.content}</Text>
        </Box>
      ))}

      <Formik
        initialValues={{ post: "" }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            setSubmitting(true);
            await addPostToThread(
              currentUser.displayName,
              posts[0].subject,
              values.post,
              threadId
            );
            setLoading(true);
            getPostsByThreadId(threadId).then((postsData) => {
              setPosts(postsData);
            });
            setSubmitting(false);
          } catch (err) {
            console.error(err.message);
            setFieldError("submit", err.message);
            setLoading(false);
          } finally {
            setSubmitting(false);
            setLoading(false);
          }
        }}
      >
        {({ isSubmitting, handleChange, errors }) => (
          <Form>
            {errors.submit && (
              <FormAlert status="error" message={errors.submit} />
            )}
            <Field name="post" validate={validateNewPost}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.post && form.touched.post}>
                  <Textarea
                    {...field}
                    id="post"
                    shadow="base"
                    rounded="lg"
                    bg="white"
                    mb="2"
                    size="md"
                    placeholder="Enter new post here"
                    value={form.values.post}
                    onChange={handleChange}
                  />
                  <FormErrorMessage mb="3">{form.errors.post}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default Thread;
