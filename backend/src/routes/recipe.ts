import { Request, Response, NextFunction } from "express"
import { RecipeModel } from "../models"
import mongoose from "mongoose"

type dbId = mongoose.Types.ObjectId

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id: reqQueryId } = req.params

  if (!mongoose.Types.ObjectId.isValid(reqQueryId)) {
    return res.status(400).json({ message: "Invalid ID format" })
  }

  try {
    const theId: dbId = new mongoose.Types.ObjectId(reqQueryId)
    const dbQueryResult = await RecipeModel.findOne({ _id: theId })
      .select("_id name instructions ingredients")
      .lean()

    if (!dbQueryResult) {
      return res.status(404).json({ message: "Recipe not found" })
    }

    res.status(200).json(dbQueryResult)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
