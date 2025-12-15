import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface UpcomingDeadlinesProps {
  onNavigate: (screen: string) => void;
}

export function UpcomingDeadlines({ onNavigate }: UpcomingDeadlinesProps) {
  const deadlines = [
    { 
      id: 1, 
      title: 'VAT Return Filing', 
      days: 2, 
      date: 'Dec 15, 2025',
      priority: 'high',
      type: 'filing',
      description: 'Monthly VAT return for November 2025',
      status: 'pending'
    },
    { 
      id: 2, 
      title: 'Income Tax Payment', 
      days: 15, 
      date: 'Dec 28, 2025',
      priority: 'medium',
      type: 'payment',
      description: 'Q4 estimated tax payment',
      status: 'pending'
    },
    { 
      id: 3, 
      title: 'Quarterly Financial Review', 
      days: 28, 
      date: 'Jan 10, 2026',
      priority: 'low',
      type: 'review',
      description: 'Review Q4 2025 financial records',
      status: 'pending'
    },
    { 
      id: 4, 
      title: 'PAYE Return', 
      days: 35, 
      date: 'Jan 17, 2026',
      priority: 'medium',
      type: 'filing',
      description: 'Employee tax withholding return',
      status: 'pending'
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-amber-500 bg-amber-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getPriorityDotColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar */}
      <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm">
        <span>21:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 border border-white rounded-sm" />
          <div className="w-4 h-3 border border-white rounded-sm" />
          <span className="text-xs">70</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg">Upcoming Deadlines</h1>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto">
          <button className="px-4 py-1.5 bg-emerald-600 text-white rounded-full text-sm whitespace-nowrap">
            All
          </button>
          <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 transition-all">
            High Priority
          </button>
          <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 transition-all">
            This Week
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-6 py-6 grid grid-cols-3 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 border border-gray-200 text-center"
        >
          <p className="text-2xl text-red-600 mb-1">1</p>
          <p className="text-xs text-gray-600">Urgent</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 border border-gray-200 text-center"
        >
          <p className="text-2xl text-amber-600 mb-1">2</p>
          <p className="text-xs text-gray-600">This Month</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 border border-gray-200 text-center"
        >
          <p className="text-2xl text-emerald-600 mb-1">4</p>
          <p className="text-xs text-gray-600">Total</p>
        </motion.div>
      </div>

      {/* Deadlines List */}
      <div className="px-6 space-y-3 pb-6">
        {deadlines.map((deadline, index) => (
          <motion.div
            key={deadline.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className={`bg-white rounded-xl p-4 border-l-4 ${getPriorityColor(deadline.priority)} shadow-sm hover:shadow-md transition-all cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${getPriorityDotColor(deadline.priority)}`} />
                <div className="flex-1">
                  <h3 className="text-sm mb-1">{deadline.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{deadline.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{deadline.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{deadline.days} days left</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {deadline.days <= 3 && (
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              )}
            </div>

            {/* Countdown Timer */}
            <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-2xl text-gray-900">{deadline.days}</p>
                  <p className="text-xs text-gray-500">Days</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-gray-900">{Math.floor(Math.random() * 24)}</p>
                  <p className="text-xs text-gray-500">Hours</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-gray-900">{Math.floor(Math.random() * 60)}</p>
                  <p className="text-xs text-gray-500">Minutes</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => onNavigate('fileReturns')}
                className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm"
              >
                Complete Now
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all text-sm">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Calendar Integration Teaser */}
      <div className="px-6 pb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
          <Calendar className="w-10 h-10 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm mb-1">Sync to Calendar</p>
            <p className="text-xs text-gray-600">Add deadlines to Google Calendar</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all">
            Sync
          </button>
        </div>
      </div>
    </div>
  );
}
