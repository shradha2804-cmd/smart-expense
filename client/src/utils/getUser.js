const getUser = () => {

  const userInfo =
    localStorage.getItem("userInfo");

  return userInfo
    ? JSON.parse(userInfo)
    : null;

};

export default getUser;