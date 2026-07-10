import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSignOutAlt, FaSearch, FaTrash, FaEnvelope, FaPhone,
  FaBuilding, FaGlobe, FaCalendarAlt, FaChevronLeft, FaChevronRight,
  FaInbox, FaSyncAlt, FaEye, FaTimes, FaFilter
} from 'react-icons/fa';

const API = 'http://localhost:5000/api';

const formatDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

const SERVICE_COLORS = {
  'Custom Software':        'bg-blue-50 text-blue-700 border-blue-200',
  'Web Development':        'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Mobile Apps':            'bg-purple-50 text-purple-700 border-purple-200',
  'Cloud Solutions':        'bg-sky-50 text-sky-700 border-sky-200',
  'AI & Machine Learning':  'bg-violet-50 text-violet-700 border-violet-200',
  'Enterprise Software':    'bg-teal-50 text-teal-700 border-teal-200',
  'IT Consulting':          'bg-green-50 text-green-700 border-green-200',
  'Digital Transformation': 'bg-orange-50 text-orange-700 border-orange-200',
  'Internships/Careers':    'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Business Partnerships':  'bg-rose-50 text-rose-700 border-rose-200',
};

/* ── Detail Modal ──────────────────────────────────────────── */
const DetailModal = ({ contact, onClose, onDelete }) => {
  if (!contact) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-[#0F172A]">{contact.fullName}</h2>
              <p className="text-xs text-[#94A3B8] mt-0.5">{formatDate(contact.createdAt)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { onDelete(contact._id); onClose(); }}
                className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <FaTrash className="text-sm" />
              </button>
              <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 flex flex-col gap-5">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <FaEnvelope className="text-[#2563EB]" />, label: 'Email',   value: contact.email },
                { icon: <FaPhone    className="text-green-500" />, label: 'Phone',   value: contact.phone },
                { icon: <FaBuilding className="text-orange-500"/>, label: 'Company', value: contact.companyName || '—' },
                { icon: <FaGlobe   className="text-purple-500"/>, label: 'Country',  value: contact.country },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="mt-0.5">{icon}</span>
                  <div>
                    <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">{label}</p>
                    <p className="text-sm font-semibold text-[#0F172A] mt-0.5 break-all">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Service + Budget + Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Service',  value: contact.serviceRequired },
                { label: 'Budget',   value: contact.projectBudget },
                { label: 'Timeline', value: contact.projectTimeline },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">{label}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${SERVICE_COLORS[value] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">Message</p>
              <p className="text-sm text-[#334155] leading-relaxed whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ── Main Dashboard ────────────────────────────────────────── */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [contacts, setContacts]       = useState([]);
  const [pagination, setPagination]   = useState({ total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [serviceFilter, setService]   = useState('');
  const [selected, setSelected]       = useState(null);
  const [deleteId, setDeleteId]       = useState(null);
  const [error, setError]             = useState('');

  const token = localStorage.getItem('adminToken');

  // Redirect if not authenticated
  useEffect(() => {
    if (!token) navigate('/admin/login', { replace: true });
  }, [token, navigate]);

  const fetchContacts = useCallback(async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit: 15 };
      if (search) params.search = search;
      if (serviceFilter) params.service = serviceFilter;

      const { data } = await axios.get(`${API}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
      setContacts(data.data);
      setPagination(data.pagination);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login', { replace: true });
      } else {
        setError(err.response?.data?.message || 'Failed to fetch contacts.');
      }
    } finally {
      setLoading(false);
    }
  }, [token, navigate, search, serviceFilter]);

  useEffect(() => { fetchContacts(1); }, [search, serviceFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeleteId(null);
      fetchContacts(pagination.page);
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login', { replace: true });
  };

  const adminEmail = localStorage.getItem('adminEmail') || 'Admin';

  return (
    <div className="min-h-screen bg-[#F8FAFF]">

      {/* ── Top Bar ── */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#F97316] flex items-center justify-center">
              <FaInbox className="text-white text-sm" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-[#0F172A]">Admin Dashboard</h1>
              <p className="text-[10px] text-[#94A3B8]">Sofzenix IT Solutions LLP</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs font-medium text-[#64748B] bg-gray-100 px-3 py-1.5 rounded-full">
              {adminEmail}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
            >
              <FaSignOutAlt className="text-xs" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Submissions', value: pagination.total, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
            { label: 'This Page',         value: contacts.length,  color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Total Pages',        value: pagination.totalPages, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Current Page',       value: `${pagination.page} / ${pagination.totalPages}`, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">{label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-xs" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, company..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#0F172A] placeholder-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Service Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-xs" />
              <select
                value={serviceFilter}
                onChange={(e) => setService(e.target.value)}
                className="pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#0F172A] bg-white focus:outline-none focus:border-[#2563EB] transition-all appearance-none cursor-pointer"
              >
                <option value="">All Services</option>
                {Object.keys(SERVICE_COLORS).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Refresh */}
            <button
              onClick={() => fetchContacts(pagination.page)}
              className="p-2.5 rounded-xl border border-gray-200 text-[#64748B] hover:bg-gray-50 hover:text-[#2563EB] transition-colors"
            >
              <FaSyncAlt className="text-sm" />
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center text-red-600 font-semibold">
            {error}
          </div>
        ) : loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-3 border-[#2563EB]/20 border-t-[#2563EB] animate-spin" />
            <p className="text-sm text-[#94A3B8] font-medium">Loading submissions...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center gap-3">
            <FaInbox className="text-4xl text-gray-300" />
            <p className="text-sm font-semibold text-[#94A3B8]">No contact submissions found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['Name', 'Email', 'Company', 'Service', 'Budget', 'Country', 'Date', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-widest whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {contacts.map((c, i) => (
                    <motion.tr
                      key={c._id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="px-4 py-3.5 text-sm font-semibold text-[#0F172A] whitespace-nowrap max-w-[140px] truncate">
                        {c.fullName}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-[#2563EB] whitespace-nowrap max-w-[160px] truncate">
                        <a href={`mailto:${c.email}`} className="hover:underline">{c.email}</a>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-[#475569] whitespace-nowrap max-w-[120px] truncate">
                        {c.companyName || '—'}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${SERVICE_COLORS[c.serviceRequired] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                          {c.serviceRequired}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-[#475569] whitespace-nowrap">{c.projectBudget}</td>
                      <td className="px-4 py-3.5 text-xs text-[#475569] whitespace-nowrap">{c.country}</td>
                      <td className="px-4 py-3.5 text-[11px] text-[#94A3B8] whitespace-nowrap">
                        {formatDate(c.createdAt)}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setSelected(c)}
                            className="p-1.5 rounded-lg text-[#2563EB] hover:bg-blue-100 transition-colors"
                            title="View details"
                          >
                            <FaEye className="text-xs" />
                          </button>
                          <button
                            onClick={() => setDeleteId(c._id)}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col divide-y divide-gray-100">
              {contacts.map((c) => (
                <div key={c._id} className="p-4 hover:bg-blue-50/20 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">{c.fullName}</p>
                      <a href={`mailto:${c.email}`} className="text-xs text-[#2563EB] hover:underline">{c.email}</a>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${SERVICE_COLORS[c.serviceRequired] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                      {c.serviceRequired}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-[#94A3B8]">{formatDate(c.createdAt)}</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelected(c)} className="p-1.5 rounded-lg text-[#2563EB] hover:bg-blue-100 transition-colors">
                        <FaEye className="text-xs" />
                      </button>
                      <button onClick={() => setDeleteId(c._id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors">
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Pagination ── */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => fetchContacts(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-2.5 rounded-xl border border-gray-200 text-[#64748B] hover:bg-white hover:border-[#2563EB] hover:text-[#2563EB] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <span className="text-sm font-semibold text-[#475569]">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchContacts(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-2.5 rounded-xl border border-gray-200 text-[#64748B] hover:bg-white hover:border-[#2563EB] hover:text-[#2563EB] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        )}
      </main>

      {/* ── Detail Modal ── */}
      {selected && (
        <DetailModal
          contact={selected}
          onClose={() => setSelected(null)}
          onDelete={(id) => { handleDelete(id); setSelected(null); }}
        />
      )}

      {/* ── Delete Confirm ── */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="text-base font-extrabold text-[#0F172A] mb-2">Delete Submission?</h3>
              <p className="text-sm text-[#64748B] mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-[#475569] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
