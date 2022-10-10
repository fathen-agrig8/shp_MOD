var roi = ee.FeatureCollection("projects/ee-fathen/assets/FieldsCropMonitoring_contours_07Sep2022");

var ndvi = ee.ImageCollection('MODIS/061/MOD13Q1')
                  .select('NDVI')
                  .filterBounds(roi)
                  .filter(ee.Filter.date('2022-03-23', '2022-04-08'))
                  .mean()
                  .clip(roi);

var ndviVis = {
  min: 0.0,
  max: 8000.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};

Map.setCenter(96.13957, 19.70263, 13);
Map.addLayer(ndvi, ndviVis, 'NDVI');

Export.image.toDrive({
  image: ndvi,
  description: 'MOD22_500m',
  region: roi,
  scale: 500,
  maxPixels: 1e9
});
