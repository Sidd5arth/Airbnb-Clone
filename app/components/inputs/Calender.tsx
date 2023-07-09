'use client'

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalenderProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[]
}

const Calender:React.FC <CalenderProps> = ({
    value,
    onChange,
    disabledDates
}) => {
    return ( 
        <DateRange
        />
     );
}
 
export default Calender;