export const dayDate = (time: number, options: {[key:string]: string | boolean}): string => (
    new Date(time * 1000).toLocaleDateString('en', options)
);

interface dateObj {
    day: string,
    date: string,
    year: string,
    localTime: string
}

export const dateObj = (time: number, timezone?: string): dateObj => {
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

   //Firefox and Chrome don't return the same Locale string for the date

    const completeDateArr: string[] = completeDateString.split(', ');

    const day = completeDateArr[0];
    const dateUSA = completeDateArr[1];

    const dateUSAarr: string[] = dateUSA.split(' ');
    const date = `${dateUSAarr[1]} ${dateUSAarr[0]}`

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