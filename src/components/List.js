
import { useRouter } from 'next/router';
const List = (props) => {
    const router = useRouter();
    return (
        <>
            {router.asPath === "/admin/products" ?
                (
                    <>
                        <div className="list">
                            <div className="list__container">
                                <img className="list__img" src={props.product.image} alt={props.product.nom} />

                                <div className="list__data">
                                    <h2 className="list__title">{props.product.nom}</h2>
                                    <p className="list__price">{props.product.prix} € </p>
                                </div>
                                <div className="list__data">
                                    <h2 className="list__title">Color</h2>
                                    <p className="list__price">Blue</p>
                                </div>
                                <div className="list__data">
                                    <h2 className="list__title">Size</h2>
                                    <p className="list__price">XS</p>
                                </div>
                                <div className="list__data">
                                    <h2 className="list__title">Availability</h2>
                                    <p className="list__price">In stock</p>
                                </div>
                                <div className="list__button">
                                    <button className="btn btn__color-black" onClick={() => router.push(`/admin/products/update/${props.product.id}`)}>Modify</button>
                                    <button className="btn btn__color-black">Delete</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
                :
                (
                    <div className="list">
                        <div className="list__container">
                            <img className="list__img" src={props.product.image} alt={props.product.nom} />

                            <div className="list__data">
                                <h2 className="list__title">{props.product.nom}</h2>
                                <p className="list__price">{props.product.prix} € </p>
                            </div>
                            <div className="list__data">
                                <h2 className="list__title">Color</h2>
                                <p className="list__price">Blue</p>
                            </div>
                            <div className="list__data">
                                <h2 className="list__title">Size</h2>
                                <p className="list__price">XS</p>
                            </div>
                            <div className="list__data">
                                <h2 className="list__title">Availability</h2>
                                <p className="list__price">In stock</p>
                            </div>
                            <div className="list__button">
                                <button className="btn btn__color-black" onClick={() => router.push(`/admin/users/update/${props.user.id}`)}>Modify</button>
                                <button className="btn btn__color-black">Delete</button>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
}

export default List;