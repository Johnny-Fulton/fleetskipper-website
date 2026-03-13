/**
 * SeaReady Website Analytics Reporter
 *
 * Pulls data from Google Analytics 4 and generates reports
 * Uses OAuth credentials from Business folder
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const fs = require('fs');
const path = require('path');

// GA4 Property ID (from Google Analytics Admin)
const PROPERTY_ID = '522092000'; // Correct property ID (not derived from measurement ID)

// Load OAuth credentials
const CREDENTIALS_PATH = '/Users/jonathanfulton/Business/credentials/ga4_token.json';
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

// Initialize Analytics Data Client with OAuth
const { GoogleAuth } = require('google-auth-library');

const auth = new GoogleAuth({
  credentials: {
    client_id: credentials.client_id,
    client_secret: credentials.client_secret,
    refresh_token: credentials.refresh_token,
    type: 'authorized_user',
  },
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});

const analyticsDataClient = new BetaAnalyticsDataClient({ auth });

/**
 * Get website traffic summary for a date range
 */
async function getTrafficSummary(startDate = '7daysAgo', endDate = 'today') {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'date' },
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'newUsers' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
    });

    return formatTrafficSummary(response);
  } catch (error) {
    console.error('Error fetching traffic summary:', error.message);
    throw error;
  }
}

/**
 * Get top pages by views
 */
async function getTopPages(startDate = '7daysAgo', endDate = 'today', limit = 10) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'pageTitle' },
        { name: 'pagePath' },
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
      ],
      orderBys: [
        {
          metric: {
            metricName: 'screenPageViews',
          },
          desc: true,
        },
      ],
      limit,
    });

    return formatTopPages(response);
  } catch (error) {
    console.error('Error fetching top pages:', error.message);
    throw error;
  }
}

/**
 * Get traffic sources
 */
async function getTrafficSources(startDate = '7daysAgo', endDate = 'today') {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'sessionDefaultChannelGroup' },
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
      ],
      orderBys: [
        {
          metric: {
            metricName: 'sessions',
          },
          desc: true,
        },
      ],
    });

    return formatTrafficSources(response);
  } catch (error) {
    console.error('Error fetching traffic sources:', error.message);
    throw error;
  }
}

/**
 * Get conversion events (demo requests, form submissions)
 */
async function getConversions(startDate = '7daysAgo', endDate = 'today') {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'eventName' },
      ],
      metrics: [
        { name: 'eventCount' },
      ],
      dimensionFilter: {
        orGroup: {
          expressions: [
            {
              filter: {
                fieldName: 'eventName',
                stringFilter: {
                  matchType: 'EXACT',
                  value: 'demo_request',
                },
              },
            },
            {
              filter: {
                fieldName: 'eventName',
                stringFilter: {
                  matchType: 'EXACT',
                  value: 'contact_form_submit',
                },
              },
            },
          ],
        },
      },
    });

    return formatConversions(response);
  } catch (error) {
    console.error('Error fetching conversions:', error.message);
    // Return empty if no conversions yet
    return { demo_requests: 0, contact_forms: 0 };
  }
}

// Formatting functions
function formatTrafficSummary(response) {
  if (!response.rows || response.rows.length === 0) {
    return {
      sessions: 0,
      users: 0,
      newUsers: 0,
      pageViews: 0,
      bounceRate: 0,
      avgSessionDuration: 0,
    };
  }

  // Sum up all rows
  let totalSessions = 0;
  let totalUsers = 0;
  let totalNewUsers = 0;
  let totalPageViews = 0;
  let totalBounceRate = 0;
  let totalAvgDuration = 0;

  response.rows.forEach(row => {
    totalSessions += parseInt(row.metricValues[0].value) || 0;
    totalUsers += parseInt(row.metricValues[1].value) || 0;
    totalNewUsers += parseInt(row.metricValues[2].value) || 0;
    totalPageViews += parseInt(row.metricValues[3].value) || 0;
    totalBounceRate += parseFloat(row.metricValues[4].value) || 0;
    totalAvgDuration += parseFloat(row.metricValues[5].value) || 0;
  });

  // Average bounce rate and duration
  const numDays = response.rows.length;
  const avgBounceRate = totalBounceRate / numDays;
  const avgDuration = totalAvgDuration / numDays;

  return {
    sessions: totalSessions,
    users: totalUsers,
    newUsers: totalNewUsers,
    pageViews: totalPageViews,
    bounceRate: (avgBounceRate * 100).toFixed(1) + '%',
    avgSessionDuration: formatDuration(avgDuration),
  };
}

