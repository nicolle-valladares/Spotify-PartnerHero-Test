export interface User {
  display_name?: string;
  images?: Image[];
  type?: string;
}

export interface Image {
  url?: string;
  height?: number;
  width?: number;
}
