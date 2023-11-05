import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [numPhotosUploaded, setNumPhotosUploaded] = useState(0);
  const [originalFilenames, setOriginalFilenames] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { error }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);


  const handleFileChange = (e) => {
    const newSelectedFiles = [...(selectedFiles || []), ...e.target.files];
    setSelectedFiles(newSelectedFiles);
    setNumPhotosUploaded(newSelectedFiles.length);

    // Display uploaded file names
    const filenames = Array.from(newSelectedFiles, (file) => file.name);
    setOriginalFilenames(filenames.join(", "));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);

        if (selectedFiles) {
          for (const selectedFile of selectedFiles) {
            formData.append("photos", selectedFile);
          }
        }

        const res = await register(formData).unwrap();

        dispatch(setCredentials({ ...res }));
        navigate("/profile");
      } catch (err) {
        console.log("Error logging in: ", err);
      }
  };


  return (
    <FormContainer>
      <h1>Register</h1>

      {error && (
            <Alert variant="danger" className="mt-3">
              {Array.isArray(error.data.message)
                ? error.data.message.map((msg) => (
                    <p key={msg} style={{ color: "red" }}>
                      {msg}
                    </p>
                  ))
                : error.data.message || error.error}
            </Alert>
          )}

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastName"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="photos">
          <Form.Label>photos</Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload photos"
            multiple
            onChange={handleFileChange}
          />
          {numPhotosUploaded > 0 && <p>{numPhotosUploaded} file(s) selected</p>}
          {originalFilenames && <p>Uploaded photos: {originalFilenames}</p>}

        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
