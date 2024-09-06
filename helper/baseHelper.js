import prisma from "../DB/dbConfig.js";


class BaseHelper {
  constructor(model) {
    this.model = model;
  }

  async addObject(obj) {
    try {
      const result = await prisma[this.model].create({
        data: obj,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

    async getObjectById(id) {
    try {
      return await prisma[this.model].findUnique({
        where: { id: id }
      });
    } catch (error) {
      throw error;
    }
  }
  async updateObject(objectId, updateObject) {
  try {
    return await prisma[this.model].update({
      where: { id: objectId },  
      data: {
        data: updateObject 
      }
    });
  } catch (error) {
    throw error;
  }
  }
    async deleteObjectById(objectId) {
    try {
      return await prisma[this.model].delete({
        where: { id: objectId }
      });
    } catch (error) {
      throw error;
    }
    }
async getAllObjects(filters) {
  try {
    // Destructure filters to get pagination and search criteria
    const { query = {}, pageNum = 1, pageSize = 50 } = filters;
    
    // Calculate offset based on page number and page size
    const offset = (pageNum - 1) * pageSize;
    
    return await prisma[this.model].findMany({
      where: query,   // Apply filters for searching
      skip: offset,   // Skip records based on pagination
      take: pageSize  // Limit the number of records per page
    });
  } catch (error) {
    throw error;
  }
}
async getAllObjectCount(filters) {
  try {
    // Destructure filters to get search criteria
    const { query = {} } = filters;
    
    return await prisma[this.model].count({
      where: query   // Apply filters for counting
    });
  } catch (error) {
    throw error;
  }
}


}
export default BaseHelper;