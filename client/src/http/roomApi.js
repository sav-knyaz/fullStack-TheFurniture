import { $autHost } from ".";

export const createRoom = async (formData)=>{
      const {data} = await $autHost.post('http://localhost:5040/api/room/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      });
      return data
};
export const deleteRoom = async (name)=>{
    const {data} = await $autHost.delete('http://localhost:5040/api/room/delete', {data:{name}});
    return data
};
export const changesRoom = async (name, typeRoomId)=>{
    const {data} = await $autHost.post('http://localhost:5040/api/room/changes', {name, typeRoomId});
    return data
};
export const createTypeRoom = async (name)=>{
    const {data} = await $autHost.post('http://localhost:5040/api/room/createType', {name});
    return data
};
export const deleteTypeRoom = async (name)=>{
    const {data} = await $autHost.delete('http://localhost:5040/api/room/deleteType', {data:{name}});
    return data
};
export const changesTypeRoom = async (name, id)=>{
    const {data} = await $autHost.post('http://localhost:5040/api/room/changesType', {name: name, id: id});
    return data
};
export const fetchTypeRoom = async ()=>{
    const {data} = await $autHost.get('http://localhost:5040/api/room/type/');
    return data
};
export const fetchAllRooms = async ()=>{
    const {data} = await $autHost.get('http://localhost:5040/api/room/');
    return data
};
export const fetchOneRoom = async (id)=>{
    const {data} = await $autHost.get(`http://localhost:5040/api/room/${id}`);
    return data
};