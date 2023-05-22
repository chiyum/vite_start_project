const state = () => {
  return {
    marquee: [], //跑馬燈
    /** popup */
    popupState: {
      $display: false,
      $timestamp: -1,
    },
    tips: [],
  };
};
//主要state
export default state;
