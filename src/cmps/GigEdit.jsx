import { useEffect, useState } from 'react'
import { gigService } from '../services/gig.service.local'
import { useNavigate, useParams } from 'react-router'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { utilService } from '../services/util.service'
import { useSelector } from 'react-redux'

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
        <section className='edit-gig'>
            <form onSubmit={onSubmitGig}>
                <label htmlFor='name'>Name: </label>
                <input
                    value={gigToAdd.name}
                    onChange={handleChange}
                    type='text'
                    placeholder='name'
                    id='name'
                    name='name'
                    required
                />
                <label htmlFor='title'>Title: </label>
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
                    required
                />
                <button>Save</button>
            </form>
            <button onClick={onBack}>Back</button>
        </section>
    )
}
