import axios from 'axios';
import envConfig from './envConfig';

let apiUrl = envConfig.API_URL;

interface INonceSignResponse {
  nonce: string;
  signature: string;
}

export const checkCommunityWhitelist = async (
  address: string
): Promise<Boolean> => {
  try {
    const response = await axios.get(
      `${apiUrl}/whitelist/whitelistCommunity/info?address=${address}`
    );

    const { isWhitelisted } = response.data.data;

    return isWhitelisted;
  } catch (error) {
    return false;
  }
};

export const checkChiefToadWhitelist = async (
  address: string
): Promise<Boolean> => {
  try {
    const response = await axios.get(
      `${apiUrl}/whitelist/whitelistChiefToad/info?address=${address}`
    );

    const { isWhitelisted } = response.data.data;

    return isWhitelisted;
  } catch (error) {
    return false;
  }
};

export const checkRizardWhitelist = async (
  address: string
): Promise<Boolean> => {
  try {
    const response = await axios.get(
      `${apiUrl}/whitelist/whitelistChiefRizard/info?address=${address}`
    );

    const { isWhitelisted } = response.data.data;

    return isWhitelisted;
  } catch (error) {
    return false;
  }
};

export const getCommunityWhitelistSignature = async (
  address: string
): Promise<INonceSignResponse> => {
  try {
    const response = await axios.get(
      `${apiUrl}/signing/community/sign?address=${address}`
    );
    const { nonce, signature } = response.data.data;
    return { nonce, signature };
  } catch (error) {
    return { nonce: '', signature: '' };
  }
};

export const getChiefToadWhitelistSignature = async (
  address: string
): Promise<INonceSignResponse> => {
  try {
    const response = await axios.get(
      `${apiUrl}/signing/chieftoad/sign?address=${address}`
    );
    const { nonce, signature } = response.data.data;
    return { nonce, signature };
  } catch (error) {
    return { nonce: '', signature: '' };
  }
};

export const getChiefRizardWhitelistSignature = async (
  address: string
): Promise<INonceSignResponse> => {
  try {
    const response = await axios.get(
      `${apiUrl}/signing/chiefrizard/sign?address=${address}`
    );
    const { nonce, signature } = response.data.data;
    return { nonce, signature };
  } catch (error) {
    return { nonce: '', signature: '' };
  }
};
