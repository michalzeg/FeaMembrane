const tolerane = 0.0000001;

export function isApproximatelyEqualTo(value1: number, value2: number) {
    const result = Math.abs(value2 - value1) < tolerane;
    return result;
}
