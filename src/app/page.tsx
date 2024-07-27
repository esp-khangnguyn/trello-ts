'use client'

import Board from '@/components/Boards/_id'
import { CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import theme from '@/app/theme'
import { ConfirmProvider } from 'material-ui-confirm'
export default function Home() {
  return (
    <CssVarsProvider theme={theme}>
      <ConfirmProvider
        defaultOptions={{
          dialogProps: {
            maxWidth: 'xs'
          },
          allowClose: false,
          confirmationButtonProps: {
            color: 'secondary',
            variant: 'outlined'
          },
          cancellationButtonProps: {
            color: 'inherit'
          }
        }}
      >
        <CssBaseline />
        <Board />
        <ToastContainer position="bottom-left" theme="colored" />
      </ConfirmProvider>
    </CssVarsProvider>
  )
}
