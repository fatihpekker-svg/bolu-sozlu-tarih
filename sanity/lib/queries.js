import { client } from "./client";

export async function getStories() {
  return client.fetch(`
    *[_type == "story"] | order(publishedAt desc) {
      _id,
      title,
      interviewee,
      date,
      excerpt,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      location,
      "youtubeUrl": youtubeUrl
    }
  `);
}

export async function getStory(slug) {
  return client.fetch(`
    *[_type == "story" && slug.current == $slug][0] {
      _id,
      title,
      interviewee,
      date,
      excerpt,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      location,
      body,
      "audioUrl": audio.asset->url,
      "youtubeUrl": youtubeUrl
    }
  `, { slug });
}
