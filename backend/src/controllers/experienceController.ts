import { Request, Response } from "express";
import { Experience } from "../models/Experience";

export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;

    let query = {};
    if (search) {
      // case-insensitive search for title or location
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      };
    }

    const experiences = await Experience.find(query);
    res.json(experiences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: "Not found" });
    res.json(exp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
