import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from 'react-router-dom';

const translations = {
  english: {
    vatReturnFiling: 'VAT Return Filing',
    vatReturnFilingDesc: 'Monthly VAT return for November 2025',
  
    incomeTaxPayment: 'Income Tax Payment',
    incomeTaxPaymentDesc: 'Q4 estimated tax payment',
  
    quarterlyFinancialReview: 'Quarterly Financial Review',
    quarterlyFinancialReviewDesc: 'Review Q4 2025 financial records',
  
    payeReturn: 'PAYE Return',
    payeReturnDesc: 'Employee tax withholding return',

    upcomingDeadlines: 'Upcoming Deadlines',

    all: 'All',
    highPriority: 'High Priority',
    thisWeek: 'This Week',
    urgent: 'Urgent',
    thisMonth: 'This Month',
  
    total: 'Total',
  
    syncToCalendar: 'Sync to Calendar',
    addDeadlinesToCalendar: 'Add deadlines to Google Calendar',
    sync: 'Sync',

    daysLeft: 'days left',
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  completeNow: 'Complete Now',
  },
  pidgin: {
    vatReturnFiling: 'VAT Return Filing',
    vatReturnFilingDesc: 'Monthly VAT return for November 2025',
  
    incomeTaxPayment: 'Income Tax Payment',
    incomeTaxPaymentDesc: 'Q4 estimated tax payment',
  
    quarterlyFinancialReview: 'Quarterly Financial Review',
    quarterlyFinancialReviewDesc: 'Review financial records for Q4 2025',
  
    payeReturn: 'PAYE Return',
    payeReturnDesc: 'Employee tax wey dem deduct',

    upcomingDeadlines: 'Upcoming Deadlines',

    all: 'All',
    highPriority: 'High Priority',
    thisWeek: 'This Week',
    urgent: 'Urgent',
    thisMonth: 'This Month',
  
    total: 'Total',
  
    syncToCalendar: 'Sync to Calendar',
    addDeadlinesToCalendar: 'Add deadlines to Google Calendar',
    sync: 'Sync',

    daysLeft: 'days wey remain',
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  completeNow: 'Finish am Now',
  },
  hausa: {
    vatReturnFiling: 'Shigar da Rahoton VAT',
    vatReturnFilingDesc: 'Rahoton VAT na wata-wata don Nuwamba 2025',
  
    incomeTaxPayment: 'Biyan Harajin Kuɗin Shiga',
    incomeTaxPaymentDesc: 'Biyan haraji na hasashen zangon huɗu (Q4)',
  
    quarterlyFinancialReview: 'Binciken Kuɗi na Kwata',
    quarterlyFinancialReviewDesc: 'Binciken bayanan kuɗi na Q4 2025',
  
    payeReturn: 'Rahoton PAYE',
    payeReturnDesc: 'Rahoton harajin ma’aikata',

    upcomingDeadlines: 'Abubuwan Da Za a Yi Nan Gaba',

    all: 'Duka',
    highPriority: 'Babban Muhimmanci',
    thisWeek: 'Wannan Makon',
    urgent: 'Gaggawa',
    thisMonth: 'Wannan Watan',
  
    total: 'Jimilla',
  
    syncToCalendar: 'Daidaita da Kalanda',
    addDeadlinesToCalendar: 'Ƙara wa’adin aiki zuwa Google Calendar',
    sync: 'Daidaita',

    daysLeft: 'kwanaki da suka rage',
  days: 'Kwanaki',
  hours: 'Awanni',
  minutes: 'Mintuna',
  completeNow: 'Kammala Yanzu',
  },
  yoruba: {
    vatReturnFiling: 'Ìforúkọsílẹ̀ VAT',
    vatReturnFilingDesc: 'Ìròyìn VAT oṣù Kọkànlá 2025',
  
    incomeTaxPayment: 'Sísan Owó-ori Owo-wiwọle',
    incomeTaxPaymentDesc: 'Sísan owó-ori ìṣírò Q4',
  
    quarterlyFinancialReview: 'Àyẹ̀wò Ìṣúná Mẹ́ẹ̀rin',
    quarterlyFinancialReviewDesc: 'Àyẹ̀wò ìwé-ìṣúná Q4 2025',
  
    payeReturn: 'Ìròyìn PAYE',
    payeReturnDesc: 'Owó-ori tí a yọ lára owó oṣiṣẹ́',

    upcomingDeadlines: 'Àwọn Ọjọ́-ìparí Tó ń Bọ̀',

    all: 'Gbogbo rẹ̀',
    highPriority: 'Pataki Gíga',
    thisWeek: 'Ọ̀sẹ̀ Yìí',
    urgent: 'Pajawiri',
    thisMonth: 'Oṣù Yìí',
  
    total: 'Lapapọ̀',
  
    syncToCalendar: 'Darapọ̀ mọ́ Kalẹ́nda',
    addDeadlinesToCalendar: 'Fikun àwọn ọjọ́-ìparí sí Google Calendar',
    sync: 'Darapọ̀',

     daysLeft: 'ọjọ́ tó kù',
  days: 'Ọjọ́',
  hours: 'Wákàtí',
  minutes: 'Ìṣẹ́jú',
  completeNow: 'Parí Níbayìí',
  },
  igbo: {
    vatReturnFiling: 'Ntinye VAT',
    vatReturnFilingDesc: 'Nzipụta VAT kwa ọnwa maka Novemba 2025',
  
    incomeTaxPayment: 'Ịkwụ Ụtụ Isi Ego',
    incomeTaxPaymentDesc: 'Ịkwụ ụtụ isi a tụrụ maka Q4',
  
    quarterlyFinancialReview: 'Nlele Ego Kwa Nketa',
    quarterlyFinancialReviewDesc: 'Nlele ndekọ ego Q4 2025',
  
    payeReturn: 'Nzipụta PAYE',
    payeReturnDesc: 'Ụtụ isi a na-ewe n’aka ndị ọrụ',

    upcomingDeadlines: 'Ụbọchị Mmechi Na-abịa',

    all: 'Ha niile',
    highPriority: 'Ihe Dị Mkpa Nke Ukpa',
    thisWeek: 'Izu A',
    urgent: 'Mberede',
    thisMonth: 'Ọnwa A',
  
    total: 'Ngụkọta',
  
    syncToCalendar: 'Jikọọ na Kalenda',
    addDeadlinesToCalendar: 'Tinye ụbọchị mmechi na Google Calendar',
    sync: 'Jikọọ',

    daysLeft: 'ụbọchị fọdụrụ',
  days: 'Ụbọchị',
  hours: 'Elekere',
  minutes: 'Nkeji',
  completeNow: 'Mechaa Ugbu a',
  }        
}

