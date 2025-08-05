import { NextRequest, NextResponse } from 'next/server';
import { DateTime } from 'luxon';

// Pakistan timezone information (static data)
const PAKISTAN_TIMEZONE = {
  country: 'Pakistan',
  countryCode: 'PK',
  timezone: 'Asia/Karachi',
  offset: 18000, // PKT is UTC+5 (18000 seconds)
  regions: [
    { name: 'Islamabad', type: 'Capital Territory' },
    { name: 'Punjab', type: 'Province' },
    { name: 'Sindh', type: 'Province' },
    { name: 'Khyber Pakhtunkhwa', type: 'Province' },
    { name: 'Balochistan', type: 'Province' },
    { name: 'Gilgit-Baltistan', type: 'Administrative Territory' },
    { name: 'Azad Kashmir', type: 'Administrative Territory' }
  ],
  major_cities: [
    'Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Gujranwala',
    'Peshawar', 'Multan', 'Hyderabad', 'Islamabad', 'Quetta'
  ]
};

// Get Pakistan timezone information
function getPakistanTimezone() {
  return {
    ...PAKISTAN_TIMEZONE,
    current_region: PAKISTAN_TIMEZONE.regions[1], // Default to Punjab
    current_city: 'Lahore', // Default to Lahore
    description: 'Pakistan Standard Time (PKT)'
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const simple = searchParams.get('simple') === 'true';
    
    // Get Pakistan timezone data
    const timezoneData = getPakistanTimezone();
    
    // Get current time in Pakistan timezone
    const pakistanTime = DateTime.now().setZone('Asia/Karachi');
    
    if (simple) {
      // Simple, clean response
      const simpleResponse = {
        time: pakistanTime.toFormat('hh:mm:ss a'),
        time_24h: pakistanTime.toFormat('HH:mm:ss'),
        date: pakistanTime.toFormat('EEEE, MMMM dd, yyyy'),
        timezone: 'PKT',
        offset: 'UTC+5',
        country: 'Pakistan',
        city: 'Lahore'
      };
      
      return NextResponse.json(simpleResponse, {
        headers: {
          'Cache-Control': 'public, max-age=1', // 1 second cache
          'Content-Type': 'application/json',
        },
      });
    }
    
    const responseData = {
      country_info: {
        name: timezoneData.country,
        code: timezoneData.countryCode,
        current_region: timezoneData.current_region,
        current_city: timezoneData.current_city
      },
      timezone_info: {
        name: 'Asia/Karachi',
        abbreviation: 'PKT',
        offset_hours: 5,
        description: timezoneData.description,
        dst_observed: false
      },
      current_time: {
        date: pakistanTime.toFormat('EEEE, MMMM dd, yyyy'),
        time_12h: pakistanTime.toFormat('hh:mm:ss a'),
        time_24h: pakistanTime.toFormat('HH:mm:ss'),
        timezone: 'PKT',
        day_of_week: pakistanTime.weekdayLong,
        unix_timestamp: Math.floor(pakistanTime.toSeconds())
      },
      meta: {
        generated_at: new Date().toISOString(),
        timezone_source: 'Built-in Pakistan Standard Time'
      }
    };
    
    if (format === 'text') {
      const textResponse = `🇵🇰 PAKISTAN STANDARD TIME\n` +
        `========================\n\n` +
        `📍 Location: ${timezoneData.current_city}, ${timezoneData.current_region.name}, Pakistan\n` +
        `🌍 Region Type: ${timezoneData.current_region.type}\n` +
        `⏰ Timezone: PKT (UTC+5)\n\n` +
        `📅 CURRENT TIME\n` +
        `=============\n` +
        `📆 Date: ${pakistanTime.toFormat('EEEE, MMMM dd, yyyy')}\n` +
        `🕐 Time (12-hour): ${pakistanTime.toFormat('hh:mm:ss a')}\n` +
        `🕐 Time (24-hour): ${pakistanTime.toFormat('HH:mm:ss')}\n\n` +
        `🏛️ ADMINISTRATIVE INFORMATION\n` +
        `==========================\n` +
        `🔹 Regions: ${timezoneData.regions.map(r => r.name).join(', ')}\n` +
        `🔸 Major Cities: ${timezoneData.major_cities.join(', ')}\n\n` +
        `🚀 Pakistan Time Service v2.0`;
      
      return new NextResponse(textResponse, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=1', // 1 second cache
        }
      });
    }
    
    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'public, max-age=1', // 1 second cache
        'Content-Type': 'application/json',
      },
    });
    
  } catch (error) {
    console.error('Pakistan timezone API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}