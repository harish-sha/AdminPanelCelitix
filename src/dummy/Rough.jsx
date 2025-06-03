import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { CheckCircleIcon, XCircleIcon, EyeIcon, UserXIcon, UploadIcon, TableIcon, SendIcon, UserIcon } from 'lucide-react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-lg border-l-8 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const pieData = [
  { name: 'Delivered', value: 400 },
  { name: 'Undelivered', value: 100 },
  { name: 'Read', value: 300 },
  { name: 'Blocked', value: 200 }
];

const lineData = [
  { name: 'Mon', delivered: 300, read: 200 },
  { name: 'Tue', delivered: 200, read: 100 },
  { name: 'Wed', delivered: 278, read: 250 },
  { name: 'Thu', delivered: 189, read: 180 },
  { name: 'Fri', delivered: 239, read: 230 },
  { name: 'Sat', delivered: 349, read: 320 },
  { name: 'Sun', delivered: 200, read: 190 }
];

const COLORS = ['#4ade80', '#facc15', '#60a5fa', '#f87171'];

const Dashboard = () => {
  const stats = [
    { label: 'Delivered', value: 1200, color: 'border-green-500', icon: <CheckCircleIcon className="w-6 h-6" /> },
    { label: 'Undelivered', value: 300, color: 'border-yellow-400', icon: <XCircleIcon className="w-6 h-6" /> },
    { label: 'Read', value: 900, color: 'border-blue-400', icon: <EyeIcon className="w-6 h-6" /> },
    { label: 'Blocked', value: 150, color: 'border-red-400', icon: <UserXIcon className="w-6 h-6" /> },
    { label: 'Submitted', value: 2000, color: 'border-purple-400', icon: <UploadIcon className="w-6 h-6" /> },
  ];

  const tableData = [
    { schedule: '10 AM', template: 'Offer Promo', senderId: 'CELTIX01' },
    { schedule: '1 PM', template: 'Reminder', senderId: 'DOCWEALTH' },
    { schedule: '4 PM', template: 'Follow Up', senderId: 'HEALTHSQ' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">WhatsApp MM Lite Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 text-gray-800 shadow-xl bg-white ${stat.color} border-l-8 rounded-xl flex items-center justify-between`}
          >
            <div>
              <div className="text-lg font-semibold">{stat.label}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
            <div className="text-gray-600">{stat.icon}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-blue-400">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Delivery Breakdown</h2>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600 mr-2" defaultChecked /> Include Read Data
              </label>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-green-400">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Weekly Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="delivered" stroke="#4ade80" strokeWidth={2} />
                <Line type="monotone" dataKey="read" stroke="#60a5fa" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-indigo-400">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">WABA Schedule Overview</h2>
          <table className="w-full table-auto border text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Scheduled Time</th>
                <th className="px-4 py-2">Template</th>
                <th className="px-4 py-2">Sender ID</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{row.schedule}</td>
                  <td className="px-4 py-2">{row.template}</td>
                  <td className="px-4 py-2">{row.senderId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-yellow-400">
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Templates Used</h2>
                <p className="text-2xl font-bold">15</p>
              </div>
              <TableIcon className="w-6 h-6 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-pink-400">
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Sender IDs</h2>
                <p className="text-2xl font-bold">5</p>
              </div>
              <SendIcon className="w-6 h-6 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
