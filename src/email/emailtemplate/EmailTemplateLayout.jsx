import React from 'react'
import { Outlet } from "react-router-dom";
import EmailTabs from './components/EmailTabs';

const EmailTemplateLayout = () => {
  return (
    <div className="h-auto w-full flex flex-col rounded-2xl bg-gray-50">
      <EmailTabs />
      <div className=" pt-2">
        <Outlet />
      </div>
    </div>
  )
}

export default EmailTemplateLayout