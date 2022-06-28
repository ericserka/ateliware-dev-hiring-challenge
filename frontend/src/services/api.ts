import axios from "axios"
import { Repository } from "../components/repository/Repository"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
})

type FetchReposParams = {
  language: string
  page: number
}

export type ApiResponse = {
  total_count: number
  items: Repository[]
}

export const fetchRepositories = async ({
  language,
  page,
}: FetchReposParams): Promise<ApiResponse> => {
  try {
    const { data } = await api.get<ApiResponse>(
      `/repositories/${language}/${page}`,
    )
    return data
  } catch (err) {
    console.error("[ERROR] fetching repositories", { err })
  }
  return { total_count: 0, items: [] }
}
