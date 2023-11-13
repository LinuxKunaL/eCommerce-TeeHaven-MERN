import { GetPaymentOrder, PostOrderDetails } from "../../api";
import { ToastGreen, ToastRed } from "../toast";

export const LoadScript = () => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
};

export const CreatePayment = async ({
  UserName,
  UserEmail,
  UserContact,
  Amount,
  OrderData,
  Address,
  Navigate,
  OrderDate,
}) => {
  const result = await GetPaymentOrder(Amount);
  const amount = result.amount / 100;

  const options = {
    amount: result.amount,
    order_id: result.id,
    handler: async (response) => {
      const ResObject = [
        {
          ...response,
          Address,
          amount,
          userId: localStorage.getItem("userId"),
          OrderDate,
          UserName,
          UserEmail,
          UserContact,
        },
        OrderData,
      ];
      const result = await PostOrderDetails(ResObject);
      if (result.result) {
        localStorage.removeItem("cartItems");
        ToastGreen("Order purchase successfully !");
        setTimeout(() => {
          Navigate("/profile/orders");
        }, 2000);
      } else {
        ToastRed("Something went wrong !");
      }
    },
    prefill: {
      name: UserName,
      email: UserEmail,
      contact: UserContact,
    },
    notes: {},
    theme: {
      color: "#61ce70",
    },
  };
  const PaymentWindow = new window.Razorpay(options);
  PaymentWindow.open();
};