export function UpcomingDeadlines() {

  const deadlines = [
  {
    id: 1,
    titleKey: 'vatReturnFiling',
    descKey: 'vatReturnFilingDesc',
    days: 2,
    date: 'Dec 15, 2025',
    priority: 'high',
    type: 'filing',
    status: 'pending',
  },
  {
    id: 2,
    titleKey: 'incomeTaxPayment',
    descKey: 'incomeTaxPaymentDesc',
    days: 15,
    date: 'Dec 28, 2025',
    priority: 'medium',
    type: 'payment',
    status: 'pending',
  },
  {
    id: 3,
    titleKey: 'quarterlyFinancialReview',
    descKey: 'quarterlyFinancialReviewDesc',
    days: 28,
    date: 'Jan 10, 2026',
    priority: 'low',
    type: 'review',
    status: 'pending',
  },
  {
    id: 4,
    titleKey: 'payeReturn',
    descKey: 'payeReturnDesc',
    days: 35,
    date: 'Jan 17, 2026',
    priority: 'medium',
    type: 'filing',
    status: 'pending',
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

  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

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
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg">{translations[language].upcomingDeadlines}</h1>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto">
          <button className="px-4 py-1.5 bg-emerald-600 text-white rounded-full text-sm whitespace-nowrap">
            {translations[language].all}
          </button>
          <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 transition-all">
            {translations[language].highPriority}
          </button>
          <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 transition-all">
            {translations[language].thisWeek}
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
          <p className="text-xs text-gray-600">{translations[language].urgent}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 border border-gray-200 text-center"
        >
          <p className="text-2xl text-amber-600 mb-1">2</p>
          <p className="text-xs text-gray-600">{translations[language].thisMonth}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 border border-gray-200 text-center"
        >
          <p className="text-2xl text-emerald-600 mb-1">4</p>
          <p className="text-xs text-gray-600">{translations[language].total}</p>
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
                  <h3 className="text-sm mb-1">{t[deadline.titleKey]}</h3>
                  <p className="text-xs text-gray-600 mb-2">{t[deadline.descKey]}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{deadline.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{deadline.days} {translations[language].daysLeft}</span>
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
                  <p className="text-xs text-gray-500">{translations[language].days}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-gray-900">{Math.floor(Math.random() * 24)}</p>
                  <p className="text-xs text-gray-500">{translations[language].hours}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-gray-900">{Math.floor(Math.random() * 60)}</p>
                  <p className="text-xs text-gray-500">{translations[language].minutes}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => navigate('/file-returns')}
                className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm"
              >
                {translations[language].completeNow}
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
            <p className="text-sm mb-1">{translations[language].syncToCalendar}</p>
            <p className="text-xs text-gray-600">{translations[language].addDeadlinesToCalendar}</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all">
            {translations[language].sync}
          </button>
        </div>
      </div>
    </div>
  );
}
