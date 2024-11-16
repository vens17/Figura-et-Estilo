import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { sizesData, genderData } from "../assets/data/attributesData"
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/add-product.css";

const AddProducts = () => {

    const [enterProductName, setEnterProductName] = useState('');
    const [enterProductDesc, setEnterProductDesc] = useState('');
    const [enterCategory, setEnterCategory] = useState('');
    const [enterPrice, setEnterPrice] = useState('');
    const [enterProductImg, setEnterProductImg] = useState(null);
    const [productStock, setProductStock] = useState('');
    const [colors, setColor] = useState([]);
    const [gender, setGender] = useState([]);
    const [sizes, setSize] = useState([]);
    const [forKids, setForKids] = useState(false);
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
            let next = function(snapshot) {};
            const error = () => {  toast.error("image not uploaded"); }
            const complete = () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
                    await addDoc (docRef, {
                        itemProductName: enterProductName,
                        productDesc: enterProductDesc,
                        category: enterCategory,
                        price: enterPrice,
                        imgUrl: downloadURL,
                        productStock,
                        forKids,
                        colors,
                        sizes,
                        gender
                    });
                });

                toast.success('Product added successfully.');
                navigate("/dashboard/all-products");
            }

            uploadTask.on(
                () => {
                    toast.error("image not uploaded");
                },
                next,
                error,
                complete
            );
            
            setLoading(false)                    
        } catch (error) {

            setLoading(false)

            toast.error("product not added");
        };
        
        

    }

    const handleSizeChange = (e) => {
        if(e.target.checked) {
            setSize(sizes => [...sizes,  e.target.value]);
        } else setSize(sizes.filter(s => s !== e.target.value));       
    }

    const addColor = () => {
        setColor(colors => [...colors, '#ffffff']);
    }
    const handleColorChange = (color, index) => {
        const newValue = colors.map((c, i) => {
            return i === index ? color : c;
        });

        setColor(newValue);
    }

    return (
        <section>
             <Container>
                <Form onSubmit={addProduct}>
                    { 
                        loading ? (<h4 className="py-5 ">Loading...</h4>) : 
                        <Row>
                            <h4 className="mb-5">Add product</h4>

                            <Col lg='8'>
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

                                <div className="d-flex gap-5 mb-3">
                                    <FormGroup className="w-50">
                                        <h6 className="mb-3" style={{ color: 'coral', fontWeight: '600' }}>Sizes</h6>
                                        
                                        {
                                            sizesData.map(item => (
                                                <div className="form-check form-check-inline" key={item.id}>
                                                    <input type="checkbox" className="btn-check" id={item.id} value={item.id} onClick={handleSizeChange} autoComplete="off" />
                                                    <label className="btn btn-outline-secondary" htmlFor={item.id}>{ item.text }</label>
                                                </div>
                                            ) )
                                        }
                                    </FormGroup>
                                    <FormGroup>
                                        <h6 className="mb-3" style={{ color: 'coral', fontWeight: '600' }}>Gender</h6>
                                        
                                        {
                                            genderData.map(item => (
                                                <div className="form-check form-check-inline" key={item.id}>
                                                    <input className="form-check-input" type="radio" name="gender-options" id={item.id} value={item.id} onClick={e => setGender(e.target.value)} />
                                                    <label className="form-check-label" htmlFor={item.id}>{ item.text }</label>
                                                </div>
                                            ) )
                                        }
                                    </FormGroup>
                                </div>

                                <div className="d-flex gap-5">
                                    <FormGroup className="w-50">
                                        <h6 className="mb-3" style={{ color: 'coral', fontWeight: '600' }}>Color</h6>
                                        
                                        <table className="table">
                                            <tbody>
                                                {
                                                    colors.map((color, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="color-holder" style={{ background: color }}>
                                                                    <input type="color" value={color} onChange={e => handleColorChange(e.target.value, index)} className="hidden" />
                                                                </div>
                                                            </td>
                                                            <td>{color}</td>
                                                            <td><small className="text-danger" style={{ cursor: 'pointer' }} onClick={() => setColor( colors.filter(c => c !== color) )}>remove</small></td>
                                                        </tr>
                                                    ) )
                                                }
                                                <tr>
                                                    <td colSpan={3}>
                                                        <small style={{ cursor: 'pointer' }} onClick={addColor}>add color</small>
                                                    </td>
                                                </tr>                                    
                                            </tbody>
                                        </table>
                                    </FormGroup>
                                    <FormGroup>
                                        <h6 className="mb-3" style={{ color: 'coral', fontWeight: '600' }}>For Kids</h6>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" name="gender-options" id="for-kids" onClick={e => setForKids(e.target.checked)} />
                                            <label className="form-check-label" htmlFor="for-kids">Check this box if the product is for kids.</label>
                                        </div>
                                    </FormGroup>
                                </div>
                            </Col>

                            <Col lg='4'>
                                <div className="d-flex gap-5">
                                    <FormGroup className="form__group">
                                        <span>Product Price</span>
                                        <input type="number" 
                                        placeholder="Php 300" 
                                        value={enterPrice} 
                                        onChange={e => setEnterPrice(e.target.value)} required />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <span>Product Stock</span>
                                        <input type="number"
                                        min={0}
                                        value={productStock} 
                                        onChange={e => setProductStock(e.target.value)} required />
                                    </FormGroup>
                                </div>
                                
                                <FormGroup className="form__group">
                                    <span>Product Category</span>
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
                                            <option value="accessories">Accessories</option>
                                        </select>
                                    </div>
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <span>Product Image</span>
                                    <input type="file" 
                                    onChange={e => setEnterProductImg(e.target.files[0])} required />
                                </FormGroup>

                                <div className="d-flex justify-content-end mb-5">
                                    <button className="buy__btn" type="submit">Add Product</button>
                                </div>
                            </Col>
                        </Row>
                    }
                </Form>
            </Container>
        </section>
    )
};

export default AddProducts;