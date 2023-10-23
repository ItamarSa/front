

export function GigDescription({ gig }) {
    return (
        <section className='gig-description'>
            <div className='about-gig'>

                <h2>About this gig</h2>
                <p>{gig.about}</p>
            </div>
            <hr />
            <div>
                <table>
                <tbody>
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
                    </tbody>
                </table>
            </div>
        </section>
    )
}