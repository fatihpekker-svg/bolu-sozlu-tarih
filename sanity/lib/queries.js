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

export async function getCollections() {
  return client.fetch(`
    *[_type == "collection"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      "imageUrl": mainImage.asset->url,
      icon,
      "storyCount": count(*[_type == "story" && references(^._id)])
    }
  `);
}

export async function getCollectionBySlug(slug) {
  return client.fetch(`
    *[_type == "collection" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      "imageUrl": mainImage.asset->url,
      icon,
      "stories": *[_type == "story" && references(^._id)] | order(publishedAt desc) {
        _id,
        title,
        interviewee,
        date,
        excerpt,
        "slug": slug.current,
        "imageUrl": mainImage.asset->url,
        location,
        village,
        "youtubeUrl": youtubeUrl
      }
    }
  `, { slug });
}
