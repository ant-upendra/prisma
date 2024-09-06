import prisma from "../DB/dbConfig.js"; 
import adminHelper from "../helper/adminHelper.js";

export async function addNewAdminHandler(input) {
  return await adminHelper.addObject(input); 
}
export async function getAdminDetailsHandler(id) {
  return await adminHelper.getObjectById(id);
}

export async function updateAdminDetailsHandler({ objectId, updateObject }) {
  return await adminHelper.updateObject(objectId, updateObject);
}

export async function deleteAdminHandler(id) {
  return await adminHelper.deleteObjectById(id);
}
export async function getAdminListHandler(input) {
  const list = await adminHelper.getAllObjects(input);
  const count = await adminHelper.getAllObjectCount(input);
  return { list, count };
}