import { AfterSaveBotApi, WireRecord } from "@uesio/bots"
export default function add_hours(bot: AfterSaveBotApi) {
    const durations = []
    bot.inserts.get().forEach(function (change) {
        const start = change.get("baxter/fuel_watcher.travel_start_date") as number;
        const end = change.get("baxter/fuel_watcher.travel_end_date") as number;
        const durationInMilliseconds = end - start
        const durationInHours = durationInMilliseconds / (1 * 60 * 60); // Convert milliseconds to hours
        durations.push(durationInHours)
    });
    bot.save("baxter/fuel_watcher.fuel_usage", durations.map((duration) => ({
        "baxter/fuel_watcher.total_time": duration.toFixed(2), // Round to 2 decimal places
    })) as unknown as WireRecord[])
}
