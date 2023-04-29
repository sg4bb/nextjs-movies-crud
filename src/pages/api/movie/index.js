// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "@/lib/dbConnect";
import Movie from "../../../models/Movie";

export default async function handler(req, res) {
  await connectDB();

  /**
   * POST Method
   */
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const movie = new Movie(req.body);
        await movie.save();

        return res.status(200).json({
          success: true,
          message: "movie saved successfully",
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          error,
        });
      }

    default:
      return res.status(500).json({
        success: false,
        error: "server fail",
      });
  }
}
