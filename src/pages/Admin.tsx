import { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, ArrowUp, ArrowDown, Edit2, Check, X } from 'lucide-react';
import { supabase, type SiteImage } from '@/lib/supabase';
import { useAllImages } from '@/hooks/useSiteData';

const CATEGORIES = ['hero', 'gallery', 'about', 'campus'] as const;

export default function Admin() {
  const [tab, setTab] = useState<'images'>('images');
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_authed') === 'true');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple gatekeeper — not a real auth system, just keeps casual visitors out.
    // The real protection is RLS on the database side.
    if (password === 'Sathish@d93') {
      setAuthed(true);
      sessionStorage.setItem('admin_authed', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-slate-50">
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 max-w-md w-full">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Admin Access</h2>
          <p className="text-sm text-slate-500 mb-6">
            Enter the admin password to manage images.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
                placeholder="Enter password"
                autoFocus
              />
              {authError && (
                <p className="text-sm text-red-600 mt-2">Incorrect password. Try again.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-xs text-slate-400 mt-4 text-center">
            
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Admin Panel</h2>
          <button
            onClick={() => {
              sessionStorage.removeItem('admin_authed');
              setAuthed(false);
            }}
            className="text-sm text-slate-500 hover:text-slate-900"
          >
            Logout
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <ImageIcon className="w-5 h-5 text-slate-700" />
          <h3 className="font-semibold text-slate-900">Manage Images</h3>
        </div>

        <ImageManager />
      </div>
    </div>
  );
}

function ImageManager() {
  const { images, loading, refresh } = useAllImages();
  const [showAdd, setShowAdd] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<string>('gallery');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    setSaving(true);
    const maxOrder = images
      .filter((img) => img.category === newCategory)
      .reduce((max, img) => Math.max(max, img.display_order), -1);
    await supabase.from('site_images').insert({
      image_url: newUrl.trim(),
      title: newTitle.trim() || null,
      category: newCategory,
      display_order: maxOrder + 1,
    });
    setNewUrl('');
    setNewTitle('');
    setShowAdd(false);
    setSaving(false);
    refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await supabase.from('site_images').delete().eq('id', id);
    refresh();
  };

  const handleMove = async (img: SiteImage, direction: 'up' | 'down') => {
    const siblings = images.filter((i) => i.category === img.category).sort((a, b) => a.display_order - b.display_order);
    const idx = siblings.findIndex((i) => i.id === img.id);
    const swapWith = direction === 'up' ? siblings[idx - 1] : siblings[idx + 1];
    if (!swapWith) return;
    await supabase.from('site_images').update({ display_order: swapWith.display_order }).eq('id', img.id);
    await supabase.from('site_images').update({ display_order: img.display_order }).eq('id', swapWith.id);
    refresh();
  };

  const handleSaveEdit = async (id: string) => {
    await supabase.from('site_images').update({
      image_url: editUrl.trim(),
      title: editTitle.trim() || null,
    }).eq('id', id);
    setEditingId(null);
    refresh();
  };

  const startEdit = (img: SiteImage) => {
    setEditingId(img.id);
    setEditUrl(img.image_url);
    setEditTitle(img.title || '');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Manage Images</h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700"
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl border border-slate-200 p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Image link</label>
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
              placeholder="https://example.com/photo.jpg  or  /images/Campus.jpeg"
            />
            <p className="text-xs text-slate-500 mt-1">
              Paste any image URL (e.g. https://...) or a local path (e.g. /images/Campus.jpeg).
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title (optional)</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
              placeholder="Campus building"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={() => setShowAdd(false)} className="text-slate-600 px-4 py-2 rounded-lg text-sm hover:bg-slate-100">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-slate-500 text-center py-8">Loading images...</p>
      ) : (
        <div className="space-y-8">
          {CATEGORIES.map((cat) => {
            const catImages = images.filter((i) => i.category === cat).sort((a, b) => a.display_order - b.display_order);
            if (catImages.length === 0) return null;
            return (
              <div key={cat}>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  {cat} ({catImages.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catImages.map((img, i) => (
                    <div key={img.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                      <div className="relative aspect-video bg-slate-100">
                        <img src={img.image_url} alt={img.title || ''} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        {editingId === img.id ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={editUrl}
                              onChange={(e) => setEditUrl(e.target.value)}
                              className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-700"
                            />
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-700"
                              placeholder="Title"
                            />
                            <div className="flex gap-2">
                              <button onClick={() => handleSaveEdit(img.id)} className="flex items-center gap-1 bg-slate-800 text-white px-3 py-1.5 rounded text-xs">
                                <Check className="w-3 h-3" /> Save
                              </button>
                              <button onClick={() => setEditingId(null)} className="flex items-center gap-1 text-slate-600 px-3 py-1.5 rounded text-xs hover:bg-slate-100">
                                <X className="w-3 h-3" /> Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-slate-900 mb-1">{img.title || 'Untitled'}</p>
                            <p className="text-xs text-slate-400 truncate mb-3">{img.image_url}</p>
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleMove(img, 'up')} disabled={i === 0} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded disabled:opacity-30">
                                <ArrowUp className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleMove(img, 'down')} disabled={i === catImages.length - 1} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded disabled:opacity-30">
                                <ArrowDown className="w-4 h-4" />
                              </button>
                              <button onClick={() => startEdit(img)} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded ml-auto">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(img.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


