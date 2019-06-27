import pickBy from 'lodash/pickBy';
import qs from 'querystring';


export function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }
  


export function setNormalized(dispatch, data) {
    Object.keys(data).forEach(key => {
        dispatch({
            type: `SET_${key}_SUCCESS`,
            payload: data[key]
        });
    });
}

export function stringify(params = {}) {
    const results = qs.stringify(pickBy(params));
    if (!Object.values(results).length) return '';
    return '?' + results;
}
