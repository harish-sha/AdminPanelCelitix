// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DocsMainLayout from "../../ApiDocsOld/mainlayout/DocsMainLayout";
// import DocsDashboard from "../../ApiDocsOld/dashboard/DocsDashboard";
// import WhatsappDocs from "../../ApiDocsOld/whatsapp/WhatsappDocs";
// import RcsDocs from "@/ApiDocsOld/rcs/RcsDocs";
// import DummyApi from "@/ApiDocsOld/DummyApi";

// const Apiroutes = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<DocsMainLayout />}>
//           <Route index element={<DocsDashboard />} />
//           <Route path="whatsappDocs" element={<WhatsappDocs />} />
//           <Route path="rcsdocs" element={<RcsDocs />} />
//         </Route>

//         <Route
//           path="*"
//           element={
//             <div className="flex items-center justify-center min-h-[100vh]">
//               <span className="text-3xl text-gray-700 font-semibold">
//                 404 Not Found
//               </span>
//             </div>
//           }
//         />
//         <Route path="dummyapi" element={<DummyApi />} />
//       </Routes>
//     </>
//   );
// };

// export default Apiroutes;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DocsMainLayout from "../../ApiDocs/mainlayout/DocsMainLayout";
import DocsDashboard from "../../ApiDocs/dashboard/DocsDashboard";
// import WhatsappDocs from "../../ApiDocs/whatsapp/WhatsappDocs";
import Quickstart from "../../ApiDocs/QuickStart"

// RCS
import IntroductionDocsRcs from "../../ApiDocs/rcs/IntroductionDocsRcs";
import SubmitTemplateRCS from "../../ApiDocs/rcs/submitTemplate/SubmitTemplateRCS";
import UpdateTemplateRCS from "../../ApiDocs/rcs/updateTemplate/UpdateTemplateRCS";
import ManageTemplateRCS from "../../ApiDocs/rcs/manageTemplate/ManageTemplateRCS";
import DeleteTemplateRCS from "../../ApiDocs/rcs/deleteTemplate/DeleteTemplateRCS";


//Whatsapp
import IntroductionDocsWhatsappp from "../../ApiDocs/whatsapp/IntroductionDocsWhatsapp";
import SubmitTemplateWhatsapp from "../../ApiDocs/whatsapp/SubmitTemplate/SubmitTemplateWhatsapp";
// import UpdateTemplateWhatsapp from "../../ApiDocs/whatsapp/SendTemplate/SendTemplateWhatsapp";
// import DeleteTemplateWhatsapp from "../../ApiDocs/whatsapp/DeleteTemplate/DeleteTemplateWhatsapp";
import SendTemplateWhatsapp from "../../ApiDocs/whatsapp/SendTemplate/SendTemplateWhatsapp";
import SendMessage from "../../ApiDocs/whatsapp/SendMessage/SendMessage";


//Sms
import IntroductionDocsSms from "../../ApiDocs/sms/IntroductionDocsSms";
import SubmitTemplateSms from "../../ApiDocs/sms/SubmitTemplate/SubmitTemplateSms"
import UpdateTemplateSms from "../../ApiDocs/sms/UpdateTemplate/UpdateTemplateSms"
import DeleteTemplateSms from "../../ApiDocs/sms/DeleteTemplate/DeleteTemplateSms"


//TwoWaySms
import IntroductionDocsTwoWaySms from "../../ApiDocs/twowaysms/IntroductionDocsTwoWaySms";
import SubmitTemplateTwoWaySms from "../../ApiDocs/twowaysms/SubmitTemplate/SubmitTemplateTwoWaySms"
import UpdateTemplateTwoWaySms from "../../ApiDocs/twowaysms/UpdateTemplate/UpdateTemplateTwoWaySms"
import DeleteTemplateTwoWaySms from "../../ApiDocs/twowaysms/DeleteTemplate/DeleteTemplateTwoWaySms"


//Authentication
import IntroductionDocsAuthentication from "../../ApiDocs/authentication/IntroductionDocsAuthentication";
import SubmitTemplateAuthentication from "../../ApiDocs/authentication/SubmitTemplate/SubmitTemplateAuthentication"
import UpdateTemplateAuthentication from "../../ApiDocs/authentication/UpdateTemplate/UpdateTemplateAuthentication"
import DeleteTemplateAuthentication from "../../ApiDocs/authentication/DeleteTemplate/DeleteTemplateAuthentication"


//Outbound
import IntroductionDocsOutbound from "../../ApiDocs/outbound/IntroductionDocsOutbound";
import SubmitTemplateOutbound from "../../ApiDocs/outbound/SubmitTemplate/SubmitTemplateOutbound"
import UpdateTemplateOutbound from "../../ApiDocs/outbound/UpdateTemplate/UpdateTemplateOutbound"
import DeleteTemplateOutbound from "../../ApiDocs/outbound/DeleteTemplate/DeleteTemplateOutbound"


//Inbound
import IntroductionDocsInbound from "../../ApiDocs/inbound/IntroductionDocsInbound";
import SubmitTemplateInbound from "../../ApiDocs/inbound/SubmitTemplate/SubmitTemplateInbound"
import UpdateTemplateInbound from "../../ApiDocs/inbound/UpdateTemplate/UpdateTemplateInbound"
import DeleteTemplateInbound from "../../ApiDocs/inbound/DeleteTemplate/DeleteTemplateInbound"


