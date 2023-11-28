import AWS from 'aws-sdk'
import { v4 } from 'uuid'
export const getSignedUrlAws = async (folder:string, fileType:string, formatType: string, fileName: string, accessKeyId: string, secretAccessKey: string, awsRegion: string, bucketName: string) => {
  try {
    AWS.config.update({
      accessKeyId,
      secretAccessKey,
      signatureVersion: 'v4',
      region: awsRegion
    })
    const s3 = new AWS.S3()
    const pathAws = `${folder}/${fileName.replace(/ /g, '-')}-${v4()}.${formatType}`
    const urlToSignAws = await s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      ContentType: `${fileType}/${formatType}`,
      Key: pathAws

    })
    console.log(fileType, formatType)
    return { pathAws, urlToSignAws }
  } catch (error) {
  }
}

// static async deleteDocAws (urlPath:string) {
//   try {
//     const response = await s3.deleteObject({
//       Bucket: configData.bucketName,
//       Key: urlPath
//     }).promise()
//     return response
//   } catch (error) {
//     throw new Error('aws')
//   }
// }
