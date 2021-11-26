import Spinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Loader({ type, color, height, width }) {
  return <Spinner type={type} color={color} height={height} width={width} />;
}

export default Loader;
