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
      interviewer,
      date,
      location,
      village,
      excerpt,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      storyMetadata,
      "gallery": gallery[] {
        "url": asset->url,
        caption,
        alt
      },
      "documents": documents[] {
        "url": asset->url,
        description,
        "filename": asset->originalFilename
      },
      body,
      "audioUrl": audio.asset->url,
      "youtubeUrl": youtubeUrl
    }
  `, { slug });
}
export async function getStoriesByIds(ids) {
  if (!ids || ids.length === 0) return [];
  return client.fetch(`
    *[_type == "story" && _id in $ids] | order(publishedAt desc) {
      _id,
      title,
      interviewee,
      interviewer,
      date,
      excerpt,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      location,
      village,
      "youtubeUrl": youtubeUrl
    }
  `, { ids });
}
