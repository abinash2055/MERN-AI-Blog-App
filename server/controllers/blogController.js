import fs from "fs";
import imageKit from "../configs/imageKit.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;

    // Check if all firlds are present
    if (!title || !description || !category || !imageFile) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.parse);

    // Upload image to imagekit
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalName,
      folder: "/blogs",
    });
  } catch (error) {}
};
