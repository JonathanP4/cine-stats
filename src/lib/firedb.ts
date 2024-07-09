import { child, get, getDatabase, ref, set, update } from "firebase/database";
import { app } from "@/lib/firebase";

const db = getDatabase(app);

export async function writeUserData(
    uid: string,
    name: string,
    email: string,
    photoURL: string | null
) {
    await set(ref(db, `users/${uid}`), {
        name,
        email,
        photoURL,
    });
}

export async function getUserData(uid: string) {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${uid}`));

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function updateUserData(
    uid: string,
    photoURL: string,
    name: string,
    email: string
) {
    try {
        const updates: any = {};
        updates[`/users/${uid}`] = { photoURL, name, email };
        return update(ref(db), updates);
    } catch (error) {
        console.log(error);
    }
}

export async function updateUserBookmarks(
    uid: string,
    movieId: string,
    data: any
) {
    try {
        const updates: any = {};
        updates[`/users/${uid}/bookmarks/${movieId}`] = data;
        return update(ref(db), updates);
    } catch (error) {
        console.log(error);
    }
}

export async function getUserBookmarks(uid: string) {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${uid}/bookmarks`));

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getBookmark(uid: string, movieId: string) {
    try {
        const dbRef = ref(db);
        const snapshot = await get(
            child(dbRef, `users/${uid}/bookmarks/${movieId}`)
        );

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}
