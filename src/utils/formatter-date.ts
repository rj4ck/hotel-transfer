export default (date: Date, alterText: string) => {
    return date ? new Date(date).toLocaleDateString( 'en-US', {
        month: 'short',
        day: '2-digit',
    }) : alterText;
};

export const stringDateFormat = (date: Date) => {
    const _date = new Date(date);

    _date.setUTCHours(0);
    _date.setUTCMinutes(0);
    _date.setUTCSeconds(0);
    _date.setUTCMilliseconds(0);

    _date.setUTCHours(12);

    const year = _date.getUTCFullYear();
    const month = (_date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = _date.getUTCDate().toString().padStart(2, '0');
    const hour = _date.getUTCHours().toString().padStart(2, '0');
    const minute = _date.getUTCMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${minute}:00`;
}
