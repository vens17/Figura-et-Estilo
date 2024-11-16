
import { Container } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import coverImage from "../assets/images/aboutus.png";

const AboutUs = () => {
    return (
        <Helmet title={'About Us'}>
            <section className="hero__section" style={{ backgroundImage: `url(${coverImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '52vh' }}>
                <Container>
                    <div className="hero__content text-center">
                        <h2 className="section__title">About Us</h2>
                        <p className="mt-5 text-white">
                            Figura et Estilo is an innovative Virtual Fashion Assistant designed for Paradoxical Clothing Shop. Our solution leverages augmented reality and intelligent decision support systems to enhance the online shopping experience. By offering personalized styling recommendations and virtual try-ons. Our goal is to streamline the decision-making process, reduce product returns, and elevate customer satisfaction, setting a new standard for digital fashion retail.
                        </p>
                    </div>
                </Container>
            </section>
        </Helmet>
    )
}

export default AboutUs