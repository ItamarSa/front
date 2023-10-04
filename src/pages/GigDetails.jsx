import { useNavigate, useParams } from "react-router"
import { useEffect,useState } from "react"
import { gigService } from "../services/gig.service.local"
import { showErrorMsg } from "../services/event-bus.service"


export function GigDetails() {
    const { gigId } = useParams()
    const [gig, setGig] = useState(null)
    const navigate = useNavigate()



    useEffect(() => {
        loadGigs()

    }, [gigId])

    async function loadGigs(){
        try{
            const gig = await gigService.getById(gigId)
            setGig(gig)
        } catch(err){
            console.log('Had issue in gig details', err)
            showErrorMsg('Cannot load gig')
            navigate('/gig')
        }

    }
    if (!gig) return <div className="center-spinner"> <div className="lds-facebook"><div></div><div></div><div></div></div></div>

    return (
        <div className="gig-details">
            <h1>Gig Details Page</h1>


            <h2>{gig.title}</h2>
            <h3>{gig.name}</h3>
            <h3>⭐{gig.rate}</h3>
        </div>

    )
}