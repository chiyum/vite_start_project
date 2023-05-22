import image1 from "@/assets/images/home/banner_bg_bird.png";
import image2 from "@/assets/images/home/banner_bg_snake.png";

/* banner預設圖 */
export const bannerImage = (plan) => {
  return {
    aPlan: [image1, image2],
    bPlan: [image2, image1],
  }[plan];
};
