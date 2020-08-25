export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    resolve({
      userId: "william@stimshop.com",
      username: "william",
    });
  });
};
