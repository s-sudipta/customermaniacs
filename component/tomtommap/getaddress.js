const apiKey = 'LuXWupcXRpMmpMQKpFC6HEF1HWJjAhFp';

export function getAddress(latitude, longitude) {
  return new Promise((resolve, reject) => {
    import('@tomtom-international/web-sdk-services')
      .then((tt) => {
        tt.services.reverseGeocode({
          key: apiKey,
          language: 'en-US',
          position: [longitude,latitude]
        })
        .then(response => {
          console.log(response);
          const address = response.addresses[0].address;
          resolve(address.freeformAddress);
        })
        .catch(error => {
          reject(error);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}
