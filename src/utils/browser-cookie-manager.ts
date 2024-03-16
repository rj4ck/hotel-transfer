export const getCookie = (cookieName: string): string | null => {
    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${cookieName}=`))
        ?.split('=')[1];

    return cookieValue ? decodeURIComponent(cookieValue) : null;
};

export const setCookie = (
    name: string,
    data: string | Record<string, unknown>,
    isSession: boolean = false
): void => {
    const cookieExpiration = isSession ? '' : `expires=${getExpirationDate()}`;
    const cookieContent = typeof data === 'string' ? encodeURIComponent(data) : encodeURIComponent(JSON.stringify(data));

    document.cookie = `${name}=${cookieContent};${cookieExpiration};path=/;Secure`;
};

export const removeCookie = (name: string): void => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;Secure`;
};

export const clearCookies = (): void => {
    document.cookie.split(';').forEach((cookie) => {
        const [name] = cookie.split('=');
        removeCookie(name);
    });
    sessionStorage.removeItem('refreshNotification');
    sessionStorage.removeItem('lang');
};

const getExpirationDate = (): string => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    return currentDate.toUTCString();
};
