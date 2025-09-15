import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { CameraIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "../store/selectors/authSelectors";
import { updateProfile } from "../store/slices/authSlice";

const ProfilePictureUpdater = ({ name, avatar }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isUpdateing = useSelector(authSelectors.isUpdatingAvatar)
  const toast = useToast();
  const inputRef = useRef();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  // Trigger file input
  const handleIconClick = () => {
    inputRef.current.click();
  };

  // File select and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if same image selected again
    if (avatar && preview === null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result === avatar) {
          toast({
            status: "error",
            title: "Image already updated",
            description: "Please select a different image.",
            duration: 3000,
            isClosable: true,
          });
          inputRef.current.value = ""; // reset input
        } else {
          setSelectedFile(file);
          setPreview(reader.result);
          onOpen();
        }
      };
      reader.readAsDataURL(file);
    } else {
      // fresh case
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setPreview(reader.result);
        onOpen();
      };
      reader.readAsDataURL(file);
    }
  };


  // Upload to Cloudinary + Update Profile
  const handleUpload = async () => {
    if (!selectedFile) {
      return toast({
        status: "warning",
        title: "No file selected",
        description: "Please select a file before uploading.",
        duration: 3000,
        isClosable: true,
      });
    }

    try {
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      await dispatch(updateProfile(formData)).unwrap();
      toast({
        status: "success",
        title: "Profile Updated",
        description: "Your profile picture has been updated successfully!",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Upload error:", error);


    }
  };



  return (
    <Box position="relative" w="fit-content" >
      <Avatar src={avatar} size="2xl" name={name} />

      <IconButton
        display={'flex'}
        justifyContent={'center'}
        icon={<CameraIcon />}
        size="sm"
        isRound
        position="absolute"
        bottom={1}
        right={1}
        bg={'transparent'}
        border={'1px solid'}
        borderColor={'whiteAlpha.500'}
        onClick={handleIconClick}
        boxShadow={'base'}
        aria-label="Upload Avatar"
        transition={'all 0.3s'}
        _hover={{
          transform: "scale(1.09)"
        }}
      />
      <Input
        type="file"
        accept="image/*"
        display="none"
        ref={inputRef}
        onChange={handleFileChange}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter='blur(5px) hue-rotate(2deg)' />
        <ModalContent pb={4} bg='blackAlpha.600'
          backdropFilter='blur(10px) hue-rotate(90deg)'>
          <ModalHeader>Preview & Update</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {preview && (
                <Avatar src={preview} size="2xl" name={name} />
              )}
              <Text fontSize="sm" color="gray.500">
                Looks good? Click update to save your profile picture.
              </Text>
            </VStack>
            {/* Optional overlay loader inside modal only */}

          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="outline" mr={3}>
              Cancel
            </Button>
            <Button w={'fit-content'} onClick={handleUpload}
              bg={'#f10'}
              variant={'solid'}
              color={'white'}
              borderRadius="md"

            >
              {isUpdateing ? <Spinner /> : "Update"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfilePictureUpdater;
