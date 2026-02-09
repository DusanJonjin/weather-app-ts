import { LanguageCode } from "../Models/app.data.models";
import { days, months } from "../Fixtures/translation.objects";

export const dayDate = (time: number, options: {[key:string]: string | boolean}): string => (
    new Date(time * 1000).toLocaleDateString('en', options)
);

interface dateObj {
    day: string,
    date: string,
    year: string,
    localTime: string
}

export const dateObj = (time: number, lang?: LanguageCode, timezone?: string): dateObj => {
    const completeDateString: string = new Date(time * 1000).toLocaleDateString('en',
        {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: timezone
        }
    );

   //Web browsers don't return the same Locale string for the date
    const completeDateArr: string[] = completeDateString.split(', ');

    const dayEN = completeDateArr[0];
    const dateUSAFormat = completeDateArr[1];

    const dateUSAFormatArr: string[] = dateUSAFormat.split(' ');
    const dateNum = dateUSAFormatArr[1];
    const monthNameEN = dateUSAFormatArr[0];
    const dateEN = `${dateNum} ${monthNameEN}`;

    let day: string;
    let date: string;

    if (lang && lang !== "en") {
        const dayLangObj = days.find(day => day.en === dayEN);
        const dayLang = dayLangObj ? dayLangObj[lang] : dayEN;
        day = dayLang;

        const monthLangObj = months.find(month => month.en === monthNameEN);
        const monthLang = monthLangObj ? monthLangObj[lang] : monthNameEN;
        date = `${dateNum} ${monthLang}`;
    } else {
        day = dayEN;
        date = dateEN;
    }

    let year: string;
    let localTime: string;

    if (completeDateArr.length < 4) {
        const yearAndTimeArr: string[] = completeDateArr[2].split(' ');
        year = yearAndTimeArr[0];
        localTime = yearAndTimeArr[2];
    } else {
        year = completeDateArr[2];
        localTime = completeDateArr[3]
    }

    return {
        day, date, year, localTime
    }
};


/* With this function we return an hour of a day (converted to
2-digit hours from miliseconds),based on parameter. We need to
use regEx to get the wanted value: */
export const getHour = (time: number, timezone: string): string => {
    const dateHour = new Date(time * 1000).toLocaleDateString(
        'en', {hour:'2-digit', hour12: false, timeZone: timezone}
    );
    const hourAll: string[] | null = dateHour.match(/(?<=, ).*/);
    const justHour = hourAll !== null ? hourAll[0] : ''
    if (justHour === '24') return '00';
    return justHour;
};

/* We use this function to filter out hourly array
(only PAIR hours of a day (24h) will be shown): 
const filterPairHours = dayHours => (
    dayHours.filter(h => !(getHours(h) % 2))
);*/