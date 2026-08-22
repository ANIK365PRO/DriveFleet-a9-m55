import { serverFetch } from "../core/server";


export const getMyCars = async (ownerEmail) => {
    return serverFetch(`/api/car?ownerEmail=${ownerEmail}`);
}