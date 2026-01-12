import dayjs from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

export function getCurrentWeekInfo() {
  const now = dayjs();
  
  return {
    // 当前日期
    currentDate: now.format('YYYY-MM-DD'),
    currentYear: now.year(),
    
    // 两种周数
    weekNumber: now.week(),       // 传统周数
    isoWeekNumber: now.isoWeek(), // ISO 周数
    
    // 本周范围
    weekStart: now.startOf('week').format('YYYY-MM-DD'),
    weekEnd: now.endOf('week').format('YYYY-MM-DD'),
    isoWeekStart: now.startOf('isoWeek').format('YYYY-MM-DD'),
    isoWeekEnd: now.endOf('isoWeek').format('YYYY-MM-DD'),
    
    // 显示格式化
    display: `第 ${now.isoWeek()} 周 (${now.format('YYYY年MM月DD日')})`
  };
}