import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { token } = useOutletContext();
  return token;
};

export default Home;
