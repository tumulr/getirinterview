export class DateValidator {
    static validate(dateString: string): boolean {
        let dateArr = dateString.split('-');

        if (dateArr.length !== 3) {
            return false;
        }

        if (Number(dateArr[0]) < 1000 || Number(dateArr[0]) > 9999) {
            return false;
        }

        if (Number(dateArr[1]) < 1 || Number(dateArr[1]) > 12) {
            return false;
        }

        if (Number(dateArr[2]) < 1 || Number(dateArr[2]) > 31) {
            return false;
        }

        if (Number(dateArr[1]) == 2 && Number(dateArr[2]) > 28) {
            return false;
        }

        return true;
    }
}
