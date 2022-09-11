import { Languages } from "../Models/app.data.models";

export const dayDate = (time: number, options: {[key:string]: string | boolean}): string => (
    new Date(time * 1000).toLocaleDateString('en', options)
);


type DaysEN = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

type DaysRS = "Ponedeljak" | "Utorak" | "Sreda" | "Četvrtak" | "Petak" | "Subota" | "Nedelja";

const days: {en: DaysEN; rs: DaysRS}[] = [
    {en: "Monday", rs: "Ponedeljak"},
    {en: "Tuesday", rs: "Utorak"},
    {en: "Wednesday", rs: "Sreda"},
    {en: "Thursday", rs: "Četvrtak"},
    {en: "Friday", rs: "Petak"},
    {en: "Saturday", rs: "Subota"},
    {en: "Sunday", rs: "Nedelja"},
]

type MonthsEN = "January" | "February" | "March" | "April" | "May" | "June" | "July" |
    "August" | "September" | "October" | "November" | "December"
;

type MonthsRS = "Januar" | "Februar" | "Mart" | "April" | "Maj" | "Jun" | "Jul" |
    "Avgust" | "Septembar" | "Oktobar" | "Novembar" | "Decembar"
;

const months: {en: MonthsEN, rs: MonthsRS}[] =[
    {en: "January", rs: "Januar"},
    {en: "February", rs: "Februar"},
    {en: "March", rs: "Mart"},
    {en: "April", rs: "April"},
    {en: "May", rs: "Maj"},
    {en: "June", rs: "Jun"},
    {en: "July", rs: "Jul"},
    {en: "August", rs: "Avgust"},
    {en: "September", rs: "Septembar"},
    {en: "October", rs: "Oktobar"},
    {en: "November", rs: "Novembar"},
    {en: "December", rs: "Decembar"},
];

interface dateObj {
    day: string,
    date: string,
    year: string,
    localTime: string
}

export const dateObj = (time: number, lang?: Languages, timezone?: string): dateObj => {
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
    }

    else {
        day = dayEN;
        date = dateEN;
    }

    let year: string;
    let localTime: string;

    if (completeDateArr.length < 4) {
        const yearAndTimeArr: string[] = completeDateArr[2].split(' ');
        year = yearAndTimeArr[0];
        localTime = yearAndTimeArr[2];
    }
    else {
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