function formatTopPages(response) {
  if (!response.rows || response.rows.length === 0) {
    return [];
  }

  return response.rows.map(row => ({
    title: row.dimensionValues[0].value,
    path: row.dimensionValues[1].value,
    views: parseInt(row.metricValues[0].value),
    avgDuration: formatDuration(parseFloat(row.metricValues[1].value)),
  }));
}

function formatTrafficSources(response) {
  if (!response.rows || response.rows.length === 0) {
    return [];
  }

  return response.rows.map(row => ({
    source: row.dimensionValues[0].value,
    sessions: parseInt(row.metricValues[0].value),
    users: parseInt(row.metricValues[1].value),
  }));
}

function formatConversions(response) {
  const conversions = {
    demo_requests: 0,
    contact_forms: 0,
  };

  if (!response.rows || response.rows.length === 0) {
    return conversions;
  }

  response.rows.forEach(row => {
    const eventName = row.dimensionValues[0].value;
    const count = parseInt(row.metricValues[0].value);

    if (eventName === 'demo_request') {
      conversions.demo_requests = count;
    } else if (eventName === 'contact_form_submit') {
      conversions.contact_forms = count;
    }
  });

  return conversions;
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}m ${secs}s`;
}

/**
 * Generate a complete weekly report
 */
async function generateWeeklyReport() {
  console.log('📊 Generating Weekly Analytics Report...\n');

  const traffic = await getTrafficSummary('7daysAgo', 'today');
  const topPages = await getTopPages('7daysAgo', 'today', 5);
  const sources = await getTrafficSources('7daysAgo', 'today');
  const conversions = await getConversions('7daysAgo', 'today');

  console.log('='.repeat(60));
  console.log('SEAREADY WEBSITE - WEEKLY ANALYTICS REPORT');
  console.log('Period: Last 7 Days');
  console.log('='.repeat(60));
  console.log('');

  console.log('📈 TRAFFIC SUMMARY');
  console.log('─'.repeat(60));
  console.log(`Sessions:            ${traffic.sessions}`);
  console.log(`Users:               ${traffic.users} (${traffic.newUsers} new)`);
  console.log(`Page Views:          ${traffic.pageViews}`);
  console.log(`Bounce Rate:         ${traffic.bounceRate}`);
  console.log(`Avg Session:         ${traffic.avgSessionDuration}`);
  console.log('');

  console.log('🎯 CONVERSIONS');
  console.log('─'.repeat(60));
  console.log(`Demo Requests:       ${conversions.demo_requests}`);
  console.log(`Contact Forms:       ${conversions.contact_forms}`);
  console.log('');

  console.log('📄 TOP PAGES');
  console.log('─'.repeat(60));
  topPages.forEach((page, i) => {
    console.log(`${i + 1}. ${page.title}`);
    console.log(`   ${page.path}`);
    console.log(`   ${page.views} views | Avg time: ${page.avgDuration}`);
    console.log('');
  });

  console.log('🚀 TRAFFIC SOURCES');
  console.log('─'.repeat(60));
  sources.forEach(source => {
    console.log(`${source.source}: ${source.sessions} sessions (${source.users} users)`);
  });
  console.log('');

  console.log('='.repeat(60));
  console.log('Report generated:', new Date().toLocaleString());
  console.log('='.repeat(60));

  return {
    traffic,
    topPages,
    sources,
    conversions,
    generatedAt: new Date().toISOString(),
  };
}

// Export functions for use in other scripts
module.exports = {
  getTrafficSummary,
  getTopPages,
  getTrafficSources,
  getConversions,
  generateWeeklyReport,
};

// If run directly, generate weekly report
if (require.main === module) {
  generateWeeklyReport()
    .then(() => {
      console.log('✅ Report complete!');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Error generating report:', error.message);
      process.exit(1);
    });
}
