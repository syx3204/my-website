function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function updateTimeGone() {
    const now = new Date();
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const yearDuration = daysInYear(yearStart.getFullYear());
    const monthDuration = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
    const dayDuration = 24 * 60 * 60 * 1000; // 一天的毫秒数

    const yearProgress = (now - yearStart) / (yearDuration * 24 * 60 * 60 * 1000) * 100;
    const monthProgress = (now - monthStart) / (monthDuration * 24 * 60 * 60 * 1000) * 100;
    const dayProgress = (now - dayStart) / dayDuration * 100;

    // 更新进度条宽度
    document.getElementById('year-fill').style.width = `${yearProgress.toFixed(2)}%`;
    document.getElementById('month-fill').style.width = `${monthProgress.toFixed(2)}%`;
    document.getElementById('day-fill').style.width = `${dayProgress.toFixed(2)}%`;

    // 更新文本信息
    const daysPassedThisYear = Math.floor((now - yearStart) / (24 * 60 * 60 * 1000));
    const daysRemainingThisYear = yearDuration - daysPassedThisYear;
    document.getElementById('year-text').textContent = `今年已经过去了 ${daysPassedThisYear} 天 (${yearProgress.toFixed(2)}%)，剩下 ${daysRemainingThisYear} 天`;
    document.getElementById('month-text').textContent = `本月已经过去了 ${monthProgress.toFixed(2)}% (${now.getDate()} 天)`;
    document.getElementById('day-text').textContent = `今天已经过去了 ${dayProgress.toFixed(2)}% `;

    // 显示当前时间
    const currentTime = document.getElementById('current-time');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    currentTime.textContent = `(${hours}:${minutes})`;
}

// 页面加载完成后立即更新进度条
window.onload = function() {
    updateTimeGone();
};

// 更新一次，然后每秒更新一次
setInterval(updateTimeGone, 1000);