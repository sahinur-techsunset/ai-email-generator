import "dotenv/config"
import express, {
  type NextFunction,
  type Request,
  type Response
} from "express"
import morgan from "morgan"
import cors from "cors"
import EmailRouter from "./routers/email.router"

const ENV = process.env
const PORT = Number(ENV.PORT || 8080)
const app = express()

app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1", EmailRouter)

app.use("", (req: Request, res: Response) => {
  const url = req.originalUrl

  res.status(404).json({
    success: false,
    message: `The method '${req.method}' with route '${url}' was not found.`,
  })
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: err instanceof Error
      ? err.message
      : "Internal server error."
  })
})

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`)
})

process.emit("SIGINT", () => {
  process.exit(0)
})