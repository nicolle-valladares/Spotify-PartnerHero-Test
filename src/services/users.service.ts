import firestore from "./firebase";
import { User } from "../types/user";
import librariesService from "./libraries.service";

const db = firestore.collection("/Users");

class UsersService {
  getAll() {
    return db;
  }
  async getOrCreate(id: string, user: User) {
    const getUser = await db.where("id", "==", id).get();
    let data;

    if (getUser.empty) {
      const newUser = this.create(user)
      const dataUser = (await (await newUser).get()).data();

      const library = {
        name: "My Library",
        user_id: dataUser?.id,
        items: [],
      };
      data = librariesService.create(library);
    } else {
      data = librariesService.getByUser(getUser.docs[0].data().id);
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
