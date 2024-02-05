import { Request, Response, NextFunction } from "express"
import { RecipeModel } from "../models"

export const allRecipesMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dbQueryResults = await RecipeModel.find({}).select("_id").lean()
    const responseResults = dbQueryResults.map(({ _id }) => _id)

    res.status(200).json(responseResults)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}
