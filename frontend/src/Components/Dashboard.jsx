import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, Navbar, NavbarBrand, Button } from 'reactstrap';
import { NavLink as RouteNavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ isVisible, toggleSidebar }) => (
  <div className={`sidebar ${isVisible ? 'd-block' : 'd-none d-sm-block'}`}>
    <Navbar className="navbar-dark bg-dark">
      <NavbarBrand href="/">Gym Dashboard</NavbarBrand>
      {isVisible && (
        <Button
          className="d-sm-none"
          color="light"
          onClick={toggleSidebar}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          ✖
        </Button>
      )}
    </Navbar>
    <Nav className="flex-column">
      <NavItem>
        <NavLink tag={RouteNavLink} to="/dashboard" activeClassName="active">Dashboard</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RouteNavLink} to="/workouts" activeClassName="active">My Workouts</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RouteNavLink} to="/settings" activeClassName="active">Settings</NavLink>
      </NavItem>
    </Nav>
  </div>
);

const MainContent = ({ username, toggleSidebar, isScreenLarge }) => (
  <div className="main-content">
    <Navbar className="bg-light">
      {!isScreenLarge && (
        <Button onClick={toggleSidebar} color="primary">
          ☰
        </Button>
      )}
    </Navbar>
    <Container fluid>
      <Row className="my-4">
        <Col>
          <h2>Welcome Back, {username}!</h2>
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <div className="card p-3 mb-3">
            <h4>Progress Overview</h4>
            <div className="progress-bar">
              <div className="progress" style={{ width: '70%' }}></div>
            </div>
          </div>
        </Col>
        <Col sm="6">
          <div className="card p-3 mb-3">
            <h4>Upcoming Workouts</h4>
            <ul>
              <li>Cardio - 5:00</li>
              <li>Strength Training - 6:00</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

const Dashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [isScreenLarge, setIsScreenLarge] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'User ');
  }, []);

  useEffect(() => {
    const handleResize = () => setIsScreenLarge(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="dashboard">
      <Row>
        <Col sm="3" className="sidebar-col">
          <Sidebar isVisible={isScreenLarge || isSidebarVisible} toggleSidebar={toggleSidebar} />
        </Col>
        <Col sm={isScreenLarge ? '9' : '12'} className="content-col">
          <MainContent
            toggleSidebar={toggleSidebar}
            username={username}
            isScreenLarge={isScreenLarge}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;