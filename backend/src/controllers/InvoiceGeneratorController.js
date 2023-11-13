import pdfkit from "pdfkit";
import fs from "fs";
const doc = new pdfkit({
  layout: "portrait",
  size: "A4",
});

export const GenerateInvoicePdf = (Data) => {
  const BillingName = Data.orderData[0].UserName;
  const BillingGmail = Data.orderData[0].UserEmail;
  const razorpay_order_id = Data.orderData[0].razorpay_order_id;
  const OrderDate = Data.orderData[0].OrderDate;
  const subTotal = Data.orderData[0].amount;
  const Shipping = 60;
  const Products = Data.orderData[1];
  const FileName = razorpay_order_id;
  var productTotalPosition = 370;

  const InvoiceInit = () => {
    doc.pipe(fs.createWriteStream(`./uploads/invoices/${FileName}.pdf`));
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f8f8f8");
    doc.registerFont("Poppins_Bold", "./assets/fonts/Poppins-Bold.ttf");
    doc.registerFont("Poppins_Medium", "./assets/fonts/Poppins-Medium.ttf");

    doc.fillAndStroke("#00dd6e").lineWidth(20).rect(90, 0, 120, 110).fill();
    doc.fillAndStroke("#fff").lineWidth(20).rect(-100, 260, 900, 800).fill();
  };

  const InvoiceTopSection = () => {
    doc
      .fillColor("#fff")
      .font("Poppins_Bold")
      .fontSize(16)
      .text("INVOICE", 118.5);

    doc
      .fillColor("#242327")
      .font("Poppins_Medium")
      .fontSize(11)
      .text(
        `Receipt : ${razorpay_order_id} - ${OrderDate}`,
        { align: "right" },
        77
      );

    // PREPARED
    doc
      .fillColor("#00dd6e")
      .font("Poppins_Medium")
      .fontSize(10)
      .text("PREPARED FOR", 90, 172);

    doc
      .fillColor("#242327")
      .font("Poppins_Medium")
      .fontSize(12)
      .text(BillingName, 90, 192);

    doc
      .fillColor("#7a7a7a")
      .font("Poppins_Medium")
      .fontSize(12)
      .text(BillingGmail, 90, 210);
    // PREPARED

    doc.circle(170, 177.8, 3, 3).fill("#00dd6e");
    doc.fillAndStroke("#00dd6e").lineWidth(20).rect(170, 177, 280, 2).fill();
    doc.circle(450, 177.8, 3, 3).fill("#00dd6e");

    // Payment to
    doc.fillColor("#00dd6e").font("Poppins_Medium").fontSize(10).text(
      "PAYMENT TO",
      {
        align: "right",
      },
      172
    );

    doc.fillColor("#242327").font("Poppins_Medium").fontSize(12).text(
      "TeeHaven shop",
      {
        align: "right",
      },
      192
    );

    doc.fillColor("#7a7a7a").font("Poppins_Medium").fontSize(12).text(
      "teehaven@shop.com",
      {
        align: "right",
      },
      210
    );
  };

  const InvoiceTableColumnSection = () => {
    doc
      .fill("#7a7a7a")
      .font("Poppins_Medium")
      .fontSize(10)
      .text("DESCRIPTION", 90, 309, 100, 100);

    doc
      .fill("#7a7a7a")
      .font("Poppins_Medium")
      .fontSize(10)
      .text("QTY", 320, 309, 100, 100);

    doc
      .fill("#7a7a7a")
      .font("Poppins_Medium")
      .fontSize(10)
      .text("PRICE", 400, 309, 100, 100);

    doc.fill("#7a7a7a").font("Poppins_Medium").fontSize(10).text(
      "SUBTOTAL",
      {
        align: "right",
      },
      309
    );
  };

  const InvoiceTableRowSection = () => {
    doc.fillAndStroke("#d2d2d2").lineWidth(20).rect(90, 350, 432, 0.4).fill();

    Products.map((item, index) => {
      doc
        .fill("#7a7a7a")
        .font("Poppins_Medium")
        .fontSize(10)
        .text(item.title.slice(0, 40) + " ...", 90, 370 + index * 30, 100, 100);

      doc
        .fill("#7a7a7a")
        .font("Poppins_Medium")
        .fontSize(10)
        .text(item.total, 320, 370 + index * 30, 100, 100);

      doc
        .fill("#7a7a7a")
        .font("Poppins_Medium")
        .fontSize(10)
        .text(`₹ ${item.price}`, 400, 370 + index * 30, 100, 100);

      doc
        .fill("#7a7a7a")
        .font("Poppins_Medium")
        .fontSize(10)
        .text(
          `₹ ${item.price * item.total}`,
          {
            align: "right",
          },
          370 + index * 30
        );

      productTotalPosition += 30;
    });
  };

  const InvoiceTotalPaymentSection = () => {
    doc
      .fill("#7a7a7a")
      .font("Poppins_Medium")
      .fontSize(10)
      .text("SUBTOTAL :", 400, productTotalPosition, 100, 100);

    doc.fill("#7a7a7a").font("Poppins_Medium").fontSize(10).text(
      `₹ ${subTotal}`,
      {
        align: "right",
      },
      productTotalPosition
    );

    // subTotal

    // GST

    // doc
    //   .fill("#7a7a7a")
    //   .font("Poppins_Medium")
    //   .fontSize(10)
    //   .text("GST (10%) :", 400, 500, 100, 100);

    // doc.fill("#7a7a7a").font("Poppins_Medium").fontSize(10).text(
    //   "₹ 54.3",
    //   {
    //     align: "right",
    //   },
    //   500
    // );

    // GST

    // Shipping

    doc
      .fill("#7a7a7a")
      .font("Poppins_Medium")
      .fontSize(10)
      .text("SHIPPING :", 400, (productTotalPosition += 30), 100, 100);

    doc.fill("#7a7a7a").font("Poppins_Medium").fontSize(10).text(
      `₹ ${Shipping}`,
      {
        align: "right",
      },
      productTotalPosition
    );

    // Shipping

    // Total

    doc
      .fill("#7a7a7a")
      .font("Poppins_Medium")
      .fontSize(10)
      .text("TOTAL :", 400, (productTotalPosition += 30), 100, 100);

    doc
      .fill("#00dd6e")
      .font("Poppins_Medium")
      .fontSize(15)
      .text(
        `₹ ${subTotal + Shipping}`,
        {
          align: "right",
        },
        productTotalPosition
      );
  };

  const InvoiceFooterSection = () => {
    doc
      .fillColor("#242327")
      .font("Poppins_Medium")
      .fontSize(13)
      .text("Thanks you for your purchase !", 90, 670);

    doc.fillAndStroke("#d2d2d2").lineWidth(20).rect(90, 700, 432, 0.4).fill();

    doc
      .fillColor("#00dd6e")
      .font("Poppins_Medium")
      .fontSize(10)
      .text("@ teeHaven Shop inc 2023", 90, 720);

    doc
      .fillColor("#00dd6e")
      .font("Poppins_Medium")
      .fontSize(10)
      .text("www.TeeHaven.com", 330, 720);

    doc
      .fillColor("#00dd6e")
      .font("Poppins_Medium")
      .fontSize(10)
      .text("9022126326", 457, 720);
  };

  InvoiceInit();
  InvoiceTopSection();
  InvoiceTableColumnSection();
  InvoiceTableRowSection();
  InvoiceTotalPaymentSection();
  InvoiceFooterSection();

  doc.end();
  return FileName;
};
