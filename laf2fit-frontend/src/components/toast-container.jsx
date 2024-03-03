import { ToastContainer as SnackbarConatiner } from "react-toastify";

export default function ToastContainer() {
  return (
    <SnackbarConatiner
      position="bottom-center"
      hideProgressBar
      limit={5}
      theme="dark"
      autoClose={3000}
      style={{ width: "500px" }}
    />
  );
}
