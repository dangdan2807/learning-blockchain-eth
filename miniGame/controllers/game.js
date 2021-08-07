var HocVien = require("../models/HocVien");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("layout");
    });

    app.post("/dangky", function (req, res) {
        if (!req.body.Email || !req.body.HoTen || !req.body.SoDT) {
            res.json({ ketQua: 0, maLoi: "!Thieu tham so kia ban oi" });
        } else {
            var hocVienMoi = new HocVien({
                Email: req.body.Email,
                HoTen: req.body.HoTen,
                SoDT: req.body.SoDT,
                ThanhToan: false,
                Vi: "",
                Ngay: Date.now(),
            });

            hocVienMoi.save(function (err) {
                if (err) {
                    res.json({ ketQua: 0, maLoi: "Mongodb save error!" });
                } else {
                    // res.json(hocVienMoi);
                    res.json({ ketQua: 1, maLoi: hocVienMoi });
                }
            });
        }
    });
};
