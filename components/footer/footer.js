import styles from "./footer.module.css"
import { SlSocialTwitter, SlSocialFacebook, SlSocialYoutube } from "react-icons/sl";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className="copyright">
                    &copy; 2023 Rando Sando . All rights reserved.
                </div>
                <div className={styles.info}>
                    <p>Contact us: </p>
                    <p>Email: RandoSando@recipes.co.za</p>
                    <p>Phone: +1 (123) 456-7890</p>

                </div>
                <div className="{styles.socialMedia}">
                    <p>Follow us:
                    <br />
                    <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
                        <SlSocialTwitter />
                    </a>
                    <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">
                        <SlSocialFacebook />
                    </a>
                    <a href="https://youtube.com/company/example" target="_blank" rel="noopener noreferrer">
                        <SlSocialYoutube />
                    </a>
                    </p>
                </div>



            </div>
        </footer>
    );
};

