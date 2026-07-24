import React from 'react';
import { AlertTriangle, RotateCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('IoT Labs Maker crashed:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-4 bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-gray-100 p-6 text-center">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-base font-bold">Đã xảy ra lỗi ngoài dự kiến</h1>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1 max-w-md">
              Dự án của bạn vẫn được lưu tự động trong trình duyệt. Hãy tải lại trang để tiếp tục.
            </p>
            {this.state.error?.message && (
              <p className="mt-2 text-xs font-mono text-rose-500 max-w-md break-words">{this.state.error.message}</p>
            )}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg transition-all"
          >
            <RotateCw className="w-4 h-4" /> Tải lại trang
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
