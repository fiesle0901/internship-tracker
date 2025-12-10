import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/entries
router.get("/", async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const entries = await prisma.reportEntry.findMany({
      where: { userId: user.id },
      orderBy: { date: "asc" },
    });
    return res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
});

// POST /api/entries
router.post("/", async (req: Request, res: Response) => {
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

    const user = (req as any).user;
    const userId = user.id;

    const newEntry = await prisma.reportEntry.create({
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
  } catch (err) {
    res.status(500).json({ message: "Internal Error" });
  }
});

// DEMO ACCOUNT
router.get("/demo", async (req: Request, res: Response) => {
  const demoUserId = 1;

  const entries = await prisma.reportEntry.findMany({
    where: { userId: demoUserId },
    orderBy: { date: "desc" },
  });

  res.json(entries);
});

export default router;
