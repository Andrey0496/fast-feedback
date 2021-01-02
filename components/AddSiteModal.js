import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import { useForm } from "react-hook-form";
import { createSite } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";

export default function AddSiteModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const auth = useAuth();
  const { data } = useSWR("/api/sites", fetcher);

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const { register, handleSubmit, watch, errors } = useForm();
  const onCreateSite = ({ site, link }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      site,
      link,
    };
    const { id } = createSite(newSite);
    toast({
      title: "Success!",
      description: "We've added your site",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    mutate(
      ["/api/sites", auth.user.token],
      async (data) => ({
        sites: [...data.sites, { id, ...newSite }],
      }),
      false
    );
    onClose();
  };

  return (
    <>
      <Button
        id="add-site-modal-button"
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {children}
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onCreateSite)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="My Site"
                  name="site"
                  ref={register({ required: true })}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Link</FormLabel>
                <Input
                  placeholder="https://website.com"
                  name="link"
                  ref={register({ required: true })}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Cancel
              </Button>
              <Button backgroundColor="#99FFFE" type="submit">
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
