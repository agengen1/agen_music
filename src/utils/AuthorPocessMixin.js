//作者名称处理混入
export default {
  filters: {
    joinName(arr) {
      let str = "";
      arr.forEach((e, i) => {
        if (i >= arr.length - 1) {
          str += e.name;
        } else {
          str += e.name + "/";
        }
      });
      return str;
    },
  },
};
