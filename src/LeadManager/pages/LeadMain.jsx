import React from 'react'
import Analytics from './Analytics'
import LeadDash from './leaddash/LeadDash'
import LeadManager from '../LeadManager'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const LeadMain = () => {
  return (
    <div>

      <LeadDash />
      <Analytics />
    </div>
  )
}

export default LeadMain
