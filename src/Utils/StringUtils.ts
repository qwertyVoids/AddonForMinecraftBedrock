export default class StringUtils {
    private constructor() {}

    public static getPlural(value: number, one: string, two: string, five: string): string {
        const absoluteValue: number = Math.abs(value);
        const mod100: number = absoluteValue % 100;
        const mod10: number = absoluteValue % 10;

        if (mod100 >= 11 && mod100 <= 14) {
            return five;
        }

        if (mod10 === 1) {
            return one;
        }

        if (mod10 >= 2 && mod10 <= 4) {
            return two;
        }

        return five;
    }
}