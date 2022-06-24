export interface Library {
  id?: string;
  user_id?: string;
  name?: string;
  items?: Songs[];
}

export interface Songs {
  id?: string;
  type?: string;
}