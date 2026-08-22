import { serverMutation } from "../core/server";



//  /* 'POST' car info :
export const createNewCarPost = async (newCarData) => {
    return serverMutation('/api/car', newCarData);
}


// /* 'DELETE' car info:
export const deleteCarPost = async (id, ownerEmail) => {
    return serverMutation( `/api/car/${id}`, { ownerEmail }, "DELETE" );
};