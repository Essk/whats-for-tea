const fetch = require("node-fetch");

const stringHasLength = (str) => typeof str === "string" && str?.length;

module.exports = (apiUrl) => {
  return {
    async getDocuments(collectionSlug) {
      if (!stringHasLength(collectionSlug)) {
        console.warn(`getDocuments cannot get collection ${collectionSlug}`);
        return [];
      }
      const url = `${apiUrl}${collectionSlug}`;
      console.log(url)
      const response = await fetch(url);
      return response.json();
    },

    async getDocument(collection, slug) {
      if (!stringHasLength(collection) || !stringHasLength(slug)) {
        console.warn(
          `getDocument cannot get slug ${slug} from collection ${collection}`
        );
        return [];
      }
      const url = `${apiUrl}/${collection}/${slug}`;
      const response = await fetch(url);
      return response.json();
    },
  };
};
