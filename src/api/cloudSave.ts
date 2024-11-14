export const BUCKET_NAME = 'elcubil-cloud';

export const saveToCloud = (content: unknown, name: string) => {
  const tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
    scope: 'https://www.googleapis.com/auth/devstorage.read_write',
    callback: async (tokenResponse: any) => {
      const accessToken = tokenResponse.access_token;
      const contentJson = JSON.stringify(content);
      const uploadUrl = `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_NAME}/o?uploadType=media&name=${encodeURIComponent(name)}`;

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
