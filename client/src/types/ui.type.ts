import {ReactNode} from "react";

export interface ILink {
  label: string
  icon: ReactNode
  path: string
}

export interface ApiError {
  status: number,
  data: {
    message: string
    status: number
  }
}
