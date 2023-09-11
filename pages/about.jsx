import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <Container className={styles.container}>
      <h1 className={styles.heading} id="sub-heading">About Us</h1>
      <p className={styles.description}>We are a team of passionate individuals who are dedicated to creating innovative and user-friendly websites. Our goal is to help businesses and individuals establish a strong online presence and reach their target audience.</p>
      <Row>
      <Col md={4}>
          <div className={styles.member}>
            <img src="/img/members/team-member-6.jpg" alt="Team Mentor" />
            <h2>Mandira Banik</h2>
            <p>Mentor</p>
          </div>
        </Col>
        <Col md={4}>
          <div className={styles.member}>
            <img src="/img/members/team-member-3.jpg" alt="Team Member 3" />
            <h2>Dwaipayan Ghosh</h2>
            <p>Lead Designer</p>
          </div>
        </Col>
        <Col md={4}>
          <div className={styles.member}>
            <img src="/img/members/team-member-2.jpg" alt="Team Member 2" />
            <h2>Sounak Guha</h2>
            <p>Lead Developer</p>
          </div>
        </Col>
        <Col md={4}>
          <div className={styles.member}>
            <img src="/img/members/team-member-4.jpg" alt="Team Member 3" />
            <h2>Arnab Barman</h2>
            <p>Sponsor</p>
          </div>
        </Col>
        <Col md={4}>
          <div className={styles.member}>
            <img src="/img/members/team-member-1.jpg" alt="Team Member 1" />
            <h2>Sudipta Saha</h2>
            <p>Database Administrator</p>
          </div>
        </Col>
       
       
        <Col md={4} style={{"right":"0"}}>
          <div className={styles.member}>
            <img src="/img/members/team-member-5.jpg" alt="Team Member 3" />
            <h2>Arunit Ghosh</h2>
            <p>Data Entry</p>
          </div>
        </Col>
        
      </Row>
    </Container>
  );
}
