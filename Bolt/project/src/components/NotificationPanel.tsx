import React from 'react';
import { motion } from 'framer-motion';

const NotificationPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-cyan-500/30 w-72"
    >
      <h3 className="text-cyan-400 font-semibold mb-2">Recent Activity</h3>
      <div className="space-y-3">
        <NotificationItem
          message="Someone just bought a home at Pasir Ris"
          time="2 minutes ago"
        />
        <NotificationItem
          message="New property listed in Tampines"
          time="5 minutes ago"
        />
      </div>
    </motion.div>
  );
};

const NotificationItem = ({ message, time }: { message: string; time: string }) => {
  return (
    <div className="text-white text-sm">
      <p>{message}</p>
      <p className="text-cyan-300 text-xs">{time}</p>
    </div>
  );
};

export default NotificationPanel;