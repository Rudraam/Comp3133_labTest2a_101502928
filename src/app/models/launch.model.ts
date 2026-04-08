export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    webcast: string | null;
    wikipedia: string | null;
  };
  rocket: string;
  flight_number: number;
}
