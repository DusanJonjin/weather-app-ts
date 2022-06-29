interface TempLowHighProps {
    tempLow: string,
    tempHigh: string,
    dayPage?: boolean
}

const TempLowHigh = ({ tempLow, tempHigh, dayPage=false }: TempLowHighProps) => (
    <div className='temp-lowhigh'>
        <p>{dayPage ? 'Low: ' : ''}<span id='low'>{tempLow}<sup>°C</sup></span></p>
        <p>{dayPage ? 'High: ' : ''}<span id='high'>{tempHigh}<sup>°C</sup></span></p>
    </div>
)

export default TempLowHigh;