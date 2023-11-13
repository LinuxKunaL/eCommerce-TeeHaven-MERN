import { toast } from "react-hot-toast";

export const ToastRed = (massage) => {
  return toast.error(massage, {
    className: "toastRed",
    style: {
      border: "1px solid #ff3535",
      padding: "16px",
      color: "#242327",
    },
    iconTheme: {
      primary: "#ff3535",
      secondary: "#FFFAEE",
    },
  });
};

export const ToastGreen = (massage) => {
  return toast.success(massage, {
    className: "toastGreen",
    style: {
      border: "1px solid #61ce70",
      padding: "16px",
      color: "#242327",
    },
    iconTheme: {
      primary: "#61ce70",
      secondary: "#FFFAEE",
    },
    loading: "Loading",
  });
};

export const ProductDeleteDialogToast = (deleteYes) => {
  return toast(
    (t) => (
      <div className="DialogBoxForDeleteProduct">
        <span>You want to delete this product ?</span>
        <div className="buttons">
          <button
            className="FillBtn"
            onClick={() => {
              deleteYes();
              toast.dismiss(t.id);
            }}
          >
            yes
          </button>
          <button className="OutlineBtn" onClick={() => toast.dismiss(t.id)}>
            no
          </button>
        </div>
      </div>
    ),
    {
      duration: 5000,
      className: "toastGreen",
      style: {
        border: "1px solid #61ce70",
      },
    }
  );
};
