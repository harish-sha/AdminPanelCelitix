import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  FiAlertCircle,
  FiMessageSquare,
  FiSmartphone,
  FiSend,
} from "react-icons/fi";
import { Dialog } from "primereact/dialog";
import { SiWhatsapp } from "react-icons/si";
import { motion } from "framer-motion";
import { getaccountInfo } from "@/apis/user/user";
import { useUser } from "@/context/auth";

const AccountExpiryFormat = () => {
  const { user } = useUser();
  const [expiryDate, setExpiryDate] = useState(null);
  const [showExpiryAlert, setShowExpiryAlert] = useState(false);
  const [isAccountExpired, setIsAccountExpired] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      if (user.role === "AGENT") return;
      setIsFetching(true);

      try {
        const data = await getaccountInfo();
        // const data =
        // {
        //     "expiryDate": "2025-08-03",
        // };
        const expiry = new Date(data.expiryDate);
        setExpiryDate(expiry);
        const today = new Date();
        const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

        if (expiry < today) {
          // Already expired
          setIsAccountExpired(true);
        } else if (diffDays <= 3) {
          // Expiring within next 3 days
          setShowExpiryAlert(true);
        }
      } catch (error) {
        console.error("Error fetching account info", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchAccountInfo();
  }, []);
  return (
    <>
      {isAccountExpired && (
        <div
          className="absolute h-full inset-0 z-[1000] flex items-center justify-center bg-black/80"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-[92%] max-w-2xl rounded-2xl bg-white shadow-2xl border border-red-200 p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Dear <span className="font-medium">Customer</span>,
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
                      Your account has expired
                    </h2>

                    <p className="mt-2 text-sm text-gray-700">
                      Expired on:&nbsp;
                      <span className="font-medium text-red-600">
                        {expiryDate?.toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                  <div className="shrink-0">
                    <FiAlertCircle className="text-red-600 text-5xl" />
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4">
                  <p className="text-sm text-gray-800">
                    Access to messaging services is currently paused. To resume
                    operations, please reactivate your account. Once
                    reactivated, delivery and automation will continue without
                    disruption and your data remains intact.
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 p-3">
                    <div className="mt-0.5">
                      <SiWhatsapp className="text-emerald-600 text-2xl" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        WhatsApp
                      </p>
                      <p className="text-xs text-gray-600">
                        Templates • Flows • Notifications
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 p-3">
                    <div className="mt-0.5">
                      <FiSmartphone className="text-violet-600 text-2xl" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">RCS</p>
                      <p className="text-xs text-gray-600">
                        Rich cards • Carousels • Branding
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 p-3">
                    <div className="mt-0.5">
                      <FiMessageSquare className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">SMS</p>
                      <p className="text-xs text-gray-600">
                        Alerts • OTP • Broadcasts
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-xs text-gray-500 leading-relaxed">
                  This notice is shown because your billing period has ended.
                  Platform access is restricted until reactivation is completed
                  by your organization. Message queues, logs, analytics, and
                  configuration are preserved according to your data retention
                  policy.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Dialog
        header="⚠ Account Expiry Notice"
        visible={showExpiryAlert}
        onHide={() => setShowExpiryAlert(false)}
        style={{ width: "35vw" }}
        modal
        closable
        draggable={false}
        className="border-l-4 border-yellow-500"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center text-center space-y-3"
        >
          <FiAlertCircle className="text-yellow-500 text-5xl" />
          <p className="text-xl font-semibold text-gray-800">
            Your account will expire soon
          </p>
          <p className="text-sm text-gray-600">
            Expiry Date:{" "}
            <span className="text-red-600 font-medium">
              {expiryDate?.toLocaleDateString()}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Please contact the administrator to avoid service interruption.
          </p>
        </motion.div>
      </Dialog>
    </>
  );
};

export default AccountExpiryFormat;
