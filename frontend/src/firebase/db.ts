import { child, getDatabase, push, ref, set, update } from "firebase/database";

const db = getDatabase();

export function writeUserData(
	userId: string,
	name: string,
	email: string,
	imageUrl: string
) {
	set(ref(db, "users/" + userId), {
		username: name,
		email: email,
		profile_picture: imageUrl,
	});
}

export function updateUserBookmarks(
	userId: string,
	bookmarkId: string | null,
	data: any
) {
	const updates: any = {};

	if (!bookmarkId) {
		const newPostKey = push(
			child(ref(db), `users/${userId}/bookmarks`)
		).key;
		updates[`users/${userId}/bookmarks/${newPostKey}`] = data;
	} else {
		updates[`users/${userId}/bookmarks/${bookmarkId}`] = data;
	}

	return update(ref(db), updates);
}
