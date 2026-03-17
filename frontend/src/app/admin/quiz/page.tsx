"use client";

import { useState } from "react";
import {
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Save,
  Users,
  Target,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import StatsCard from "@/components/admin/StatsCard";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface QuizQuestion {
  id: number;
  title: string;
  stepId: string;
  options: { value: string; label: string }[];
}

interface QuizProduct {
  id: number;
  name: string;
  slug: string;
  score: number;
  matchRate: number;
  enabled: boolean;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: "Who are you buying for?",
    stepId: "recipient",
    options: [
      { value: "husband", label: "Husband" },
      { value: "dad", label: "Dad" },
      { value: "boyfriend", label: "Boyfriend" },
      { value: "son", label: "Son" },
      { value: "friend", label: "Friend" },
      { value: "self", label: "Myself" },
    ],
  },
  {
    id: 2,
    title: "What's the occasion?",
    stepId: "occasion",
    options: [
      { value: "fathers_day", label: "Father's Day" },
      { value: "christmas", label: "Christmas" },
      { value: "birthday", label: "Birthday" },
      { value: "valentines", label: "Valentine's Day" },
      { value: "anniversary", label: "Anniversary" },
      { value: "graduation", label: "Graduation" },
      { value: "other", label: "Just Because" },
    ],
  },
  {
    id: 3,
    title: "What's your budget?",
    stepId: "budget",
    options: [
      { value: "100", label: "Under $100" },
      { value: "200", label: "Under $200" },
      { value: "350", label: "Under $350" },
      { value: "500", label: "Under $500" },
      { value: "1000", label: "$500–$1,000" },
      { value: "9999", label: "$1,000+" },
    ],
  },
  {
    id: 4,
    title: "What's his style?",
    stepId: "style",
    options: [
      { value: "classic", label: "Classic / Dressy" },
      { value: "modern", label: "Modern / Minimalist" },
      { value: "sport", label: "Sporty / Active" },
      { value: "rugged", label: "Rugged / Outdoor" },
      { value: "dress", label: "Dress / Formal" },
      { value: "casual", label: "Casual / Everyday" },
    ],
  },
];

const quizProducts: QuizProduct[] = [
  { id: 1, name: "Seiko Presage SRPD37", slug: "seiko-presage-srpd37", score: 9.2, matchRate: 34, enabled: true },
  { id: 2, name: "Orient Bambino V2", slug: "orient-bambino-v2", score: 9.1, matchRate: 28, enabled: true },
  { id: 3, name: "Tissot PRX Powermatic 80", slug: "tissot-prx-powermatic-80", score: 9.3, matchRate: 22, enabled: true },
  { id: 4, name: "Hamilton Khaki Field", slug: "hamilton-khaki-field-mechanical", score: 9.0, matchRate: 18, enabled: true },
  { id: 5, name: "Citizen Eco-Drive BM8180", slug: "citizen-eco-drive-bm8180", score: 7.8, matchRate: 12, enabled: true },
  { id: 6, name: "Seiko 5 Sports SRPD55", slug: "seiko-5-srpd55", score: 8.7, matchRate: 15, enabled: true },
  { id: 7, name: "Casio G-Shock GA2100", slug: "casio-g-shock-ga2100", score: 7.5, matchRate: 10, enabled: true },
  { id: 8, name: "Bulova Lunar Pilot", slug: "bulova-lunar-pilot", score: 8.6, matchRate: 8, enabled: true },
  { id: 9, name: "Timex Marlin Automatic", slug: "timex-marlin-automatic", score: 8.2, matchRate: 6, enabled: true },
  { id: 10, name: "Tissot Gentleman", slug: "tissot-gentleman-powermatic-80", score: 9.4, matchRate: 14, enabled: true },
  { id: 11, name: "Fossil Neutra", slug: "fossil-neutra-chronograph", score: 7.4, matchRate: 5, enabled: false },
];

