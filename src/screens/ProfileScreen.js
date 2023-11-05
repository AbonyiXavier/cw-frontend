import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';

  const ProfileScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return (
      <Container className="text-center">
          <h2 className='py-4'>My Photo Gallery</h2>
          
        {userInfo?.client?.photos?.length > 0 ? (
          <Carousel style={{ maxWidth: '800px', margin: 'auto' }}>
            {userInfo.client.photos.map((photo, index) => (
              <Carousel.Item key={photo}>
                <img
                  className="d-block w-100"
                  src={photo}
                  alt={`Slide ${index + 1}`}
                  style={{ width: '100%', height: '980px',  objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <p>No photos available</p>
        )}
      </Container>
    );
  };

export default ProfileScreen;
