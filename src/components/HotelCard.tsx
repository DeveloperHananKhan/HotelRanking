import { useHotelStore } from "../store/HotelStore";
import { useBrandStore } from "../store/AddBrandStore";
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
  Icon,
} from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export const HotelCard = () => {
  const hotel = useHotelStore((state) => state.hotels);
  const {brands} = useBrandStore()
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
      <Box m={20} mt={0}  p={4}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading fontSize="xl" color="rgb(51 65 85 / var(--tw-bg-opacity))">
            RankMyStay
          </Heading>
          <Button
            border="1px solid rgb(51 51 51)"
              background = "fff"
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

        <Flex
          direction="column"
          align="center"
          textAlign="center"
          mb={10}
          maxW="4xl"
          mx="auto"
        >
          <Heading fontSize="4xl" fontWeight={400} mb={4}>
            Welcome to RankMyStay
          </Heading>
          <Text fontSize="md" color="black.600">
            Easily manage, rank, and organize your favourite hotels by brand.
            Add new hotels, update details, and filter by brands for a seamless
            experience. Your hotel data is safely stored and ready for you every
            time you return. Discover, organise, and rank with RankMyStay!
          </Text>
        </Flex>

        <Flex justify="space-between" align="flex-end" mb={4} pr={4}>
          <Heading fontSize="2xl" mb={0} ml={3} fontWeight={500}>
            Your Favourite Hotels
          </Heading>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            maxW="200px"
          >
            <option value="All Brand">All Brand</option>
          {brands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
          </Select>
        </Flex>

        {filteredHotels.length > 0 ? (
          <SimpleGrid
            fontFamily="'Poppins', sans-serif"
            fontWeight="semibold"
            columns={[1, 2, 3, 4]}
            spacing={4}
            p={4}
          >
            {filteredHotels.map((hotel) => (
              <Card
                onClick={() => handleEdit(hotel.id)}
                key={hotel.id}
                maxW="sm"
                boxShadow="sm"
                border="1px solid gray "
                borderRadius="xl"
                overflow="hidden"
                _hover={{
                  boxShadow: "xl",
                  transform: "scale(1)",
                  transition: "0.3s",
                }}
              >
                <CardHeader m={0}>
                  <Heading
                    size="md"
                    color="rgb(51 51 51 / var(--tw-border-opacity))"
                    mb={0}
                  >
                    {hotel.name}
                  </Heading>
                </CardHeader>

                <CardBody mt={0}>
                  <Flex justify="space-between" mb={2}>
                    <Text fontSize="sm" color="black" fontWeight='100'>
                      {hotel.city}
                    </Text>
                    <Text fontSize="sm" color="black" fontWeight='100'>
                      {hotel.country}
                    </Text>
                  </Flex>
                  <Flex align="center" color="gray.800" mb={4}>
                    <Icon
                      as={MdLocationOn}
                      boxSize={6}
                      color="rgb(51 65 85 / var(--tw-bg-opacity))"
                      mr={2}
                    />
                    <Text fontSize="sm" fontWeight={200}>{hotel.address}</Text>
                  </Flex>

                  <Box mb={2}>
                    <Badge
                      backgroundColor="rgb(51 65 85 )"
                      color='white'
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontWeight="200"
                    >
                      {hotel.brand}
                    </Badge>
                  </Box>

                  <Text mt={2} mb={2} fontSize="sm">
                    <strong style={{color:"gray",fontWeight:"100"}}>Rating:</strong>{" "}
                    <span style={{ color: "black",fontWeight:"100" }}>{hotel.rating} / 5</span>
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
