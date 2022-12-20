import catchAsyncError from "../../../shared/middlewares/catchAsyncErrorMiddleware.js";
import HTTP_STATUS from "http-status-codes";
import { Stats } from "../models/stats.Schema.js";

export class GetDashboardStats {
  static read = catchAsyncError(async (req, res, next) => {
    const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

    const statsData = [];

    for (let i = 0; i < stats.length; i++) {
      statsData.unshift(stats[i]);
    }

    const requiredSize = 12 - stats.length;

    for (let i = 0; i < requiredSize; i++) {
      statsData.unshift({
        users: 0,
        subscriptions: 0,
        views: 0,
      });
    }

    const usersCount = statsData[11].users;
    const subscriptionsCount = statsData[11].subscriptions;
    const viewsCount = statsData[11].views;

    let usersPercentage = 0,
      viewsPercentage = 0,
      subscriptionsPercentage = 0;
    let usersProfit = true,
      viewsProfit = true,
      subscriptionsProfit = true;

    if (statsData[10].users === 0) usersPercentage = usersCount * 100;
    if (statsData[10].views === 0) viewsPercentage = viewsCount * 100;
    if (statsData[10].subscriptions === 0)
      subscriptionsPercentage = subscriptionsCount * 100;
    else {
      const difference = {
        users: statsData[11].users - statsData[10].users,
        views: statsData[11].views - statsData[10].views,
        subscriptions:
          statsData[11].subscriptions - statsData[10].subscriptions,
      };

      usersPercentage = (difference.users / statsData[10].users) * 100;
      viewsPercentage = (difference.views / statsData[10].views) * 100;
      subscriptionsPercentage =
        (difference.subscriptions / statsData[10].subscriptions) * 100;
      if (usersPercentage < 0) usersProfit = false;
      if (viewsPercentage < 0) viewsProfit = false;
      if (subscriptionsPercentage < 0) subscriptionsProfit = false;
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      stats: statsData,
      usersCount,
      subscriptionsCount,
      viewsCount,
      usersPercentage,
      viewsPercentage,
      subscriptionsPercentage,
      subscriptionsProfit,
      viewsProfit,
      usersProfit,
    });
  });
}
