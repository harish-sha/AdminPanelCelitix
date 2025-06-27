// {
//     "message": "User Details",
//     "data": [
//         {
//             "firstName": "Dev",
//             "lastName": "OPS",
//             "address": "Jaipur",
//             "allowedServices": [
//                 {
//                     "service_type_id": 1,
//                     "display_name": "SMS"
//                 },
//                 {
//                     "service_type_id": 2,
//                     "display_name": "WHATSAPP"
//                 },
//                 {
//                     "service_type_id": 3,
//                     "display_name": "RCS"
//                 },
//                 {
//                     "service_type_id": 7,
//                     "display_name": "OBD"
//                 }
//             ],
//             "userSrno": 2925,
//             "companyName": "Proactive",
//             "mobileNo": "919680006460",
//             "userType": 3,
//             "userId": "demoUser",
//             "email": "devs@celitix.com"
//         }
//     ],
//     "statusCode": 200,
//     "jsonObject": null
// }


const services = [
  {
    name: "WHATSAPP",
    icon: WhatsApp,
    animation: Animationwhatsapp2,
    desc: "Send real-time notifications",
    color: "from-green-100 to-green-300",
  },
  {
    name: "RCS",
    icon: Message,
    animation: Animationrcs,
    desc: "Interactive messaging solution",
    color: "from-purple-100 to-purple-300",
  },
  {
    name: "OBD",
    icon: Call,
    animation: Animationobd,
    desc: "Automated outbound dialer",
    color: "from-yellow-100 to-yellow-300",
  },
  {
    name: "IBD",
    icon: Call,
    animation: Animationibd,
    desc: "Track inbound communications",
    color: "from-indigo-100 to-indigo-300",
  },
  {
    name: "SMS",
    icon: PhoneAndroid,
    animation: Animationsms,
    desc: "Send and receive SMS",
    color: "from-pink-100 to-pink-300",
  },
  {
    name: "EMAIL",
    icon: Email,
    animation: email2,
    desc: "Campaign and transactional email",
    color: "from-blue-100 to-blue-300",
  },
  {
    name: "APP AUTHENTICATOR",
    icon: Lock,
    animation: auth,
    desc: "Secure 2FA login solutions",
    color: "from-gray-100 to-gray-300",
  },
  {
    name: "TWO-WAY SMS",
    icon: SyncAlt,
    animation: twowaysms,
    desc: "Bi-directional messaging",
    color: "from-red-100 to-red-300",
  },
];


import { useUser } from "@/context/UserContext";

<Grid container spacing={3}>
  {services.map((service, index) => {
    const IconComponent = service.icon;

    // ✅ Check if the user has access to this service
    const hasService = user.services?.some(
      (s) => s.display_name.toLowerCase() === service.name.toLowerCase()
    );

    return (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`relative rounded-xl bg-gradient-to-br ${service.color} p-5 h-52 shadow-md flex flex-col justify-between group cursor-pointer transition-all duration-300 
            ${hasService ? "ring-2 ring-blue-400" : "grayscale opacity-70"}`}
        >
          {/* ✅ Optional badge */}
          {hasService && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm uppercase">
              Active
            </div>
          )}

          <div className="font-semibold text-lg text-gray-900">
            {service.name}
          </div>

          <div className="flex justify-end">
            {service.animation ? (
              <div className="w-full h-auto text-left">
                <Lottie
                  animationData={service.animation}
                  loop
                  autoplay
                  className="w-20 h-auto"
                />
              </div>
            ) : (
              <IconComponent className="text-gray-700 group-hover:rotate-6 transition-transform duration-300" />
            )}
          </div>

          <p className="text-sm opacity-80 mt-3">{service.desc}</p>
        </motion.div>
      </Grid>
    );
  })}
</Grid>
