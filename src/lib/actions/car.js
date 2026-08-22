import { serverMutation } from "../core/car";



//  /* 'POST' car info :
export const createNewCarPost = async (newCarData) => {
    return serverMutation('/api/car', newCarData);
}
