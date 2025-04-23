declare module 'react-places-autocomplete' {
  import * as React from 'react';

  interface PlacesAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    onSelect: (address: string) => void;
    children: (options: {
      getInputProps: (options?: any) => any;
      suggestions: any[];
      getSuggestionItemProps: (suggestion: any, options?: any) => any;
      loading: boolean;
    }) => React.ReactNode;
  }

  export default class PlacesAutocomplete extends React.Component<PlacesAutocompleteProps> {}

  export function geocodeByAddress(address: string): Promise<any[]>;
  export function getLatLng(result: any): Promise<{ lat: number; lng: number }>;
}