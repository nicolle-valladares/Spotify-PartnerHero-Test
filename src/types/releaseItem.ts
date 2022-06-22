export interface Items {
  album_type?: string;
  artists: Artists[];
  id?: string;
  images?: Images[];
  name?: string;
}

export interface Artists {
  external_urls?: Object;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
}

export interface Images {
  height?: Number;
  url?: string;
  width?: Number;
}
