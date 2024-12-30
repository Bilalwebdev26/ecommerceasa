import { Order } from "../models/order.model.js";
import { Product } from "../models/Product.model.js";
import { User } from "../models/User.model.js";

export const analytics = async (req, res) => {
  try {
    const analyticsData = await getAnalyticData();
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dailySalesData = await getDailySalesData(startDate, endDate);
    res.json({
      analyticsData,
      dailySalesData,
    });
  } catch (error) {
    console.log("Error in analytics controller", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getDailySalesData = async (startDate, endDate) => {
 try {
     const dailySalesData = await Order.aggregate([
       {
         $match: {
           createdAt: {
             $gte: startDate,
             $lte: endDate,
           },
         },
       },
       {
         $group: {
           _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
           sales: { $sum: 1 },
           revenue: { $sum: "$totalAmont" },
         },
       },
       {
         $sort: { _id: 1 },
       },
     ]);
     console.log("Daily Sales data : ", dailySalesData);
     const dateArray = getDatesInRange(startDate, endDate);
     console.log("Date Array : ", dateArray); //[2024-12-29,...]
     return dateArray.map((date) => {
       const foundData = dailySalesData.find((item) => item.id === date);
       return{
           date,
           sales:foundData?.sales || 0,
           revenue:foundData?.revenue || 0
       }
     });
 } catch (error) {
    throw error
 }
};
function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

const getAnalyticData = async () => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const salesData = await Order.aggregate([
    {
      $project: {
        _id: null, //it group all documents together
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);
  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };
  return {
    users: totalUsers,
    products: totalProducts,
    totalSales,
    totalRevenue,
  };
};
