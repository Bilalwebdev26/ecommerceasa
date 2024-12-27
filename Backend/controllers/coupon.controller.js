import { Coupon } from "../models/coupons.model.js";

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ user: req.user._id, isActive: true });
    res.json(coupon || null);
  } catch (error) {
    console.log("Error in get coupons controller", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });
    if (!coupon) {
      return res.status(404).json({ messge: "Coupon Not Found" });
    }
    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(404).json({ messge: "Coupon expired" });
    }
    res.json({
      message: "Coupon is valid",
      code: coupon.code,
      discountPercent: coupon.discountPercent,
    });
  } catch (error) {
    console.log("Error in get coupons controller", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
