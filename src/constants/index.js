export const FORECAST_URL = 'https://api.darksky.net/forecast';
export const FORECAST_API_KEY = '7634665bd78e6d0187d1b2266857a5c0';

const USDA_API_KEY = '4EF63E1C-B1DB-3A0F-8C70-CA69826694CD';
const YEAR = '2016';
const CROP = 'SOYBEANS';
export const USDA_URL = `https://quickstats.nass.usda.gov/api/api_GET/?key=${USDA_API_KEY}&format=json&year=${YEAR}&commodity_desc=${CROP}&statisticcat_desc=PRODUCTION&agg_level_desc=COUNTY&unit_desc=BU&prodn_practice_desc=ALL+PRODUCTION+PRACTICES&reference_period_desc=YEAR`;
