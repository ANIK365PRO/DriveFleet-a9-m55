import { serverMutation } from "../core/server";



//  /* 'POST' car info :
export const createNewCarPost = async (newCarData) => {
    return serverMutation('/api/car', newCarData);
}
