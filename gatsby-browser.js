import React from "react"

import { AppContextProvider } from "./src/contexts"

export const wrapRootElement = ({ element }) => (
  <AppContextProvider>{element}</AppContextProvider>
)