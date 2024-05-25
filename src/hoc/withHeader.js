import { Header } from "../components/Navbar";

const withHeader = (WrappedComponent) => {
  const WithHeader = () => {
    return (
      <>
        <Header></Header>
        <WrappedComponent />
      </>
    );
  };
  return WithHeader;
};

export default withHeader;
