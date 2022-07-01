import moment from 'moment';

export const DateTime = (value:Date) => {
  return moment(value).format('dddd, MMMM Do YYYY, h:mm:ss a');
}