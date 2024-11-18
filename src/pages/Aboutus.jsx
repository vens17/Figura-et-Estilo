
import { Container } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import coverImage from "../assets/images/aboutus.png";

const AboutUs = () => {
    return (
        <Helmet title={'About Us'}>
            <section className="hero__section" style={{ backgroundImage: `url(${coverImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '55vh' }}>
                <Container>
                    <div className="mt-5 text-center">
                        <h2 className="section__title">About Us</h2>
                        <p className="text-white" style={{ fontSize: '1.2em', marginTop: '10%' }}>
                            Figura et Estilo is Latin for Shape and Style, embodying the essence of our Virtual Fashion Assistant. The name reflects our commitment to helping individuals embrace their unique figures and discover their personal style effortlessly.
                            Figura et Estilo leverages augmented reality and intelligent decision support systems to enhance the online shopping experience. By offering personalized styling recommendations and virtual try-ons, it streamlines decision-making, reduces product returns, and elevates customer satisfaction, setting a new standard for digital fashion retail.
                            With Figura et Estilo, we celebrate individuality while making fashion more accessible and inspiring for everyone.
                        </p>
                    </div>
                </Container>
            </section>
        </Helmet>
    )
}

export default AboutUs