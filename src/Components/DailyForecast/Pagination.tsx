import { Link } from 'react-router-dom';

interface DateObj {
    fullDate: string;
    day: string;
    date: string;
    year: string;
    localTime: string;
}

interface PaginationProps {
    clickedDate: string;
    allDailyDatesArr: DateObj[];
    city: string;
}

const Pagination = (props: PaginationProps) => {
    const { clickedDate, allDailyDatesArr, city } = props;

    const secondForecastedDate = allDailyDatesArr[2].fullDate;

    const prevAndNextDates = allDailyDatesArr.reduce<DateObj[]>((acc, dateObj, i, arr) => {
        if (clickedDate === dateObj.fullDate) {
            if (i === 0) return acc; //today's date object is the first one in array
            if (i === 1) return [...acc, arr[i + 1]];
            if (i === arr.length - 1) return [...acc, arr[i - 1]];
            return [...acc, arr[i - 1], arr[i + 1]]
        }
        else return acc
    }, []); 

    const showLeftOrRightArrow = (fullDate: string, i: number, arrLength: number) => {
        const leftRightArrow = (arrow: string, rightArrow: string) => {
            return <p className={`lr-arrow ${rightArrow}`}>{arrow}</p>
        };
        if (i === 0) {
            if (arrLength < 2 && fullDate === secondForecastedDate) return leftRightArrow('>', 'right-arrow');
            else return leftRightArrow('<', '');
        }
        return leftRightArrow('>', 'right-arrow');
    }

    return (
        <section className='pagination'>
            {prevAndNextDates.map((dateObj, i, arr) =>
                <Link key={dateObj.fullDate} 
                    to={`/DailyForecast/${city}_${dateObj.fullDate}`}
                    className='link'
                >
                    <div className='prev-next-button'>
                        {showLeftOrRightArrow(dateObj.fullDate, i, arr.length)}
                        <div>
                            <p>{dateObj.day}</p>
                            <p>{dateObj.date}</p>
                        </div>
                    </div>
                </Link>
            )}
        </section>
    )
}

export default Pagination;
