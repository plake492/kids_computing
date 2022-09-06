export interface Routes {
  path: string
  title: string
}
export interface ImageDimentions {
  width: string
  height: string
}

export interface ImageWithData {
  src: string
  width: number
  height: number
  isLandscape: boolean
  imgBase64: string
}

export interface APIData {
  api: string
  method?: string
  body?: any
  external?: boolean
}
