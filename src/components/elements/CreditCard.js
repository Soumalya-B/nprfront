
var parse = require('html-react-parser');

//Months List
export const Months = () => {
    var options = '<option>Month</option>';
    for (let i = 1; i <= 12; i++) {
        options += '<option value="'+ i +'">' + i + '</option>';
    }
    return (
        <>
            {parse(options)}
        </>
    );
}

//Years List
export const Years = () => {
    var start_year = new Date().getFullYear();
    var options = '<option>Year</option>';
    for (var i = start_year; i <= start_year + 10; i++) {
        options += '<option value="'+ i +'">' + i + '</option>';
    }
    return (
        <>
            {parse(options)}
        </>
    );
}
export default {Months, Years};