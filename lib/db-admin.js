import { compareDesc, parseISO } from "date-fns";
import { db } from "./firebase-admin";

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db
      .collection("feedback")
      .where("siteId", "==", siteId)
      .get();
    const feedback = [];

    snapshot.forEach((doc) => feedback.push({ id: doc.id, ...doc.data() }));
    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getUserSites(userId) {
  const snapshot = await db
    .collection("sites")
    .where("authorId", "==", userId)
    .get();
  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return sites;
}

export async function getAllFeedbackForUserSites(uid) {
  const sites = await getUserSites(uid);

  if (!sites.length) {
    return [];
  }

  const siteIds = sites.map((site) => site.id);
  const snapshot = await db
    .collection("feedback")
    .where("siteId", "in", siteIds)
    .get();

  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return feedback;
}
