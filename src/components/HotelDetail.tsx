import { useParams, useNavigate } from "react-router-dom";
import { useHotelStore } from "../store/HotelStore";
import {
  Box,
  Text,
  Badge,
  Flex,
  Heading,
  Divider,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { HotelFormProps } from "../types/hotel";
import { HotelMaps } from "./HotelMaps";
import Map from "./Map";

export const HotelDetail: React.FC<HotelFormProps> = ({
  coordinates,
  setCoordinates,
}) => {
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
    <div>
      <Box
        mt={5}
        p={6}
        border="2px solid #E2E8F0"
        borderRadius="lg"
        boxShadow="md"
        maxW="600px"
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
            colorScheme="blue"
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

        <Heading size="lg" color="teal.600" mb={4} textAlign="center">
          {hotel.name}
        </Heading>
        <Text fontSize="2xl" color="gray.600" textAlign="center">
          {hotel.city}, {hotel.country}
        </Text>
        <Flex align="center" color="gray.800" mb={4}>
          <Icon as={MdLocationOn} boxSize={6} color="teal.500" mr={2} />
          <Text fontSize="lg">{hotel.address}</Text>
        </Flex>
        <Flex mt={4} justify="center">
          <Badge
            colorScheme="teal"
            variant="solid"
            px={4}
            py={2}
            borderRadius="md"
            fontSize="md"
          >
            {hotel.brand}
          </Badge>
        </Flex>
        <Divider my={6} />

        <Text fontSize="lg" color="gray.800" mb={2}>
          <strong>Rating:</strong> {hotel.rating} / 5
        </Text>

        <Text fontSize="lg" color="gray.800" mb={4}>
          <strong>Review:</strong> {hotel.review}
        </Text>
        <div>
          {coordinates && (
            <HotelMaps
              coordinates={hotel.coordinates}
              setCoordinates={setCoordinates}
            />
          )}
        </div>
      </Box>

      <Box
        mt={4}
        mb={20}
        p={6}
        border="2px solid #E2E8F0"
        borderRadius="lg"
        boxShadow="md"
        maxW="600px"
        mx="auto"
        bg="white"
        position="relative"
      >
        <Heading size="lg" color="teal.600" mb={6} textAlign="center">
          Location Map
        </Heading>

        <Map address={fullAddress} />
      </Box>
    </div>
  );
};
