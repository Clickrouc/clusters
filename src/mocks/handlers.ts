import { rest } from 'msw'
import data from './exampleData.json'

const API_URL = import.meta.env.VITE_API_URI

export const handlers = [
  rest.post(`${API_URL}/assess_cluster`, (req, res, ctx) => {
    setTimeout(() => {
      return res(ctx.status(200), ctx.json(data))
    }, 37000)
  }),
  rest.get(`${API_URL}/get_time`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        time_in_seconds: 37
      })
    )
  })
]
