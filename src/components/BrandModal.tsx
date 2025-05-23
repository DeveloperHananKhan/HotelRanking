import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useBrandStore, useModal } from "../store/AddBrandStore";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export const BrandModal = () => {
  const { AddOrUpdateBrand, DeleteBrand, brands } = useBrandStore();
  const { closeModal } = useModal();
  const toast = useToast();
  const [brandName, setBrandName] = useState<string>("");

  const addBrand = () => {
    if (!brandName.trim()) {
      toast({
        title: "Brand name cannot be empty",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const exists = brands.some(
      (b) => b.name.toLowerCase() === brandName.toLowerCase()
    );
    if (exists) {
      toast({
        title: "Brand already exists",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const newBrand = {
      id: uuidv4(),
      name: brandName.charAt(0).toUpperCase() + brandName.slice(1),
    };

    AddOrUpdateBrand(newBrand);
    setBrandName("");
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="rgba(0, 0, 0, 0.5)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1000"
    >
      <Box
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        minW="400px"
        maxH="80vh"
        overflowY="auto"
        position="relative"
      >
        <Heading size="md" mb={4}>
          Manage Brands
        </Heading>

        <Flex gap={2} mb={4}>
          <Input
            placeholder="Enter brand name"
            variant="flushed"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <Button
            onClick={addBrand}
            backgroundColor="black"
            color="white"
            _hover={{ background: "rgb(51 51 51)" }}
          >
            Add
          </Button>
        </Flex>

        <Box mb={6}>
          {brands.map((brand) => (
            <Flex
              key={brand.id}
              justify="space-between"
              align="center"
              p={2}
              borderBottom="1px solid #ccc"
            >
              <Text>{brand.name}</Text>
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                aria-label="Delete brand"
                size="sm"
                onClick={() => DeleteBrand(brand.id)}
              />
            </Flex>
          ))}
        </Box>

        <Button
          variant="outline"
          colorScheme="gray"
          onClick={closeModal}
          position="absolute"
          top={2}
          right={2}
        >
          X
        </Button>
      </Box>
    </Box>
  );
};
