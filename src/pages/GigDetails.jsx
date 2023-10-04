import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { gigService } from "../services/gig.service.local"
import { showErrorMsg } from "../services/event-bus.service"


export function GigDetails() {
    const { gigId } = useParams()
    const [gig, setGig] = useState(null)
    const navigate = useNavigate()



    useEffect(() => {
        loadGigs()

    }, [gigId])

    async function loadGigs() {
        try {
            const gig = await gigService.getById(gigId)
            setGig(gig)
        } catch (err) {
            console.log('Had issue in gig details', err)
            showErrorMsg('Cannot load gig')
            navigate('/gig')
        }

    }
    if (!gig) return <div className="center-spinner"> <div className="lds-facebook"><div></div><div></div><div></div></div></div>

    return (
        <div className="main-details">
            <a>Home 🏡</a> <small> / </small><a>gig.tag</a>
            <div className="gig-details">
                <h1>{gig.title}</h1>
                <div className="seller-details">
                    <h3>{gig.name} @user.unknown</h3>
                    <h3>⭐{gig.rate}(reviews.length)</h3>
                </div>
                <div className="details-gallery">
                    <img src={gig.img} alt="gig imgs" />
                </div>
                <div className="mini-review">
                    <h2>What people loved about this seller</h2>
                    <a href="">See all reviews</a>
                </div>
                <div className="details-mini-review"> add mini reviews </div>
                <div className="about-gig">

                    <h2>About this gig</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, rem architecto! Consequuntur ad sint facere excepturi libero cum dolorum architecto.</p>
                    <p>Lorem ipsum dolor sit amet!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati alias a quisquam temporibus beatae quibusdam ex eos dignissimos dolorem impedit, in aliquid exercitationem mollitia! Necessitatibus?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quod deserunt est. Dolore, repudiandae ad.</p>
                    <p>My Services</p>
                    <ul>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit.</li>
                    </ul>
                    <p>Why me?</p>
                    <ul>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit.</li>
                        <li>Lorem ipsum dolor sit.</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi pariatur illo repellendus corporis eaque autem dicta tenetur perferendis.</p>
                </div>
                <hr />
                <div>
                    <table>
                        <tr>
                            <th>Website type</th>
                            <th>Website features</th>
                            <th>Plugins</th>
                        </tr>

                        <tr>
                            <td>Lorem, ipsum.</td>
                            <td>lorem</td>
                            <td>Lorem, ipsum.</td>
                        </tr>
                        <tr>
                            <td>Lorem, ipsum.</td>
                            <td>lorem</td>
                            <td>Lorem, ipsum dolor.</td>
                        </tr>
                        <tr>
                            <td>Lorem, ipsum.</td>
                            <td>Lorem, ipsum dolor.</td>
                            <td>lorem</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Lorem, ipsum dolor.</td>
                            <td>lorem</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>lorem</td>
                        </tr>

                    </table>
                </div>
                <div className="about-seller">
                    <h2>About the seller</h2>
                    <div className="seller-details">
                        <h3>{gig.name} @user.unknown</h3>
                        <h3>user.profession</h3>
                        <h3>⭐{gig.rate}(reviews.length)</h3>
                        <button>Contact me</button>
                        <hr />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem inventore animi vero non repellendus fugit et at doloremque reprehenderit iure!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem inventore animi vero non repellendus fugit et at doloremque reprehenderit iure! Lorem ipsum dolor sit amet.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem inventore animi vero non repellendus fugit et at doloremque reprehenderit iure! </p>
                    </div>

                </div>
            </div>
        </div>

    )
}