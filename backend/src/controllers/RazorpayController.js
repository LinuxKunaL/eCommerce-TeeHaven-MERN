import Razorpay from "razorpay";
import axios from "axios";

import PublicMongoQuery from "../../database/MongoPublic.js";
import config from "../../config/index.js";
import { GenerateInvoicePdf } from "./InvoiceGeneratorController.js";

const publicMongoDB = new PublicMongoQuery();
publicMongoDB.connect();

const InstanceOfRazorpay = new Razorpay({
  key_id: config.Razorpay.key_id,
  key_secret: config.Razorpay.key_secret,
});

/**
 *  for send Revenue to dashboard
 **/
export const GetRevenue = async () => {
  try {
    const paymentsData = await InstanceOfRazorpay.payments.all({
      count: 100,
    });
    const totalIncome = paymentsData.items.reduce((total, payment) => {
      if (payment.status === "captured") {
        return total + payment.amount;
      }
      return total;
    }, 0);
    return totalIncome / 100;
  } catch (error) {
    console.error("Error fetching total income:", error);
  }
};

export const CreateOrder = (req, res) => {
  const Options = {
    amount: req.body.amount,
    currency: "INR",
    payment_capture: 1,
  };

  InstanceOfRazorpay.orders.create(Options, (Error, Order) => {
    if (Error) {
      res.status(200).json({
        Error: Error,
      });
    } else {
      res.status(200).send(Order);
    }
  });
};

export const GetOrderDetails = async (req, res) => {
  const RequestBody = req.body;
  GenerateInvoicePdf(RequestBody);
  const result = await publicMongoDB
    .insertOrderedDetails("productsOrders", {
      RequestBody,
    })
    .catch((Error) => {
      console.log(Error + " GetOrderDetails in RazorpayController");
    });

  if (result != null) {
    res.status(200).send({ result: true });
  } else {
    res.status(200).send({ result: false });
  }
};
