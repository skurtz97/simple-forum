import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getThreads } from "../firebase";
import NewThreadModal from "./NewThreadModal";

import {
  Box,
  Button,
  IconButton,
  Flex,
  Heading,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

import ThreadCard from "./ThreadCard";

const Home = () => {
  // Our threads
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  // For signing out
  const { signout, currentUser } = useAuth();
  // Controls modal for add thread
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getThreads();
        setThreads(snapshot.docs);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Flex direction="column" maxW="xxl" mx="8">
      <Flex direction="column">
        <Flex my="2" justify="space-between" align="center">
          <Heading>Threads</Heading>
          <Text>Logged in as: {currentUser.displayName}</Text>
          <Box>
            <Button onClick={onOpen} colorScheme="blue" px="8" mr="2">
              Add Thread
            </Button>
            <Button colorScheme="red" onClick={() => signout()}>
              Logout
            </Button>
          </Box>
        </Flex>
        <Flex direction="column">
          {!loading ? (
            threads.map((thread) => (
              <ThreadCard
                key={thread.id}
                threadId={thread.id}
                subject={thread.data().subject}
              />
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </Flex>
      </Flex>

      <Box>
        <Flex justify="space-between" alignItems="center">
          <Flex>
            <NewThreadModal
              isOpen={isOpen}
              onClose={onClose}
              user={currentUser}
            />
          </Flex>
          <Box mt="2">
            <IconButton mr="2" colorScheme="blue" icon={<ArrowLeftIcon />} />
            <IconButton colorScheme="blue" icon={<ArrowRightIcon />} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;
