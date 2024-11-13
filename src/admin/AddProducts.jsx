import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {

    const [enterProductName, setEnterProductName] = useState('');
    const [enterProductDesc, setEnterProductDesc] = useState('');
    const [enterCategory, setEnterCategory] = useState('');
    const [enterPrice, setEnterPrice] = useState('');
    const [enterProductImg, setEnterProductImg] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const addProduct = async(e) => {
        e.preventDefault();
        setLoading(true)

        // ==== add product to the firebase database ====

        try {
            
            const docRef = await collection(db, 'products')
            const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)
            const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

            // the product was added and saved to the Firestore database.
            /*{uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Progress function can go here if needed
                },
                (error) => {
                    // Handle unsuccessful uploads
                    toast.error('Image upload failed.');
                },
                async () => {
                    // Handle successful uploads
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await addDoc(docRef, {
                        itemProductName: enterProductName,
                        productDesc: enterProductDesc,
                        category: enterCategory,
                        price: enterPrice,
                        imgUrl: downloadURL,
                    });
                    
                }
            );}*/

            // the original code
            uploadTask.on(
                () => {
                    toast.error("image not uploaded");
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
                        await addDoc (docRef, {
                            itemProductName: enterProductName,
                            productDesc: enterProductDesc,
                            category: enterCategory,
                            price: enterPrice,
                            imgUrl: downloadURL,
                        });
                    });
                }
            );

            setLoading(false)
            
            toast.success('Product added successfully.');
            navigate("/dashboard/all-products")

        } catch (error) {

            setLoading(false)

            toast.error("product not added");
        };
        
        

    }

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12'>
                        { 
                            loading ? (<h4 className="py-5 ">Loading...</h4>) : 
                            (<>
                                <h4 className="mb-5">Add product</h4>
                                <Form onSubmit={addProduct}>
                                    <FormGroup className="form__group">
                                        <span>Product Name</span>
                                        <input type="text" 
                                        placeholder="Product Name" 
                                        value={enterProductName} 
                                        onChange={e => setEnterProductName(e.target.value)} required />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <span>Product Description</span>
                                        <input type="text" 
                                        placeholder="Product Description" 
                                        value={enterProductDesc} 
                                        onChange={e => setEnterProductDesc(e.target.value)} required />
                                    </FormGroup>

                                    <div className="d-flex align-items-center justify-content-between gap-5">
                                    <FormGroup className="form__group w-50">
                                        <span>Product Price</span>
                                        <input type="number" 
                                        placeholder="Php 300" 
                                        value={enterPrice} 
                                        onChange={e => setEnterPrice(e.target.value)} required />
                                    </FormGroup>

                                    <FormGroup className="form__group w-50">
                                        <span>Category</span>
                                        <div className="filter__widget">
                                            <select className="w-100 p-2"
                                                value={enterCategory} 
                                                onChange={e => setEnterCategory(e.target.value)}>

                                                <option>Select Category</option>
                                                <option value="bottoms">Bottoms</option>
                                                <option value="jumper">Jumper</option>
                                                <option value="skirts">Skirts</option>
                                                <option value="jumpsuit">Jumpsuit</option>
                                                <option value="jorts">Jorts</option>
                                                <option value="tops">Tops</option>

                                            </select>
                                        </div>
                                    </FormGroup>

                                    </div>

                                    <div>
                                    <FormGroup className="form__group">
                                        <span>Product Image</span>
                                        <input type="file" 
                                        onChange={e => setEnterProductImg(e.target.files[0])} required />
                                    </FormGroup>
                                    </div>

                                    <button className="buy__btn" type="submit">Add Product</button>

                                </Form>
                            </>)
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
};

export default AddProducts;