import { parse } from 'yaml';

const maxDays = 30;

export const getUrls = async () => {
  const response = await fetch('config.yaml');
  const configText = await response.text();
  return parse(configText)?.urls;
};

export const getReportByUrl = async (key, current = false) => {
  const response = await fetch(`logs/${key}_report.log`);
  let statusLines = '';
  if (response.ok) {
    statusLines = await response.text();
  }
  
  const data = normalizeData(statusLines);

  return current ? Object.values(data)[0] : data;
};

const normalizeData = (statusLines) => {
  const rows = statusLines.split('\n');
  const dateNormalized = splitRowsByDate(rows);

  let relativeDateMap = {};
  const now = Date.now();
  for (const [key, val] of Object.entries(dateNormalized)) {
    if (key === 'upTime') {
      continue;
    }

    const relDays = getRelativeDays(now, new Date(key).getTime());
    relativeDateMap[relDays] = getDayAverage(val);
  }

  relativeDateMap.upTime = dateNormalized.upTime;
  return relativeDateMap;
};

const splitRowsByDate = (rows) => {
  let dateValues = {};
  let sum = 0, count = 0;
  
  for (const row of rows) {
    if (!row) {
      continue;
    }
    const [dateTimeStr, resultStr] = row.split(',', 2);
    // Replace '-' with '/' because Safari
    const dateTime = new Date(
      Date.parse(dateTimeStr.replaceAll('-', '/') + " GMT")
    );
    const dateStr = dateTime.toDateString();

    let resultArray = dateValues[dateStr];
    if (!resultArray) {
      resultArray = [];
      dateValues[dateStr] = resultArray;
      if (dateValues.length > maxDays) {
        break;
      }
    }

    let result = 0;
    if (resultStr?.trim() === 'success') {
      result = 1;
    }
    sum += result;
    count++;

    resultArray.push(result);
  }

  const upTime = count ? ((sum / count) * 100).toFixed(2) : 0;
  dateValues.upTime = upTime;
  return dateValues;
};

const getRelativeDays = (date1, date2) => {
  return Math.floor(Math.abs((date1 - date2) / (24 * 3600 * 1000)));
};

const getDayAverage = (val) => {
  if (!val || !val.length) {
    return null;
  } else {
    return val.reduce((a, v) => a + v) / val.length;
  }
};

export const getDate = relDay => {
  let date = new Date();
  date.setDate(date.getDate() - relDay);
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
