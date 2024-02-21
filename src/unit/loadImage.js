const imageCache = {};

export async function loadImage(imageUrl) {
  if (imageCache[imageUrl]) {
    return imageCache[imageUrl];
  }
  let img;
  const imageLoadPromise = new Promise((resolve) => {
    img = new Image();
    img.onload = () => {
      resolve(img);
      imageCache[imageUrl] = img;
    };
    img.src = imageUrl;
  });

  await imageLoadPromise;
  // console.log("image loaded");
  return img;
}

export async function loadImages(imageUrlAry) {
  const promises = imageUrlAry.map((url) => loadImage(url));
  const images = await Promise.all(promises);
  return images;
}

export default loadImage;
