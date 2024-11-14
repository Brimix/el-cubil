import {BUCKET_PATH, PUBLIC_URL, UPLINK_URL} from './constants';

export const saveToCloud = (content: unknown, name: string) => {
  const tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
    scope: 'https://www.googleapis.com/auth/devstorage.read_write',
    callback: async (tokenResponse: google.accounts.oauth2.TokenResponse) => {
      if (tokenResponse.error) {
        console.error('Token Response Error:', tokenResponse.error);
        alert('Failed to obtain access token.');
        return;
      }

      const accessToken = tokenResponse.access_token;
      const contentJson = JSON.stringify(content);
      const uploadUrl = `${UPLINK_URL}${BUCKET_PATH}o?uploadType=media&name=${encodeURIComponent(name)}`;

      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: contentJson,
      });

      if (response.ok) {
        alert('Se han guardado los cambios');
      } else {
        const errorData = await response.json();
        console.error('Error uploading catalog:', errorData);
        alert('Falló el guardado. Avisale a Bri a ver que ondis');
      }
    },
  });

  tokenClient.requestAccessToken();
};

export const saveImageToCloud = async (file: File, imageName: string): Promise<string> => {
  try {
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
      scope: 'https://www.googleapis.com/auth/devstorage.read_write',
      callback: (tokenResponse: google.accounts.oauth2.TokenResponse) => {
        if (tokenResponse.error) {
          console.error('Token Response Error:', tokenResponse.error);
          alert('Failed to obtain access token.');
          return;
        }
      },
    });

    // Request an access token
    tokenClient.requestAccessToken();

    // Wait for the token to be available
    const accessToken = await new Promise<string>((resolve, reject) => {
      tokenClient.callback = (tokenResponse) => {
        if (tokenResponse.error) {
          reject(tokenResponse.error);
        } else {
          resolve(tokenResponse.access_token);
        }
      };
    });

    // Prepare the upload URL
    const uploadUrl = `${UPLINK_URL}${BUCKET_PATH}o?uploadType=media&name=${encodeURIComponent(imageName)}`;

    // Upload the image file
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': file.type,
      },
      body: file,
    });

    if (response.ok) {
      alert('Imagen subida correctamente');
    } else {
      const errorData = await response.json();
      console.error('Error uploading catalog:', errorData);
      alert('Falló la subida. Avisale a Bri a ver que ondis');
      throw new Error(`Upload failed: ${errorData.error.message}`);
    }

    // Construct the public URL of the uploaded image
    const imageUrl = `${PUBLIC_URL}${BUCKET_PATH}${encodeURIComponent(imageName)}`;
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
