import React from 'react'
import Approutes from './routes/Approutes/Approutes'
import GlobalToaster from './components/GlobalToaster'

const App = () => {
  return (
    <>
      <GlobalToaster />
      <Approutes />
    </>
  )
}

export default App