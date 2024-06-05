import AWS from 'aws-sdk'

import dotenv from 'dotenv'
dotenv.config()

type Params = {
  folder: string
  file: Buffer
  name?: string
  extension: string
  contenType: string
}

function generateUniqueName(extension: string) {
  const currentDate = new Date()
  const timestamp = currentDate.getTime()
  const random = Math.floor(Math.random() * 1000)

  const uniqueName = `${timestamp}_${random}.${extension}`

  return uniqueName
}

export async function uploadFileToS3Bucket(params: Params) {
  const { file, folder, name, extension, contenType } = params
  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })
  const s3 = new AWS.S3()
  const configParams = {
    Bucket: process.env.s3BucketName as string,
    Key: `${folder}${name || generateUniqueName(extension)}`,
    Body: file,
    ContentType: contenType
  }

  // Upload the file to S3
  const data = await s3.upload(configParams).promise()
  return data.Location
}
