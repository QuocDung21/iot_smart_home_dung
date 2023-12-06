const cron = require("node-cron");
const Esp = require("../Models/Esp.model");
const sendEmail = require("../Mail/mail"); // Thay thế đường dẫn với đường dẫn thực tế đến mô hình của bạn

async function sendMail() {
    try {
        const getEsp = await Esp.findOne({}).sort({createdAt: -1});
        if (getEsp.temp > 60) {
            await sendEmail(
                "quocdung112001@gmail.com",
                "Cảnh báo! Nhiệt độ cao",
                "Cảnh báo! Nhiệt độ cao",
                `Nhiệt độ hiện tại là: ${getEsp.temp} độ C. Vui lòng kiểm tra hệ thống.</p>`
            ).then(async (result) => {
                if (result) {
                    console.log("Email đã được gửi thành công");
                    cron.start();
                } else {
                    console.log("Gửi email thất bại");
                }
            });
        }
    } catch (error) {
        console.error("Lỗi gửi mail:", error.message);
    }
}

module.exports = cron.schedule("*/5 * * * *", sendMail); // Run every 5 minutes

