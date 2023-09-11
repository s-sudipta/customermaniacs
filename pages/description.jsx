import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/Description.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Description() {
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();
    useEffect(()=>{
        if(router.pathname == '/description'){
            setIsExpanded(true);
        }
    },[])
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Container className={styles.container} style={{"paddingTop":"60px"}}>
    <div className={styles.container}>
      <div className={`${styles.content} ${isExpanded ? styles.expanded : ''}`}>
        <h1 className={styles.heading}>Welcome to our website!</h1>
        <p className={styles.paragraph}>We take pride in our system's transparency and accountability. Our system allows customers to rate workers based on their experience, which helps other customers make informed decisions when choosing a worker. This rating system also motivates workers to provide excellent service, as it directly affects their chances of getting hired again.</p>
        <p className={styles.paragraph}>In summary, our company is committed to providing a reliable and affordable home service system that connects customers with skilled workers in their local area. We believe our system will make it easier for customers to find reliable workers for all their home service needs.</p>
        <Row>
        <h1 className={styles.subHeading} id="sub-heading">Our Company</h1>
        <Col md={6}>
        <div className={styles.imageContainer}>
            <img src={require("../public/img/aboutimg/aboutimage1.webp").default.src} alt="Description Image" className={styles.img} />
          </div>
        </Col>
        <Col md={6}>
          <div className={styles.textR}>
            
            <p className={styles.paragraph}>Our team is passionate about creating a platform that empowers both customers and workers. We believe in the importance of supporting the local economy and providing fair opportunities for skilled workers. Our system is built on a foundation of transparency, accountability, and reliability.</p>
            <p className={styles.paragraph}>Through our platform, customers can easily browse and hire workers for a variety of services. Whether it's a plumbing emergency or a need for a skilled carpenter, our system makes it easy to find the right person for the job. Workers can showcase their skills and build their reputation through our rating system, giving them a chance to earn a fair wage and expand their business.</p>
          </div>
        </Col>
      </Row>
      <Row>
      <h1 className={styles.subHeading} id="sub-heading">Our Services</h1>
        <Col md={6}>
          <div className={styles.textL}>
            <p className={styles.paragraph}>Customers can browse a wide range of daily wage workers, including plumbers, mechanics, laborers, carpenters, housemaids, and more. Our site offers a filtering feature for areas, ratings, and prices, making it easy for customers to hire the perfect worker for their needs.</p>
            <p className={styles.paragraph}>Our home service system is unique in that we focus on connecting customers with local workers. This allows for more personalized service and supports the local economy. Our team has spent countless hours designing and testing our system to ensure that it is user-friendly and reliable. We understand the importance of quality service and strive to provide the best possible experience for our customers.</p>
          </div>
        </Col>
        <Col md={6}>
        <div className={styles.imageContainer}>
            <img src={require("../public/img/aboutimg/aboutimage2.webp").default.src} alt="Description Image" className={styles.img} />
          </div>
        </Col>
      </Row>
      <Row>
      <h1 className={styles.subHeading} id="sub-heading">Our Future</h1>
        <Col md={6}>
          <div className={styles.imageContainer}>
            <img src={require("../public/img/aboutimg/aboutimage3.webp").default.src} alt="Description Image" className={styles.img} />
          </div>
        </Col>
        <Col md={6}>
          <div className={styles.textR}>
            <p className={styles.paragraph}>We are committed to continuously improving our system based on customer feedback and market demand. Our ultimate goal is to become the go-to platform for home services, providing reliable and affordable service to customers across the country. We are excited to be on this journey and look forward to serving our customers and workers for years to come.</p>
            <p className={styles.paragraph}>Our platform is not only beneficial for customers but also for the workers. We believe that everyone deserves a fair chance to earn a living, and our system allows for workers to showcase their skills and connect with potential customers. Our system provides a level playing field for all workers, regardless of their background, and allows them to compete based on their skills and ratings.</p>
          </div>
        </Col>
      </Row>
        
      </div>
    </div>
    {!(router.pathname=='/description') &&
        <div className={`${!isExpanded ? styles.transbg : styles.notransbg}`}>
            <button className={styles.button} onClick={toggleExpansion}><i className={isExpanded ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"}></i> {isExpanded ? 'Read Less' : 'Read More'}</button>
        </div>    
    } 
    
    </Container>

  );
}
