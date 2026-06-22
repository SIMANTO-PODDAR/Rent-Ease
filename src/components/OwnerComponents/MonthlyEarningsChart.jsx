"use client"

import React from 'react';
import { motion } from 'framer-motion';
import {
  CartesianGrid, Legend, Line, LineChart,
  Tooltip, XAxis, YAxis, ResponsiveContainer
} from 'recharts';


const MonthlyEarningsChart = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 w-full max-w-5xl mx-auto"
    >
      {/* Chart Header */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800">Revenue & Bookings Overview</h3>
        <p className="text-sm text-slate-500 font-medium mt-1">Monthly performance for the last 12 months</p>
      </div>

      {/* Chart Container */}
      <div className="w-full h-87.5 sm:h-100">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            {/* Subtle Grid Lines */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            {/* X Axis (Months) */}
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ left: 15, right: 15 }}
              dy={10}
            />

            {/* Left Y Axis (Revenue) */}
            <YAxis
              yAxisId="left"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value >= 1000 ? (value / 1000) + 'k' : value}`}
              dx={-10}
            />

            {/* Right Y Axis (Bookings) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dx={10}
            />

            {/* Modern Tooltip */}
            <Tooltip
              cursor={{ stroke: '#e2e8f0', strokeWidth: 2, strokeDasharray: "4 4" }}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              itemStyle={{ fontWeight: 600 }}
              labelStyle={{ color: '#64748b', marginBottom: '4px' }}
            />

            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
            />

            {/* Revenue Line */}
            <Line
              yAxisId="left"
              type="monotone"
              name="Revenue"
              dataKey="revenue"
              stroke="#0a3d62"
              strokeWidth={3}
              dot={{ fill: '#0a3d62', strokeWidth: 2, r: 4, stroke: '#ffffff' }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#0a3d62' }}
            />

            {/* Bookings Line */}
            <Line
              yAxisId="right"
              type="monotone"
              name="Bookings"
              dataKey="bookings"
              stroke="#3498db"
              strokeWidth={3}
              dot={{ fill: '#3498db', strokeWidth: 2, r: 4, stroke: '#ffffff' }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#3498db' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default MonthlyEarningsChart;