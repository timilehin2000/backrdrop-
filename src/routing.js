const handleRouting = (app) => {
    // app.use("/api/v1", authRouter);

    // 404 Error Handler
    app.all("*", (req, res) => {
        res.status(404).json({
            status: false,
            error: "lol, and Just Like That, You Completely Lost Your Way",
            reqUrl: req.originalUrl,
        });
    });
};

module.exports = { handleRouting };
