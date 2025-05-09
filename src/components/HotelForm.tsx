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
} from "@chakra-ui/react";
import { Hotel } from "../types/hotel";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHotelStore } from "../store/HotelStore";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { HotelFormProps } from "../types/hotel";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { useEffect, useState } from "react";
export const HotelForm: React.FC<HotelFormProps> = ({
  coordinates,
  setCoordinates,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const hotels = useHotelStore((state) => state.hotels);
  const addOrUpdateHotel = useHotelStore((state) => state.addOrUpdateHotel);
  const [address, setAddress] = useState<string>("");
  const hotelToEdit = id
    ? hotels.find((hotel: Hotel) => hotel.id === id)
    : null;
  const { register, handleSubmit, reset, setValue } = useForm<Hotel>({
    defaultValues: hotelToEdit || {},
  });

  useEffect(() => {
    if (hotelToEdit) {
      reset(hotelToEdit);
      setAddress(hotelToEdit.address || "");
    }
  }, [hotelToEdit, reset]);

  const onSubmit: SubmitHandler<Hotel> = (data) => {
    const newHotel = {
      ...data,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      city: data.city.charAt(0).toUpperCase() + data.city.slice(1),
      country: data.country.charAt(0).toUpperCase() + data.country.slice(1),
      address: data.address,
      id: hotelToEdit ? hotelToEdit.id : uuidv4(),
      coordinates: coordinates,
    };
    console.log("New Hotel:", newHotel);
    addOrUpdateHotel(newHotel);
    navigate("/");
  };

  const HomePage = () => {
    navigate("/");
  };
  const handleChange = (address: string) => {
    setAddress(address);
    setValue("address", address);
  };
  const handleSelect = async (seletctedAdress: string) => {
    setAddress(seletctedAdress);

    try {
      const response = await geocodeByAddress(seletctedAdress);

      if (response && response.length > 0) {
        const formattedAddress = response[0].formatted_address;
        const latLng = await getLatLng(response[0]);
        setCoordinates(latLng);
        setValue("address", formattedAddress);
      }
    } catch (error) {
      console.error("Error fetching address: ", error);
    }
  };

  return (
    <>
      <Heading
        onClick={HomePage}
        size="xl"
        as="h2"
        mt={4}
        ml={5}
        bgGradient="linear(to-l, teal.500, teal.600)"
        bgClip="text"
      >
        RankMyStay
      </Heading>
      <Box fontFamily="'Poppins', sans-serif" maxWidth="400px" mx="auto" mt={5}>
        <Heading as="h2" size="md" mb={4} color="teal.500">
          Add Hotel Details
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="name">Hotel Name</FormLabel>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter hotel name"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input id="city" {...register("city")} placeholder="Enter city" />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input
              id="country"
              {...register("country")}
              placeholder="Enter country"
            />
          </FormControl>
          <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
          >
            {({ getInputProps }) => (
              <div>
                <FormControl isRequired mb={4}>
                  <FormLabel htmlFor="address">Street Address</FormLabel>
                  <Input
                    id="address"
                    {...getInputProps({
                      placeholder: "Enter address",
                      className: "location-search-input",
                    })}
                  />
                </FormControl>
              </div>
            )}
          </PlacesAutocomplete>

          <FormControl mb={4}>
            <FormLabel htmlFor="brand">Brand</FormLabel>
            <Select
              id="brand"
              {...register("brand")}
              placeholder="Select brand"
            >
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
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="rating">Rating</FormLabel>
            <NumberInput
              id="rating"
              min={1}
              max={5}
              step={0.1}
              defaultValue={0}
              precision={1}
            >
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
            <Textarea
              id="review"
              {...register("review")}
              placeholder="Enter review"
            />
          </FormControl>

          <Button colorScheme="teal" type="submit" width="full">
            {hotelToEdit ? "Update Hotel" : "Add Hotel"}
          </Button>
        </form>
      </Box>
    </>
  );
};
