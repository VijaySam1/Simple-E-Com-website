// import {
//   FileInterceptor,
//   FilesInterceptor,
//   FileFieldsInterceptor,
//   AnyFilesInterceptor
// } from '@nestjs/platform-express';
// import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { ApiBody, ApiConsumes } from '@nestjs/swagger';
// import { S3 } from 'aws-sdk';
// import sharp from 'sharp';

// @Controller('upload')
// export class UploadController {
//   private s3: S3;

//   constructor() {
//     this.s3 = new S3({
//       accessKeyId: '<your access key>',
//       secretAccessKey: '<your secret key>',
//       region: '<your region>'
//     });
//   }

//   @Post()
//   @UseInterceptors(FileInterceptor('image'))
//   async upload(@UploadedFile() file) {
//     // resize the image
//     const resized = await sharp(file.buffer)
//       .resize(800, 600)
//       .toBuffer();
//     // upload the image to S3
//     const params = {
//       Bucket: '<your bucket name>',
//       Key: 'resized.jpg',
//       Body: resized
//     };
//     await this.s3.upload(params).promise();
//     return {
//       message: 'Image uploaded and resized successfully!',
//       url: '<your resized image url>'
//     };
//   }
// }
