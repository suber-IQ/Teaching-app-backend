import { Stats } from "../../other/models/stats.Schema";
import { User } from "../models/user.schema";

User.watch().on("change",async () => {
    const stats = await Stats.find({}).sort({createdAt: "desc"}).limit(1);
    const subscription = await User.find({"subscription.stats": "active"});

    stats[0].users = await User.countDocuments();
    stats[0].subscriptions = subscription.length;
    stats[0].createdAt = new Date(Date.now());

    await stats[0].save();
})