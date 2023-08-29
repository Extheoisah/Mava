import express, { Express } from "express"
import request from "supertest"

import config from "@config"

import expressApp from "@server/loaders/express"

describe("Health Check", () => {
  let app: Express

  beforeAll(() => {
    app = express()
    expressApp({ app })
  })

  it("should return status ok", async () => {
    const response = await request(app).get("/api/health")
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      status: "ok",
      message: `server running at port ${config.port}!`,
    })
  })
})
