export const getImageUrl = (router) => {
  return new URL(`../assets/images/${router}`, import.meta.url).href;
};

export default getImageUrl;
