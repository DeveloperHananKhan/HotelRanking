import { useHotelStore } from "../store/HotelStore";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Badge,
  SimpleGrid,
  Box,
  Flex,
  Button,
  Select,
  Icon
} from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export const HotelCard = () => {
  const hotel = useHotelStore((state) => state.hotels);
  const [filter, setFilter] = useState<string>("All Brand");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const filteredHotels =
    filter === "All Brand"
      ? hotel
      : hotel.filter((hotel) => hotel.brand === filter);
  const handleEdit = (id: string) => {
    navigate(`/hotels/${id}`);
  };
  return (
    <>
      <Box p={4}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading fontSize="2xl" color="teal.600">
            RankMyStay
          </Heading>
          <Button colorScheme="teal" onClick={() => navigate("/hotels-form")}>
            Add Hotel
          </Button>
        </Flex>

        <Flex
          direction="column"
          align="center"
          textAlign="center"
          mb={10}
          maxW="4xl"
          mx="auto"
        >
          <Heading fontSize="3xl" mb={4}>
            Welcome to RankMyStay
          </Heading>
          <Text fontSize="md" color="gray.600">
            Easily manage, rank, and organize your favourite hotels by brand.
            Add new hotels, update details, and filter by brands for a seamless
            experience. Your hotel data is safely stored and ready for you every
            time you return. Discover, organise, and rank with RankMyStay!
          </Text>
        </Flex>

        <Flex justify="space-between" align="flex-end" mb={4} pr={4}>
          <Heading fontSize="lg" mb={2}>
            Your Favourite Hotels
          </Heading>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            maxW="200px"
          >
            <option value="All Brand">All Brand</option>
            <option value="Wyndham Hotels & Resorts">
              Wyndham Hotels & Resorts
            </option>
            <option value="Marriott International">
              Marriott International
            </option>
            <option value="Choice Hotels International">
              Choice Hotels International
            </option>
            <option value="Hilton Worldwide">Hilton Worldwide</option>
            <option value="InterContinental Hotels Group">
              InterContinental Hotels Group
            </option>
            <option value="Accor">Accor</option>
            <option value="Best Western Hotels & Resorts">
              Best Western Hotels & Resorts
            </option>
            <option value="G6 Hospitality">G6 Hospitality</option>
            <option value="Jin Jiang">Jin Jiang</option>
            <option value="Huazhu">Huazhu</option>
          </Select>
        </Flex>

        {filteredHotels.length > 0 ? (
          <SimpleGrid
            fontFamily="'Poppins', sans-serif"
            fontWeight="semibold"
            columns={[1, 2, 3]}
            spacing={6}
            p={4}
          >
            {filteredHotels.map((hotel) => (
              <Card
                onClick={() => handleEdit(hotel.id)}
                key={hotel.id}
                maxW="sm"
                boxShadow="md"
                border="1px solid black"
                borderRadius="lg"
                overflow="hidden"
                _hover={{
                  boxShadow: "xl",
                  transform: "scale(1.02)",
                  transition: "0.2s",
                }}
              >
                <CardHeader>
                  <Heading size="md" color="teal.600">
                    {hotel.name}
                  </Heading>
                </CardHeader>

                <CardBody>
                  <Flex justify="space-between" mb={2}>
                    <Text fontSize="sm" color="gray.600">
                      {hotel.city}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {hotel.country}
                    </Text>
                  </Flex>
                  <Flex align="center" color="gray.800" mb={4}>
                    <Icon
                      as={MdLocationOn}
                      boxSize={6}
                      color="teal.500"
                      mr={2}
                    />
                    <Text fontSize="lg">
                       {hotel.address}
                    </Text>
                  </Flex>

                  <Box mb={2}>
                    <Badge
                      colorScheme="teal"
                      variant="solid"
                      px={2}
                      py={1}
                      borderRadius="md"
                    >
                      {hotel.brand}
                    </Badge>
                  </Box>

                  <Text mb={2} fontSize="sm">
                    <strong>Rating:</strong>{" "}
                    <span style={{ color: "gray" }}>{hotel.rating} / 5</span>
                  </Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" mt={8}>
            <Text fontSize="lg" color="gray.500">
              No hotels found for this brand.
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
};
