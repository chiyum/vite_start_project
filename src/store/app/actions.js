import axios from "@/axios";

const actions = {
  // 跑馬燈
  async "read/marquee"() {
    const res = await axios.get("/app/user/news", {
      params: { type: 1 },
      novalidate: true,
      noredirect: true,
    });
    const withdrawRes = await axios.get("/app/withdraw", {
      novalidate: true,
      noredirect: true,
    });
    return {
      marquee: res.data,
      withdraw: withdrawRes.data,
    };
  },
};

export default actions;
