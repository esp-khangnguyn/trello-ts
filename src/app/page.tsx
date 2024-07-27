'use client'

import Board from '@/components/Boards/_id'
import { CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import theme from './theme'
export default function Home() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Board />
      <ToastContainer position="bottom-left" theme="colored" />
    </CssVarsProvider>
  )
}
