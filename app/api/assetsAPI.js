import axios from 'axios';

const API_BASE_URL = 'http://18.218.245.250:8080/'; // Reemplaza con la URL de tu backend

// Crea una instancia personalizada de Axios
const assetsAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Otros encabezados personalizados que desees configurar
  },
});

export const createAsset = async (assetData) => {
  try {
    const response = await assetsAPI.post('/assets', assetData);
    return response;
  } catch (error) {
    console.error('Error creating asset:', error);
    throw error;
  }
};

export const getAssets = async () => {
  try {
    const response = await assetsAPI.get('/assets');
    return response.data;
  } catch (error) {
    console.error('Error getting assets:', error);
    throw error;
  }
};

export const getMyRealEstateAssets = async (userData) => {
  try {
    const response = await assetsAPI.post('/myREassets', userData);
    return response.data;
  } catch (error) {
    console.error('Error getting real estate assets:', error);
    throw error;
  }
};

export const updateAsset = async (assetData, idAsset) => {
  try {
    const response = await assetsAPI.put(`/assets/${idAsset}`, assetData);
    return response.data;
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error;
  }
};

export const deleteAsset = async (assetId) => {
  try {
    const response = await assetsAPI.delete('/assets', {
      data: { id: assetId },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting asset:', error);
    throw error;
  }
};

export const getAssetById = async (assetId) => {
  try {
    const response = await assetsAPI.post('/idAssets', { _id: assetId });
    return response.data;
  } catch (error) {
    console.error('Error getting asset by ID:', error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await assetsAPI.post('/assets/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getMyRealEstateBookings = async (realEstateID) => {
  try {
    const response = await assetsAPI.post('/assets/bookings/realEstate', realEstateID);
    return response.data;
  } catch (error) {
    console.error('Error getting real estate assets:', error);
    throw error;
  }
};

export const getFilteredAssets = async (assetId,transaction, assetType, coin, nRooms, minPrice, maxPrice, nBedrooms, nBaths, nGarage, mTotal, amenities, year) => {
  try {
    const response = await assetsAPI.post('/assets/filter', { _id: assetId, transaction, assetType, coin, nRooms, minPrice, maxPrice, nBedrooms, nBaths, nGarage, mTotal, amenities, year });
    return response.data;
  } catch (error) {
    console.error('Error getting filter asset', error);
    throw error;
  }
};

