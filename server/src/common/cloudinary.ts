import fs from "node:fs";
import config from "@/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: config.getOrThrow("cloudinary.name"),
  api_key: config.getOrThrow("cloudinary.api_key"),
  api_secret: config.getOrThrow("cloudinary.api_secret"),
});

class Cloudinary {
  public async upload(filePath: string) {
    try {
      // file upload on cloudinary server
      const res = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
      });
      return res;
    } catch (error) {
      fs.unlinkSync(filePath); // remove the locally saved temporary file as the upload operation get failed
    }
  }

  public async update(public_id: string, filePath: string) {
    try {
      // file upload on cloudinary server
      const res = await cloudinary.uploader.upload(filePath, {
        public_id,
        resource_type: "auto",
      });
      return res;
    } catch (error) {
      fs.unlinkSync(filePath); // remove the locally saved temporary file as the upload operation get failed
    }
  }

  public async destroy(public_id: string) {
    return await cloudinary.uploader.destroy(public_id); // delete the image from cloudinary server using the public id of the image
  }
}

export default new Cloudinary();
