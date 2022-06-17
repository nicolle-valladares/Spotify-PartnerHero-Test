import { Library } from "../types/library";
import firestore from "./firebase";


const db = firestore.collection("/Libraries");

class LibrariesService {
  getAll() {
    return db;
  }
  create(library: Library) {
    return db.add(library);
  }
  update(id: string, value: any) {
    return db.doc(id).update(value);
  }
  delete(id: string) {
    return db.doc(id).delete();
  }
}
export default new LibrariesService();
