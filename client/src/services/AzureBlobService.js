/**
 * Azure Blob Storage Service
 * 
 * This service handles uploading product images to Azure Blob Storage.
 * It includes methods for uploading files, generating SAS tokens, and
 * handling the connection to Azure.
 */

// Note: You'll need to install the Azure Storage Blob client library:
// npm install @azure/storage-blob

import { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } from "@azure/storage-blob";

class AzureBlobService {
  constructor() {
    // Replace with your actual Azure Storage account details
    this.accountName = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT_NAME || '';
    this.accountKey = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT_KEY || '';
    this.containerName = process.env.REACT_APP_AZURE_STORAGE_CONTAINER_NAME || 'product-images';
    
    // Create a storage credential
    this.sharedKeyCredential = new StorageSharedKeyCredential(
      this.accountName,
      this.accountKey
    );
    
    // Create the Blob Service Client
    this.blobServiceClient = new BlobServiceClient(
      `https://${this.accountName}.blob.core.windows.net`,
      this.sharedKeyCredential
    );
  }
  
  /**
   * Uploads a file to Azure Blob Storage
   * @param {File} file - The file to upload
   * @param {string} fileName - The name to give the file in Azure (can include folder structure)
   * @returns {Promise<string>} - URL of the uploaded file
   */
  async uploadFile(file, fileName) {
    try {
      // Get a reference to the container
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      
      // Create the container if it doesn't exist
      await containerClient.createIfNotExists({
        access: 'blob' // This sets the container to public access
      });
      
      // Generate a unique file name to avoid collisions
      const uniqueFileName = `${Date.now()}-${fileName}`;
      
      // Get a block blob client
      const blockBlobClient = containerClient.getBlockBlobClient(uniqueFileName);
      
      // Upload the file
      await blockBlobClient.uploadData(file);
      
      // Return the URL
      return blockBlobClient.url;
    } catch (error) {
      console.error('Error uploading file to Azure Blob Storage:', error);
      throw error;
    }