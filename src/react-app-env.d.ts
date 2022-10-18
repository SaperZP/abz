/// <reference types="react-scripts" />
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
}

interface Users {
  count: number;
  links: {
    next_url: string | null;
    prev_url: string | null;
  };
  page: number;
  success: boolean;
  total_pages: number;
  total_users: number;
  users: User[];
}

interface Position {
  id: number;
  name: string;
}

interface Positions {
  success: boolean;
  positions: Position[];
}

interface Token {
  success: boolean;
  token: string;
}

interface FieldsError {
  nameIsValid: boolean;
  emailIsValid: boolean;
  phoneIsValid: boolean;
  photoIsValid: boolean;
}
