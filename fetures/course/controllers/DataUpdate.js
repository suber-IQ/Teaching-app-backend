import { Course } from "../models/course.schema";

Course.watch().on("change", async () => {
    const stats = await Stats.find({}).sort({createdAt: "desc"}).limit(1);

    const courses = await Course.find({});

    totalViews = 0

    for(let i = 0; i < courses.length; i++){
        
        totalViews += courses[i].views
    }

    stats[0].views = totalViews;
    stats[0].createdAt = new Date(Date.now());

    await stats[0].save();

})