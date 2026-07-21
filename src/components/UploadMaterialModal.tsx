import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../context/ToastContext';
import Modal from './Modal';
import { Upload, File, X, CheckCircle } from 'lucide-react';

interface UploadMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadMaterialModal({ isOpen, onClose }: UploadMaterialModalProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();
  
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('CS101');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !file) {
      showToast(t('toast.error'), t('modal.error_empty_fields', 'Please fill all required fields and attach a file'), 'error');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API upload
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(t('toast.success'), t('toast.material_uploaded'), 'success');
      setTitle('');
      setFile(null);
      onClose();
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('modal.upload_material', 'Upload Course Material')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              {t('modal.material_title', 'Material Title')}
            </label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('modal.material_title_placeholder', 'E.g., Week 3 Lecture Slides')}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              {t('student.course', 'Course')}
            </label>
            <select 
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            >
              <option value="CS101">CS101</option>
              <option value="CS201">CS201</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            {t('modal.attach_file', 'Attach File')}
          </label>
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden" 
            accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
          />

          {!file ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
            >
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                <Upload className="w-6 h-6 text-slate-500 group-hover:text-blue-500" />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-700 dark:text-slate-300">{t('modal.click_to_upload', 'Click to upload or drag and drop')}</p>
                <p className="text-xs text-slate-500 mt-1">PDF, DOCX, PPTX or ZIP (max. 10MB)</p>
              </div>
            </div>
          ) : (
            <div className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                <File className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button 
                type="button" 
                onClick={removeFile}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t('modal.cancel', 'Cancel')}
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting || !file || !title}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            {t('modal.upload', 'Upload File')}
          </button>
        </div>
      </form>
    </Modal>
  );
}
