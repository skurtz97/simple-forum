import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";

import { addThread } from "../firebase";

const NewThreadModal = ({ isOpen, onClose, user }) => {
  const [newThread, setNewThread] = useState({ subject: "", post: "" });

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setNewThread({ ...newThread, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("submitting => ", newThread, user.displayName);
      await addThread(user.displayName, newThread.subject, newThread.post);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Thread</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Subject</FormLabel>
            <Input
              id="subject"
              name="subject"
              placeholder="Subject"
              onChange={handleChange}
              value={newThread.subject}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Initial Post</FormLabel>
            <Textarea
              id="post"
              name="post"
              placeholder="Initial post"
              onChange={handleChange}
              value={newThread.post}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            colorScheme="blue"
            mr={3}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewThreadModal;
