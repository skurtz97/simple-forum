import { Box, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const ThreadCard = ({ threadId, subject }) => {
  return (
    <Link as={RouterLink} to={`/thread/${threadId}`}>
      <Box
        bg="gray.50"
        py="4"
        my="2"
        px="2"
        shadow="base"
        rounded="lg"
        _hover={{ backgroundColor: "gray.100" }}
      >
        <Text fontWeight="bold">{subject}</Text>
      </Box>
    </Link>
  );
};

export default ThreadCard;
