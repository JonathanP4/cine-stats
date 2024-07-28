import { child, get, getDatabase, ref, set, update } from "firebase/database";
import { app } from "./app";

const db = getDatabase(app);

export function writeUserData(
	userId: string,
	name: string,
	email: string,
	imageUrl: string
) {
	try {
		set(ref(db, "users/" + userId), {
			username: name,
			email: email,
			profile_picture: imageUrl,
		});
	} catch (error) {
		console.log(error);
	}
}

export function updateUserBookmarks(
	userId: string,
	bookmarkId: string | null,
	data: any
) {
	const updates: any = {};

	updates[`users/${userId}/bookmarks/${bookmarkId}`] = data;

	return update(ref(db), updates);
}

export async function getBookmark(userId: string, bookmarkId: string) {
	const dbRef = ref(db);
	try {
		const snapshot = await get(
			child(dbRef, `users/${userId}/bookmarks/${bookmarkId}`)
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

export async function getUserBookmarks(userId: string) {
	try {
		let bookmarks = undefined;

		return bookmarks;
	} catch (error) {
		console.log(error);
	}
}
