"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const router = (0, express_1.Router)();
// GET /api/entries
router.get("/", async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const entries = await prisma_1.prisma.reportEntry.findMany({
            where: { userId: user.id },
            orderBy: { date: "asc" },
        });
        return res.json(entries);
    }
    catch (err) {
        res.status(500).json({ message: "Internal error" });
    }
});
// POST /api/entries
router.post("/", async (req, res) => {
    try {
        const { date, task, givenBy, hours, remarks } = req.body;
        if (!date || !task || !givenBy || !hours) {
            return res.status(400).json("Missing required fileds");
        }
        const parsedHours = Number(hours);
        if (isNaN(parsedHours) || parsedHours < 0) {
            return res.status(400).json({ message: "Hours must be a valid number" });
        }
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format." });
        }
        const user = req.user;
        const userId = user.id;
        const newEntry = await prisma_1.prisma.reportEntry.create({
            data: {
                date: parsedDate,
                task,
                givenBy,
                hours: parsedHours,
                remarks: remarks || null,
                userId,
            },
        });
        return res.status(201).json(newEntry);
    }
    catch (err) {
        res.status(500).json({ message: "Internal Error" });
    }
});
// DEMO ACCOUNT
router.get("/demo", async (req, res) => {
    const demoUserId = 14;
    const entries = await prisma_1.prisma.reportEntry.findMany({
        where: { userId: demoUserId },
        orderBy: { date: "asc" },
    });
    res.json(entries);
});
exports.default = router;