export default function QuizPage() {
  const [editQuestionModal, setEditQuestionModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<QuizQuestion | null>(null);
  const [activeTab, setActiveTab] = useState<"questions" | "products" | "stats">("questions");

  return (
    <div>
      <AdminBreadcrumb items={[{ label: "Quiz Management" }]} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy font-heading">Gift Finder Quiz</h1>
          <p className="text-sm text-gray-500 mt-1">Manage quiz questions, product matching, and view usage stats</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-dark to-gold text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/25 transition-all">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Quiz Starts" value={482} change="+15% this month" changeType="positive" icon={<HelpCircle className="w-5 h-5" />} />
        <StatsCard title="Completions" value={347} change="72% rate" changeType="positive" icon={<Target className="w-5 h-5" />} iconColor="bg-emerald-50 text-emerald-600" />
        <StatsCard title="Avg. Time" value="45s" change="-5s vs last month" changeType="positive" icon={<TrendingUp className="w-5 h-5" />} iconColor="bg-blue-50 text-blue-600" />
        <StatsCard title="Click-throughs" value={198} change="57% of completions" changeType="positive" icon={<Users className="w-5 h-5" />} iconColor="bg-purple-50 text-purple-600" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
        {[
          { id: "questions" as const, label: "Questions", icon: <HelpCircle className="w-4 h-4" /> },
          { id: "products" as const, label: "Products", icon: <Target className="w-4 h-4" /> },
          { id: "stats" as const, label: "Usage Stats", icon: <BarChart3 className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Questions Tab */}
      {activeTab === "questions" && (
        <div className="space-y-4">
          {quizQuestions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <button className="mt-1 text-gray-300 hover:text-gray-400 cursor-grab">
                  <GripVertical className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-gray-900">{question.title}</h3>
                    <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded">
                      {question.stepId}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {question.options.map((opt) => (
                      <span key={opt.value} className="inline-flex px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">
                        {opt.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setEditQuestionModal(true)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteConfirm(question)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setEditQuestionModal(true)}
            className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:text-gold hover:border-gold/30 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">{quizProducts.filter(p => p.enabled).length} products in matching pool</span>
            <button onClick={() => setEditProductModal(true)} className="text-sm text-gold hover:text-gold-dark font-medium flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Product
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Gift Score</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Match Rate</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Enabled</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {quizProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-medium text-gray-900">{product.name}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${
                      product.score >= 9 ? "text-emerald-600 bg-emerald-50" : "text-gold bg-gold/10"
                    }`}>{product.score}/10</span>
                  </td>
                  <td className="px-4 py-3.5 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full" style={{ width: `${product.matchRate}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 tabular-nums">{product.matchRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <button className={`w-10 h-5 rounded-full transition-colors relative ${product.enabled ? "bg-emerald-500" : "bg-gray-200"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${product.enabled ? "left-5" : "left-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button onClick={() => setEditProductModal(true)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Recommended Products</h3>
            <div className="space-y-3">
              {[...quizProducts].sort((a, b) => b.matchRate - a.matchRate).slice(0, 5).map((product, i) => (
                <div key={product.id} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-gray-100 text-xs font-bold text-gray-500 flex items-center justify-center">{i + 1}</span>
                  <span className="flex-1 text-sm text-gray-700">{product.name}</span>
                  <span className="text-sm font-medium text-gray-900 tabular-nums">{product.matchRate}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Most Popular Answers</h3>
            <div className="space-y-4">
              {[
                { question: "Recipient", answer: "Boyfriend", pct: 32 },
                { question: "Occasion", answer: "Christmas", pct: 28 },
                { question: "Budget", answer: "Under $200", pct: 35 },
                { question: "Style", answer: "Classic / Dressy", pct: 27 },
              ].map((item) => (
                <div key={item.question}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">{item.question}</span>
                    <span className="font-medium text-gray-900">{item.answer} ({item.pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 lg:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quiz Funnel</h3>
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              {[
                { step: "Page Visit", count: 680, pct: 100 },
                { step: "Quiz Start", count: 482, pct: 71 },
                { step: "Q2 Reached", count: 445, pct: 65 },
                { step: "Q3 Reached", count: 398, pct: 59 },
                { step: "Completed", count: 347, pct: 51 },
                { step: "Click-through", count: 198, pct: 29 },
              ].map((step, i) => (
                <div key={step.step} className="flex-1 text-center">
                  <div className={`rounded-lg p-4 ${i === 0 ? "bg-navy text-white" : "bg-gray-50"}`}>
                    <p className={`text-lg font-bold tabular-nums ${i === 0 ? "text-white" : "text-navy"}`}>{step.count}</p>
                    <p className={`text-xs ${i === 0 ? "text-gray-300" : "text-gray-500"}`}>{step.step}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 tabular-nums">{step.pct}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Question Modal */}
      <Modal open={editQuestionModal} onClose={() => setEditQuestionModal(false)} title="Edit Question" size="md"
        footer={<>
          <button onClick={() => setEditQuestionModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={() => setEditQuestionModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gold-dark to-gold rounded-lg hover:shadow-lg transition-all">Save</button>
        </>}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Question Text</label>
            <input type="text" defaultValue="Who are you buying for?" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Step ID</label>
            <input type="text" defaultValue="recipient" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Options (one per line: value|label)</label>
            <textarea defaultValue={"husband|Husband\ndad|Dad\nboyfriend|Boyfriend\nson|Son\nfriend|Friend\nself|Myself"} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold/30 min-h-[150px] resize-y" />
          </div>
        </div>
      </Modal>

      {/* Edit Product Modal */}
      <Modal open={editProductModal} onClose={() => setEditProductModal(false)} title="Edit Product Matching" size="md"
        footer={<>
          <button onClick={() => setEditProductModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={() => setEditProductModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gold-dark to-gold rounded-lg hover:shadow-lg transition-all">Save</button>
        </>}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/30">
              <option>Seiko Presage SRPD37</option>
              <option>Orient Bambino V2</option>
              <option>Tissot PRX Powermatic 80</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Matching Criteria</label>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Styles (comma separated)</label>
                <input type="text" defaultValue="classic, dress" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Occasions (comma separated)</label>
                <input type="text" defaultValue="christmas, fathers_day, birthday, valentines, anniversary, graduation" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Recipients (comma separated)</label>
                <input type="text" defaultValue="husband, dad, boyfriend, self" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} onConfirm={() => setDeleteConfirm(null)}
        title="Delete Question" message={`Are you sure you want to delete "${deleteConfirm?.title}"? This will affect the quiz flow.`} confirmLabel="Delete" variant="warning" />
    </div>
  );
}
