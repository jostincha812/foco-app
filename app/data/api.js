const data = [
  { id: 'AA', name: 'American Airlines', country: 'United States', code: '001', icao: 'AAL' },
  { id: 'CX', name: 'Cathay Pacific', country: 'Hong Kong SAR', code: '160', icao: 'CPA' },
  { id: 'KA', name: 'Cathay Dragon', country: 'Hong Kong SAR', code: '043', icao: 'HDA' },
  { id: 'AC', name: 'Air Canada', country: 'Canada', code: '014', icao: 'ACA' },
  { id: 'CA', name: 'Air China', country: 'China', code: '999', icao: 'CCA' },
  { id: 'AF', name: 'Air France', country: 'France', code: '057', icao: 'AFR' },
  { id: 'TS', name: 'Air Transat', country: 'Canada', code: '649', icao: 'TSC' },
  { id: 'FX', name: 'Federal Express', country: 'United States', code: '023', icao: 'FDX' },
  { id: 'HU', name: 'Hainan Airlines', country: 'China', code: '880', icao: 'HHN' },
  { id: 'HX', name: 'Hong Kong Airlines', country: 'Hong Kong SAR', code: '851', icao: 'CRK' },
  { id: 'JL', name: 'Japan Airlines', country: 'Japan', code: '131', icao: 'JAL' },
  { id: 'BR', name: 'EVA Air', country: 'Chinese Taipei', code: '695', icao: 'EVA' },
]

export default () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(data)
    }, 3000)
  })
}
