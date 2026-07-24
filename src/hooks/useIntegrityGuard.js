/**
 * Integrity Guard — chặn phím tắt mở DevTools / xem mã nguồn / chuột phải,
 * và tự khôi phục thông tin Sinh viên nếu phát hiện DOM bị chỉnh sửa thủ công.
 * Lưu ý: đây chỉ là lớp cảnh báo nhẹ phía client, không phải cơ chế bảo mật thật sự
 * (có thể bị vô hiệu hoá dễ dàng) — chỉ nên dùng để nhắc nhở, không dùng để chấm điểm.
 */
import { useEffect } from 'react';

export function useIntegrityGuard({ studentHeaderRef, studentWatermarkRef, studentInfo, logToConsole, loadStudentInfo }) {
  useEffect(() => {
    const handleSecurityKeyDown = (e) => {
      const isMod = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;

      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        logToConsole('🛡️ Cảnh báo: Thao tác F12 đã bị vô hiệu hóa để bảo vệ tính toàn vẹn bài làm.');
        return false;
      }
      if (isMod && isShift && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        logToConsole('🛡️ Cảnh báo: Phím tắt DevTools đã bị vô hiệu hóa.');
        return false;
      }
      if (isMod && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        logToConsole('🛡️ Cảnh báo: Xem mã nguồn trang đã bị vô hiệu hóa.');
        return false;
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      logToConsole('🛡️ Cảnh báo: Chuột phải Inspect đã bị vô hiệu hóa để chống sửa thông tin Sinh viên.');
      return false;
    };

    window.addEventListener('keydown', handleSecurityKeyDown, true);
    window.addEventListener('contextmenu', handleContextMenu, true);

    return () => {
      window.removeEventListener('keydown', handleSecurityKeyDown, true);
      window.removeEventListener('contextmenu', handleContextMenu, true);
    };
  }, []);

  useEffect(() => {
    const targets = [studentHeaderRef.current, studentWatermarkRef.current].filter(Boolean);
    if (targets.length === 0) return;

    const observers = targets.map(target => {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList' || mutation.type === 'characterData' || mutation.type === 'attributes') {
            logToConsole('🚨 CẢNH BÁO: Phát hiện thao tác can thiệp DOM! Đang tự động khôi phục thông tin Sinh viên...');
            loadStudentInfo();
          }
        }
      });
      observer.observe(target, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      });
      return observer;
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, [studentInfo]);
}
