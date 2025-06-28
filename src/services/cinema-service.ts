import http from "@/lib/http"
import { Cinema, CreateCinemaPayload } from "@/types/cinema-type"
import { ApiResponse } from "@/types/global"

const CINEMA_BASE_URL = '/cinemas'

const cinemaService = {
  createCinema(payload: CreateCinemaPayload) {
    return http.post<ApiResponse<Cinema>>(CINEMA_BASE_URL, payload)
  }
}

export default cinemaService