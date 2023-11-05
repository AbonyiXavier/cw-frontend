import { Container, Card, Button } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center Homepage-card bg-light w-75'>
          <h1 className='text-center mb-4'>CobbleWeb Application</h1>
          <p className='text-center mb-4'>
          This platform serves as a registration and client management system. 
          User (client) can register and I display their full name, avatar, and photos in an appealing carousel when logged in.
          </p>

          <div className='d-flex'>
            <Button variant='primary' className='me-3'>
              Created by Francis Nnamdi Abonyi
            </Button>
          </div>
          
        </Card>
      </Container>
    </div>
  );
};

export default HomePage;
