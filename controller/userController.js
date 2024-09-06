import prisma from "../DB/dbConfig.js"; 

export const createUser = async (req, res) => {
  const { data } = req.body;

  try {
    const newUser = await prisma.users1.create({  
      data: {
        data: data, 
      },
    });

    return res.status(200).json({ data: newUser, message: "User Created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await prisma.users1.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  const { pageNum = 1, pageSize = 50 } = req.query;

  try {
    const users = await prisma.users1.findMany({
      skip: (pageNum - 1) * pageSize,
      take: parseInt(pageSize),
    });

    const totalCount = await prisma.users1.count();

    return res.status(200).json({
      data: {
        users,
        count: totalCount,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { data } = req.body;

  try {
    const updatedUser = await prisma.users1.update({
      where: { id: userId },
      data: {
        data: data,
      },
    });

    return res.status(200).json({ data: updatedUser, message: "User Updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeUser = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    await prisma.users1.delete({
      where: { id: userId },
    });

    return res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




