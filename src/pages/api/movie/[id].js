// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "@/lib/dbConnect";
import Movie from "../../../models/Movie";

export default async function handler(req, res) {
  await connectDB();

  const {
    method,
    query: { id },
  } = req;

  /**
   * GET Method api/movie/:id(obtener un id y listarlo)
   */
  switch (method) {
    case "GET":
      try {
        const movie = await Movie.findById(id).lean();

        if (!movie) {
          return res.status(404).json({ success: false });
        }

        return res.status(200).json({ success: true, data: movie });
      } catch (error) {
        return res.status(404).json({ success: false });
      }

    /**
     * DELETE Method api/movie/:id(elimina un doc con id)
     */
    case "DELETE":
      try {
        const movie = await Movie.findByIdAndDelete(id).lean();

        if (!movie) {
          return res.status(404).json({ success: false });
        }

        return res.status(200).json({ success: true, data: movie });
      } catch (error) {
        return res.status(404).json({ success: false, error });
      }

    /**
     * PUT Method api/movie/:id(modifica un doc con id)
     */
    case "PUT":
      try {
        let movie = await Movie.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!movie) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true });
      } catch (error) {
        return res.status(404).json({ success: false, error });
      }

    default:
      return res.status(500).json({
        success: false,
        error: "server fail",
      });
  }
}
