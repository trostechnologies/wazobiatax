import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Video, Lightbulb, Search, ChevronDown, Play, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface EducationModuleProps {
  onNavigate: (screen: string) => void;
}

export function EducationModule({ onNavigate }: EducationModuleProps) {
  const [activeTab, setActiveTab] = useState('guides');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'What is the Nigeria Tax Administration Act (NTAA) 2025?',
      answer: 'The NTAA 2025 is a comprehensive reform that simplifies tax compliance for MSMEs. It introduces a 0% CIT for businesses with turnover below ₦50M and streamlined filing processes.',
      section: 'NTAA Basics'
    },
    {
      id: 2,
      question: 'Who is exempt from Corporate Income Tax?',
      answer: 'Businesses with annual turnover below ₦50 million are exempt from CIT. Those between ₦50M-₦100M pay reduced rates. Use our calculator to check your status.',
      section: 'Exemptions'
    },
    {
      id: 3,
      question: 'What are the penalties for late filing?',
      answer: 'Late filing penalties range from ₦25,000 to ₦500,000 depending on the type of return and delay duration. File on time to avoid penalties!',
      section: 'Penalties'
    },
    {
      id: 4,
      question: 'How do I register for a TIN?',
      answer: 'You can register through WazobiaTax using your BVN. The process takes 2-3 minutes and you receive a provisional TIN immediately, confirmed within 24 hours.',
      section: 'Registration'
    },
  ];

  const videos = [
    {
      id: 1,
      title: 'Understanding Your Tax Obligations',
      duration: '5:30',
      thumbnail: '📊',
      views: '1.2K',
      completed: false
    },
    {
      id: 2,
      title: 'How to File VAT Returns',
      duration: '8:45',
      thumbnail: '📝',
      views: '850',
      completed: true
    },
    {
      id: 3,
      title: 'Tax Exemptions for Small Businesses',
      duration: '6:20',
      thumbnail: '💡',
      views: '2.1K',
      completed: false
    },
  ];

  const tips = [
    {
      id: 1,
      title: 'File Early, Save Money',
      description: 'File your returns at least 5 days before the deadline to avoid last-minute errors and penalties.',
      category: 'Best Practice',
      icon: '⏰'
    },
    {
      id: 2,
      title: 'Keep Digital Records',
      description: 'Use the ledger to track all transactions. Digital records make filing easier and reduce errors.',
      category: 'Organization',
      icon: '📱'
    },
    {
      id: 3,
      title: 'Know Your Exemptions',
      description: 'Turnover below ₦100M? You may qualify for tax breaks. Check the exemption calculator.',
      category: 'Savings',
      icon: '💰'
    },
  ];

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
          <h1 className="text-lg">Tax Education</h1>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for topics, penalties, exemptions..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { id: 'guides', label: 'Guides', icon: BookOpen },
            { id: 'videos', label: 'Videos', icon: Video },
            { id: 'tips', label: 'Tips', icon: Lightbulb },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-blue-900">Your Learning Progress</p>
          <p className="text-sm text-blue-600">2/10 completed</p>
        </div>
        <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '20%' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-blue-600 rounded-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Guides Tab */}
        {activeTab === 'guides' && (
          <div className="space-y-3">
            <h3 className="text-sm text-gray-600 mb-3">Frequently Asked Questions</h3>
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-all"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-xs text-emerald-600 mb-1 block">{faq.section}</span>
                    <p className="text-sm">{faq.question}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>
                
                {expandedFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4 border-t border-gray-100"
                  >
                    <p className="text-sm text-gray-600 pt-3">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="space-y-3">
            <h3 className="text-sm text-gray-600 mb-3">Educational Videos</h3>
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 relative">
                    {video.thumbnail}
                    {!video.completed && (
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    )}
                    {video.completed && (
                      <div className="absolute top-1 right-1">
                        <CheckCircle2 className="w-5 h-5 text-white bg-emerald-600 rounded-full" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm mb-1">{video.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{video.duration}</span>
                      <span>•</span>
                      <span>{video.views} views</span>
                    </div>
                    {video.completed && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs">
                        ✓ Completed
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <p className="text-sm text-blue-900 mb-2">All videos include multilingual subtitles</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {['English', 'Pidgin', 'Hausa', 'Yoruba', 'Igbo'].map((lang) => (
                  <span key={lang} className="px-2 py-1 bg-white rounded text-xs text-blue-700">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-3">
            <h3 className="text-sm text-gray-600 mb-3">Pro Tips for Tax Compliance</h3>
            {tips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{tip.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-sm">{tip.title}</h3>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs">
                        {tip.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
