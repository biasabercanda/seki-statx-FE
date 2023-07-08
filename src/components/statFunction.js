export function calculateStatistics(data) {
    // Mean
    const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
  
    // Median
    const sortedData = data.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedData.length / 2);
    const median = sortedData.length % 2 === 0
      ? (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2
      : sortedData[middleIndex];
  
    
    
  
    // Range
    const range = Math.max(...data) - Math.min(...data);
  
    // Variance
    const squaredDifferences = data.map((value) => Math.pow(value - mean, 2));
    const variance = squaredDifferences.reduce((sum, value) => sum + value, 0) / data.length;
  
    // Standard Deviation
    const standardDeviation = Math.sqrt(variance);
  
    // Maximum and Minimum Values
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);

    const coefVariation = (standardDeviation/mean)*100

    
  
    return {
      mean,
      median,
      range,
      variance,
      standardDeviation,
      maxValue,
      minValue,
      coefVariation
    };
  }
  
