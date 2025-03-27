import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocsMainLayout from '../../ApiDocs/mainlayout/DocsMainLayout';
import DocsDashboard from '../../ApiDocs/dashboard/DocsDashboard';
import WhatsappDocs from '../../ApiDocs/whatsapp/WhatsappDocs';
import RcsDocs from '@/ApiDocs/rcs/RcsDocs';

const Apiroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DocsMainLayout />}>
                <Route index element={<DocsDashboard />} />
                <Route path='whatsappDocs' element={<WhatsappDocs />} />
                <Route path='rcsdocs' element={<RcsDocs />} />
            </Route>

            <Route path="*" element={
                <div className='flex items-center justify-center min-h-[100vh]'>
                    <span className="text-3xl text-gray-700 font-semibold">
                        404 Not Found
                    </span>
                </div>
            }
            />
        </Routes>
    )
}

export default Apiroutes