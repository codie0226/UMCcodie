export const responseFromUser = (data, pref) => {
    return{
        email: data.email,
        name: data.name,
        preferCategory: pref.name,
    }
};