//Missed call
import IntroductionDocsMissedCall from "../../ApiDocs/missedcall/IntroductionDocsMissedCall";
import SubmitTemplateMissedCall from "../../ApiDocs/missedcall/SubmitTemplate/SubmitTemplateMissedCall"
import UpdateTemplateMissedCall from "../../ApiDocs/missedcall/UpdateTemplate/UpdateTemplateMissedCall"
import DeleteTemplateMissedCall from "../../ApiDocs/missedcall/DeleteTemplate/DeleteTemplateMissedCall"


// Click two call
import IntroductionDocsClickTwoCall from "../../ApiDocs/clicktwocall/IntroductionDocsClickTwoCall";
import SubmitTemplateClickTwoCall from "../../ApiDocs/clicktwocall/SubmitTemplate/SubmitTemplateClickTwoCall"
import UpdateTemplateClickTwoCall from "../../ApiDocs/clicktwocall/UpdateTemplate/UpdateTemplateClickTwoCall"
import DeleteTemplateClickTwoCall from "../../ApiDocs/clicktwocall/DeleteTemplate/DeleteTemplateClickTwoCall"
import SendMessageNew from "@/ApiDocs/whatsapp/SendMessage/SendMessageNew";

const Apiroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DocsMainLayout />}>
        <Route index element={<DocsDashboard />} />
        <Route path="quickstart" element={<Quickstart />} />

        {/* RCS */}
        <Route path="/rcs" element={<IntroductionDocsRcs />} />
        <Route path="/submit-template-rcs" element={<SubmitTemplateRCS />} />
        <Route path="/update-template-rcs" element={<UpdateTemplateRCS />} />
        <Route path="/manage-template-rcs" element={<ManageTemplateRCS />} />
        <Route path="/delete-template-rcs" element={<DeleteTemplateRCS />} />


        {/* Whatsapp */}
        <Route path="/whatsapp" element={<IntroductionDocsWhatsappp />} />
        <Route path="/submit-template-whatsapp" element={<SubmitTemplateWhatsapp />} />
        <Route path="/send-template-whatsapp" element={<SendTemplateWhatsapp />} />
        <Route path="/send-message-whatsapp" element={<SendMessage />} />
        <Route path="/send-messages-whatsapp" element={<SendMessageNew />} />

        {/* Sms */}
        <Route path="sms" element={<IntroductionDocsSms />} />
        <Route path="/submit-template-sms" element={<SubmitTemplateSms />} />
        <Route path="/update-template-sms" element={<UpdateTemplateSms />} />
        <Route path="/delete-template-sms" element={<DeleteTemplateSms />} />

        {/* 2 way sms */}
        <Route path="twowaysms" element={<IntroductionDocsTwoWaySms />} />
        <Route path="/submit-template-twowaysms" element={<SubmitTemplateTwoWaySms />} />
        <Route path="/update-template-twowaysms" element={<UpdateTemplateTwoWaySms />} />
        <Route path="/delete-template-twowaysms" element={<DeleteTemplateTwoWaySms />} />

        {/* Authentication */}
        <Route path="authentication" element={<IntroductionDocsAuthentication />} />
        <Route path="/submit-template-authentication" element={<SubmitTemplateAuthentication />} />
        <Route path="/update-template-authentication" element={<UpdateTemplateAuthentication />} />
        <Route path="/delete-template-authentication" element={<DeleteTemplateAuthentication />} />

        {/* Outbound */}
        <Route path="outbound" element={<IntroductionDocsOutbound />} />
        <Route path="/submit-template-outbound" element={<SubmitTemplateOutbound />} />
        <Route path="/update-template-outbound" element={<UpdateTemplateOutbound />} />
        <Route path="/delete-template-outbound" element={<DeleteTemplateOutbound />} />

        {/* inbound */}
        <Route path="inbound" element={<IntroductionDocsInbound />} />
        <Route path="/submit-template-inbound" element={<SubmitTemplateInbound />} />
        <Route path="/update-template-inbound" element={<UpdateTemplateInbound />} />
        <Route path="/delete-template-inbound" element={<DeleteTemplateInbound />} />

        {/* missedcall */}
        <Route path="missedcall" element={<IntroductionDocsMissedCall />} />
        <Route path="/submit-template-missedcall" element={<SubmitTemplateMissedCall />} />
        <Route path="/update-template-missedcall" element={<UpdateTemplateMissedCall />} />
        <Route path="/delete-template-missedcall" element={<DeleteTemplateMissedCall />} />

        {/* click two call */}
        <Route path="clicktwocall" element={<IntroductionDocsClickTwoCall />} />
        <Route path="/submit-template-clicktwocall" element={<SubmitTemplateClickTwoCall />} />
        <Route path="/update-template-clicktwocall" element={<UpdateTemplateClickTwoCall />} />
        <Route path="/delete-template-clicktwocall" element={<DeleteTemplateClickTwoCall />} />
      </Route>


      <Route
        path="*"
        element={
          <div className="flex items-center justify-center min-h-[100vh]">
            <span className="text-3xl text-gray-700 font-semibold">
              404 Not Found
            </span>
          </div>
        }
      />
    </Routes>
  );
};

export default Apiroutes;
