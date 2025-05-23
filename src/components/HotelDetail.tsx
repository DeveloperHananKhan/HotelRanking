import { useParams, useNavigate } from "react-router-dom";
import { useHotelStore } from "../store/HotelStore";
import {
  Box,
  Text,
  
  Flex,
  Heading,
  Divider,
  IconButton,
 
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Map from "./Map";

export const HotelDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const hotels = useHotelStore((state) => state.hotels);
  const deleteHotel = useHotelStore((state) => state.deleteHotel);

  const handleDelete = (id: string) => {
    deleteHotel(id);
    navigate("/");
  };
  const handleEditClick = (id: string) => {
    navigate(`/hotels-form/${id}`);
  };

  const hotel = hotels.find((hotel) => hotel.id === id);

  const fullAddress = `${hotel?.address}, ${hotel?.city}, ${hotel?.country}`;

  if (!hotel) {
    return <Text>No hotel found with this ID</Text>;
  }

  return (
    <>
      <Box m={20} mt={0} p={4}>
       

        
        <Flex justify="space-between" align="center"   mb={6}>
          <Heading fontSize="xl" color="rgb(51 65 85 / var(--tw-bg-opacity))">
            RankMyStay
          </Heading>
          <Button
            border="1px solid rgb(51 51 51)"
            background="fff"
            borderRadius="30px"
            _hover={{
              background: "rgb(51 51 51)",
              color: "white",
            }}
            onClick={() => navigate("/hotels-form")}
          >
            Add Hotel
          </Button>
        </Flex>
       

        <Box
          mt={5}
          p={6}
          border="1px solid black"
          borderRadius="lg"
          maxW="1200px"
          mx="auto"
          bg="white"
          position="relative"
        >
          <Flex position="absolute" top={4} right={4} gap={2}>
            <IconButton
              onClick={() => {
                handleEditClick(hotel.id);
              }}
              aria-label="Edit Hotel"
              icon={<EditIcon />}
              size="sm"
              colorScheme="black"
              variant="outline"
            />
            <IconButton
              onClick={() => {
                handleDelete(hotel.id);
              }}
              aria-label="Delete Hotel"
              icon={<DeleteIcon />}
              size="sm"
              colorScheme="red"
              variant="outline"
            />
          </Flex>

          <Heading size="lg" color="black" mb={10}>
            {hotel.name}
          </Heading>
          <Flex flexDirection="column" justifyContent='space-evenly'>
            <Text  fontSize="lg" color="black">
              <strong style={{ color: "black",fontSize:'20px' }}>Location:</strong> {hotel.city}
              , {hotel.country}
            </Text>

            <Text fontSize="lg">
              <strong style={{ color: "black",fontSize:'20px' }}>Address:</strong>{" "}
              {hotel.address}
            </Text>

            <Text color="black" fontSize="lg" mb={5}>
              <strong style={{ color: "black",fontSize:'20px' }}>Brand:</strong> {hotel.brand}
            </Text>

            <Text fontSize="lg" color="black" >
              <strong  style={{ color: "black",fontSize:'20px' }}>Rating:</strong> ({hotel.rating} / 5)
            </Text>

            <Text fontSize="lg" color="black" mt={4}>
              <strong style={{ color: "black",fontSize:'20px' }}>Review:</strong> {hotel.review}
            </Text>
          </Flex>
          
        </Box>

        <Box
          mt={4}
          mb={10}
          p={6}
          border="1px solid black"
          borderRadius="lg"
          boxShadow="md"
          maxW="1200px"
          mx="auto"
          bg="white"
          position="relative"
        >
          <Heading size="lg" color="black" mb={6} textAlign="start">
            Location Map
          </Heading>

          <Map address={fullAddress} />
        </Box>
            <Divider mb={10}></Divider>
          <Text textAlign='center' fontSize='13px' >Copyright 2025</Text>
      </Box>
    </>
  );
};
