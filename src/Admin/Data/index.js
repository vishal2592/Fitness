export { default as gymData } from "./gymData";
export { default as yogaData } from "./yogaData";


export const getAdminData = (mode) => {

    if (mode === "gym") {
        return gymData;
    }

    return yogaData;

};