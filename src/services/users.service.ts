import firestore from "./firebase";
import { User } from "../types/user";

const db = firestore.collection("/Users");

class UsersService {
  getAll() {
    return db;
  }
  async getOrCreate(id: string, user: User) {
    const getUser = await db.where("id", "==", id).get();
    let data;

    if (getUser.empty) {
      data = db.add(user);
    } else {
      data = getUser.docs;
    }
    return data;
  }
  create(user: User) {
    return db.add(user);
  }
  update(id: string, value: any) {
    return db.doc(id).update(value);
  }
  delete(id: string) {
    return db.doc(id).delete();
  }
}
export default new UsersService();
