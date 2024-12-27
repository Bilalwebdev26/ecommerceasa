import { Coupon } from "../models/coupons.model.js";
import { Order } from "../models/order.model.js";
import { apiError } from "../utils/apiError.class.js";
import { stripe } from "../utils/stripe.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      throw new apiError(404, "Product Not found");
    }
    //calculate total amaount
    let calculateTotalAmount = 0;
    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 1000); //stripe make credit in cents =>$10 = 1000cents
      calculateTotalAmount += amount * product.quantity;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
      };
    });
    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req?.user?._id,
        isActive: true,
      });
      if (coupon) {
        calculateTotalAmount -= Math.round(
          (calculateTotalAmount * coupon.discountPercent) / 100
        );
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/purchase-success?session_id=${CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
        discounts: coupon
          ? [
              {
                coupon: await createStripeCoupon(coupon.discountPercent),
              },
            ]
          : [],
        metadata: {
          userId: req.user._id.toString(),
          couponCode: couponCode || "",
          products: JSON.stringify(
            products.map((p) => ({
              id: p._id,
              quantity: p.quantity,
              price: p.price,
            }))
          ),
        },
      });
      //20000cents = 200$
      if (calculateTotalAmount >= 20000) {
        await createNewCoupon(req.user._id);
      }
      res.status(200).json({
        id: session.id,
        calculateTotalAmount: calculateTotalAmount / 100,
      });
    }
  } catch (error) {
    console.log("Error while checkout",error);
    res.status(500).json({message:"Error processing while checkout",error:error.message})
  }
};

async function createStripeCoupon(discountPercent) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercent,
    duration: "once",
  });
  return coupon.id;
}

async function createNewCoupon(userId) {
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercent: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30 days from now
    userId: userId,
  });
  await newCoupon.save();
  return newCoupon;
}

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponCode,
            userId: session.metadata.userId,
          },
          { isActive: false }
        );
      }
      //create new order
      const products = JSON.parse(session.metadata.products);
      const newOrder = await Order({
        user: session.metadata.userId,
        products: products.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
      });
      await newOrder.save();
      res
        .status(200)
        .json({
          success: true,
          message:
            "Payment successfull , order created and coupon deactivaed if used",
          orderId: newOrder._id,
        });
    }
  } catch (error) {
    console.log("Error while checkout success",error);
    res.status(500).json({message:"Error processing while checkout",error:error.message})
  }
};