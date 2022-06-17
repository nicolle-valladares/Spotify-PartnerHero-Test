export interface User {
  id?: string;
  display_name?: string;
  images?: Image[];
  type?: string;
}

export interface Image {
  url?: string; 
  height?: number;
  width?: number;
}
