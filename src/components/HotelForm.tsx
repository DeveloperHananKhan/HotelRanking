import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
} from "@chakra-ui/react";
import { Hotel } from "../types/hotel";
import { useBrandStore } from "../store/AddBrandStore";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHotelStore } from "../store/HotelStore";
import { useModal } from "../store/AddBrandStore";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { BrandModal } from "./BrandModal";

import React, { useEffect, useState, useRef } from "react";

export const HotelForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const hotels = useHotelStore((state) => state.hotels);
  const addOrUpdateHotel = useHotelStore((state) => state.addOrUpdateHotel);
  const { isOpen, openModal } = useModal();
  const { brands } = useBrandStore();

  const hotelToEdit = id ? hotels.find((hotel: Hotel) => hotel.id === id) : null;

  const { register, handleSubmit, reset, setValue } = useForm<Hotel>({
    defaultValues: hotelToEdit || {},
  });


  const [address, setAddress] = useState<string>(hotelToEdit?.address || "");
  const [predictions, setPredictions] = useState<any[]>([]);
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  
  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps JavaScript API not loaded.");
      return;
    }
    sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
    autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
  }, []);

 
  useEffect(() => {
    if (hotelToEdit) {
      reset(hotelToEdit);
      setAddress(hotelToEdit.address || "");
    }
  }, [hotelToEdit, reset]);

  
  useEffect(() => {
    if (!autocompleteServiceRef.current || !address) {
      setPredictions([]);
      return;
    }

    autocompleteServiceRef.current.getQueryPredictions(
      {
        input: address,
        sessionToken: sessionTokenRef.current!,
      },
      (predictionsResult, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictionsResult) {
          setPredictions(predictionsResult);
        } else {
          setPredictions([]);
        }
      }
    );
  }, [address]);

  const onSubmit: SubmitHandler<Hotel> = (data) => {
    const newHotel = {
      ...data,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      city: data.city.charAt(0).toUpperCase() + data.city.slice(1),
      country: data.country.charAt(0).toUpperCase() + data.country.slice(1),
      address: data.address,
      id: hotelToEdit ? hotelToEdit.id : uuidv4(),
    };
    addOrUpdateHotel(newHotel);
    navigate("/");
  };

  const HomePage = () => {
    navigate("/");
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    setValue("address", value);
  };

  const handleSelectSuggestion = (description: string) => {
    setAddress(description);
    setValue("address", description);
    setPredictions([]);
  };

  return (
    <>
      {isOpen && <BrandModal />}

      <Flex justify="space-between" align="center" mt={5} mb={6}>
        <Heading
          ml={10}
          onClick={HomePage}
          fontSize="xl"
          color="rgb(51 65 85 / var(--tw-bg-opacity))"
          cursor="pointer"
        >
          RankMyStay
        </Heading>
        <Button
          mr={10}
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

      <Box fontFamily="'Poppins', sans-serif" maxWidth="400px" mx="auto" mt={5}>
        <Heading as="h2" size="xl" fontWeight={500} mb={4} color="black">
          Add Hotel Details
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="name">Hotel Name</FormLabel>
            <Input id="name" {...register("name")} placeholder="Enter hotel name" />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input id="city" {...register("city")} placeholder="Enter city" />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input id="country" {...register("country")} placeholder="Enter country" />
          </FormControl>

          
          <FormControl isRequired mb={4} position="relative">
            <FormLabel htmlFor="address">Street Address</FormLabel>
            <Input
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
              autoComplete="off"
            />
            {predictions.length > 0 && (
              <Box
                position="absolute"
                zIndex={1000}
                bg="white"
                border="1px solid gray"
                width="100%"
                maxHeight="150px"
                overflowY="auto"
                borderRadius="md"
                mt={1}
                boxShadow="md"
              >
                {predictions.map((prediction) => (
                  <Box
                    key={prediction.place_id}
                    p={2}
                    cursor="pointer"
                    _hover={{ backgroundColor: "gray.100" }}
                    onClick={() => handleSelectSuggestion(prediction.description)}
                  >
                    {prediction.description}
                  </Box>
                ))}
              </Box>
            )}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel htmlFor="brand">Brand</FormLabel>
            <Select id="brand" {...register("brand")} placeholder="Select brand">
              {brands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </Select>
            <Button
              onClick={openModal}
              backgroundColor="black"
              color="white"
              _hover={{
                background: "rgb(51 51 51)",
                color: "white",
              }}
              mt={2}
            >
              Add Brand
            </Button>
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="rating">Rating</FormLabel>
            <NumberInput id="rating" min={1} max={5} step={0.1} defaultValue={0} precision={1}>
              <NumberInputField
                {...register("rating", {
                  valueAsNumber: true,
                  required: true,
                  min: 1,
                  max: 5,
                })}
                placeholder="Enter rating"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel htmlFor="review">Review</FormLabel>
            <Textarea id="review" {...register("review")} placeholder="Enter review" />
          </FormControl>

          <Button
            backgroundColor="black"
            color="white"
            _hover={{
              background: "rgb(51 51 51)",
              color: "white",
            }}
            type="submit"
            width="full"
          >
            {hotelToEdit ? "Update Hotel" : "Add Hotel"}
          </Button>
        </form>
      </Box>
    </>
  );
};
