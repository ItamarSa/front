import { useEffect, useState } from 'react'
import { gigService } from '../services/gig.service.local'
import { useNavigate, useParams } from 'react-router'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useSelector } from 'react-redux'
import { ImgUploader } from './ImgUploader'


export function GigEdit(onAddGig) {

    const navigate = useNavigate()
    const params = useParams()

    const [gigToAdd, setGigToAdd] = useState(gigService.getEmptyGig())
    const user = useSelector((storeState) => storeState.userModule.user)

    useEffect(() => {
        if (params.gigId) loadGig()
    }, [])

    async function loadGig() {
        try {
            const gig = await gigService.getById(params.gigId)
            setGigToAdd(gig)
            showSuccessMsg('Gig loaded successfully')
        } catch (err) {
            console.log('Had issues loading gig', err)
            showErrorMsg('Cannot load gig')
        }
    }
    function onUploaded(imgUrls) {
        setGigToAdd((prevGigToAdd) => ({
            ...prevGigToAdd,
            imgUrl: imgUrls, // Replace the existing imgUrl with the new array
        }));
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || 0 // Ensure value is a number
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setGigToAdd((prevGigToAdd) => ({ ...prevGigToAdd, [field]: value }))
    }

    async function onSubmitGig(ev) {
        ev.preventDefault()
        try {
            console.log('gigToAdd:', gigToAdd)
            await gigService.save(gigToAdd)
            showSuccessMsg(`Gig saved successfully`)
            navigate(`/user/${user._id}`)
        } catch (error) {
            console.log('Had issues saving gig', error)
            showErrorMsg('Couldn\'t save gig')
        }
    }

    function onBack() {
        navigate(`/user/${user._id}`)
    }

    return (
        <section className='edit-gig gigs'>
            {/* <button onClick={onBack}>Back</button> */}
            <form className='main-edit-gig' onSubmit={onSubmitGig}>
                <header className="edit-gig-head">
                    <h2 className='edit-gig-title'>Edit Your Gig</h2>
                    <p>On this page, you can edit and modify your gig. After you complete it, the gig will be ready for publishing.</p>
                    <small>* Mandatory fields</small>
                </header>
                <div className="edit-field flex">
                    <aside>
                        <h3 className="font-accent flex align-center">
                            <span>Title</span>
                        </h3>
                        <div class="education-text">Ex. I will transform your ideas into...</div>
                    </aside>
                    <div className="filed-content">
                        <div className="field-input">
                            <input
                            className="title-input-field"
                                value={gigToAdd.title}s
                                onChange={handleChange}
                                type='text'
                                placeholder='title'
                                id='title'
                                name='title'
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="edit-field flex">
                    <aside>
                        <h3 className="font-accent flex align-center">
                            <span>Price</span>
                        </h3>
                        <div class="education-text">Offer a low price that will attract customers.</div>
                    </aside>
                    <div className="filed-content">
                        <div className="field-input">
                            <input
                            className="price-input-field"
                            value={gigToAdd.price}
                            onChange={handleChange}
                            type='number'
                            placeholder='price'
                            id='price'
                            name='price'
                            required
                            />
                        </div>
                    </div>
                </div>
                <div className="edit-field flex">
                    <aside>
                        <h3 className="font-accent flex align-center">
                            <span>Upload Pictures</span>
                        </h3>
                        <div class="education-text">Add a pictures of your gig so customers will know exactly what they buying.</div>
                    </aside>
                    <div className="filed-content">
                        <section className="gig-img">
                        <ImgUploader onUploaded={onUploaded} />

                            {/* <input
                            className="price-input-field"
                            value={gigToAdd.price}
                            onChange={handleChange}
                            type='number'
                            placeholder='price'
                            id='price'
                            name='price'
                            required
                            /> */}
                        </section>
                    </div>
                </div>
                {/* <label htmlFor='name'>Name: </label>
                <input
                    value={gigToAdd.name}
                    onChange={handleChange}
                    type='text'
                    placeholder='name'
                    id='name'
                    name='name'
                    required
                /> */}
                {/* <label htmlFor='title'>Title: </label>
                <input
                    value={gigToAdd.title}
                    onChange={handleChange}
                    type='text'
                    placeholder='title'
                    id='title'
                    name='title'
                    required
                />
                <label htmlFor='price'>Price: </label>
                <input
                    value={gigToAdd.price}
                    onChange={handleChange}
                    type='number'
                    placeholder='price'
                    id='price'
                    name='price'
                    required */}
                {/* /> */}
            <button className='submit-btn'>Save</button>
            </form>
        </section>
    )
}
